'use strict';

import gulp from 'gulp';
import changed from 'gulp-changed';
import sharpResponsive  from 'gulp-sharp-responsive'

import { paths } from '../gulpfile.js';

// -------------------------------------
//   Task: images
// -------------------------------------
gulp.task('images', function () {
  return gulp.src(paths.images.src)
    .pipe(changed(paths.images.dist))
    .pipe(sharpResponsive({
      includeOriginalFile: true,
      formats: [
        { format: "webp", webpOptions: { quality: 75} },
        { format: "avif", avifOptions: { quality: 75 } },
        // { format: "png", pngOptions: { quality: 75} },
      ]
    }))
    .pipe(gulp.dest(paths.images.dist));
});


// -------------------------------------
//   Task: images SVG
// -------------------------------------
gulp.task('images-svg', function () {
  return gulp.src(paths.imagessvg.src)
    .pipe(changed(paths.imagessvg.dist))
    .pipe(gulp.dest(paths.imagessvg.dist));
});




