'use strict';

import gulp from 'gulp';
import browsersync from 'browser-sync';
import { paths } from '../gulpfile.js';


// -------------------------------------
//   Tast: server
// -------------------------------------

gulp.task('server', function(done) {
  browsersync.init({
    // server: './dist/',
    port: 4000,
    notify: true,
    cors: true,
    server: {
      baseDir: './dist/',
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        next();
      }
    }
  });

  gulp.watch(paths.views.watch, {usePolling: true}, gulp.parallel('views'));
  gulp.watch(paths.styles.watch, {usePolling: true}, gulp.parallel('styles'));
  gulp.watch(paths.scripts.watch, {usePolling: true}, gulp.parallel('scripts'));
  gulp.watch(paths.images.watch, {usePolling: true}, gulp.parallel('images'));

  return done();
});
