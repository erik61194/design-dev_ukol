"use strict";

import gulp from "gulp";
import yargs from "yargs";
// import requireDir from 'require-dir';
import c from "ansi-colors";
import { resolve } from "path";

const __dirname = resolve();

const argv = yargs(process.argv).argv.production;
const production = !!argv;

if (production) {
  console.log(c.green.bold.underline("🚚 Production mode"));
} else {
  console.log(c.yellow.bold.underline("🔧 Development mode"));
}

const paths = {
  dist: "./dist/",
  views: {
    src: "./src/views/templates/**/*.html",
    pages: "./src/views/templates/",
    partials: "./src/views/partials/",
    helpers: "./src/views/helpers/",
    data: "./src/views/data",
    dist: "./dist/",
    watch: "./src/views/**/*.{html,hbs}",
  },
  styles: {
    src: "./src/styles/*.{scss,sass}",
    dist: "./dist/assets/styles/",
    watch: "./src/styles/**/*.{scss,sass}",
  },
  fonts: {
    src: "./src/fonts/**/*.{woff,woff2,eot,ttf,svg}",
    dist: "./dist/assets/fonts/",
    watch: "./src/fonts/**/*.{woff,woff2,eot,ttf,svg}",
  },
  video: {
    src: "./src/video/**/*.{mp4,ogg,webm}",
    dist: "./dist/assets/video/",
    watch: "./src/video/**/*.{mp4,ogg,webm}",
  },
  json: {
    src: "./src/json/**/*.json",
    dist: "./dist/assets/json/",
    watch: "./src/json/**/*.json",
  },
  favicons: {
    src: "./src/img/favicon/*.{jpg,jpeg,png,gif}",
    dist: "./dist/assets/img/favicons/",
  },
  images: {
    src: ["./src/img/**/*.{jpg,jpeg,png}", "!./src/img/favicon/*"],
    dist: "./dist/assets/img/",
    watch: "./src/img/**/*.{jpg,jpeg,png}",
  },
  imagessvg: {
    src: ["./src/img/**/*.svg", "!./src/img/favicon/*"],
    dist: "./dist/assets/img/",
    watch: "./src/img/**/*.svg",
  },
  scripts: {
    src: "./src/js/main.js",
    dist: "./dist/assets/js/",
    srcOther: "./src/js/other/*.js",
    distOther: "./dist/assets/js/other/",
    watch: "./src/js/**/*.js",
  },
  vendors: {
    src: "./src/vendors/**/*.*",
    dist: "./dist/assets/vendors/",
  },
  assets: {
    dist: "./dist/assets/",
  },
};

const config = {
  production: production,
  plumber: {
    errorHandler: function (error) {
      console.log(c.red(error.message));
      this.emit("end");
    },
  },
  fileInclude: {
    prefix: "@@",
    basepath: __dirname,
    context: {},
  },
  metadata: {
    author: "Plutus digital, s.r.o.",
    year: new Date().getFullYear(),
  },
};

// -------------------------------------
//   All tasks
// -------------------------------------

import "./tasks/clean.js";
import "./tasks/favicons.js";
import "./tasks/fonts.js";
import "./tasks/video.js";
import "./tasks/json.js";
import "./tasks/images.js";
import "./tasks/notify.js";
import "./tasks/scripts.js";
import "./tasks/styles.js";
import "./tasks/sitemap.js";
import "./tasks/vendors.js";
import "./tasks/views.js";
import "./tasks/webserver.js";

// -------------------------------------
//   Task: default
// -------------------------------------

gulp.task(
  "default",
  gulp.series(
    gulp.parallel(
      "styles",
      "scripts",
      "images",
      "images-svg",
      "video",
      "json",
      "fonts",
      "views",
      "favicons",
      "vendors",
    ),
    "server",
  ),
);

// -------------------------------------
//   Task: build
// -------------------------------------

gulp.task(
  "build",
  gulp.series(
    "clean",
    gulp.parallel(
      "styles",
      "scripts",
      "images",
      "images-svg",
      "video",
      "json",
      "fonts",
      "favicons",
      "vendors",
      "sitemap",
    ),
    gulp.series("views", function viewsCompleted(done) {
      console.log("Views task completed.");
      done();
    }),
    function buildCompleted(done) {
      console.log("Build task completed.");
      done();
    },
  ),
);

export { paths, config };
