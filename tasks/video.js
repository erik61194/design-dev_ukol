'use strict';

import gulp from 'gulp';
import { paths } from '../gulpfile.js';


// -------------------------------------
//   Task: fonts
// -------------------------------------

gulp.task('video', function () {
  return gulp.src(paths.video.src)
    .pipe(gulp.dest(paths.video.dist));
});
