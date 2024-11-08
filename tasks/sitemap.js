"use strict";

import gulp from "gulp";
import { paths } from "../gulpfile.js";
import sitemap from "gulp-sitemap";

// -------------------------------------
//   Task: Sitemap
// -------------------------------------
gulp.task("sitemap", function () {
  return gulp
    .src(paths.views.src, {
      read: false,
    })
    .pipe(
      sitemap({
        siteUrl: "https://www.futbalic.sk",
      }),
    )
    .pipe(gulp.dest(paths.dist));
});
