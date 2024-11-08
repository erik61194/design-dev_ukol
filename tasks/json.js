'use strict';

import gulp from 'gulp';
import { paths } from '../gulpfile.js';


// -------------------------------------
//   Task: fonts
// -------------------------------------

gulp.task('json', function () {
  return gulp.src(paths.json.src)
    .pipe(gulp.dest(paths.json.dist));
});
