'use strict';
import { readFileSync } from 'fs';
import hb from 'gulp-hb';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import beautify from 'gulp-beautify';
import browsersync from 'browser-sync';
import hbLayouts from 'handlebars-layouts';
import { config, paths } from '../gulpfile.js';
import assetsHelper from '../src/views/helpers/assets.js';
import indexDirHelper from '../src/views/helpers/indexDir.js';
import timeHelper from '../src/views/helpers/time.js';
import breadcrumbJson from '../src/views/helpers/json.js';
import revRewrite from 'gulp-rev-rewrite';
import gulpIf from "gulp-if";

// -------------------------------------
//   Task: views
// -------------------------------------

gulp.task('views', function () {
    let manifestStyle = {};
    let manifestScript = {};

    if (config.production) {
        manifestStyle = readFileSync(paths.styles.dist + 'rev-manifest.json', 'utf8');
        manifestScript = readFileSync(paths.scripts.dist + 'rev-manifest.json', 'utf8');
    }

    const hbStream = hb({
    //debug: true
  })
    .partials(paths.views.partials + '**/*.{hbs,html}')

    // Data
    .data(paths.views.data + '/**/*.{js,json}')
    .data(config.metadata)

    // Helpers
    .helpers(hbLayouts)
    //.helpers(paths.views.helpers + '/*.js')
    .helpers(assetsHelper)
    .helpers(indexDirHelper)
    .helpers(timeHelper)
    .helpers(breadcrumbJson);


  return gulp.src(paths.views.src)
      .pipe(plumber(config.plumber))
      .pipe(hbStream)
      .pipe(beautify.html({
        indent_size: 2, preserve_newlines: false,
      }))
      .pipe(gulpIf(config.production, revRewrite({ manifest: manifestStyle, replaceInExtensions: [".latte"] })))
      .pipe(gulp.dest(paths.views.dist))
      .pipe(gulpIf(config.production, revRewrite({ manifest: manifestScript, replaceInExtensions: [".latte"] })))
      .pipe(gulp.dest(paths.views.dist))
      .on('end', browsersync.reload);
});
