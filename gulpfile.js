'use strict';

const path = require('path');
const gulp = require('gulp');
const less = require('gulp-less');
const jade = require('gulp-jade');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

const PUB_DIR = {
	root: path.join(__dirname, 'public')
};
PUB_DIR.css = path.join(PUB_DIR.root, 'css')

const SRC_DIR = {
	root: path.join(__dirname, 'src')
};
const SRC_FILES_LESS = path.join(SRC_DIR.root, 'less', '*.less');

/* TASKS */

gulp.task('watch', () =>
	gulp.watch(SRC_FILES_LESS, ['less', 'cssmin'])
);

gulp.task('less', () =>
	gulp.src(SRC_FILES_LESS)
		.pipe(less().on('error', err => console.log(err)))
		.pipe(gulp.dest(PUB_DIR.css))
);

gulp.task('cssmin', () =>
    gulp.src(path.join(PUB_DIR.css, 'style.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(PUB_DIR.css))
);

gulp.task('jade', () =>
	gulp.src(path.join(SRC_DIR.root, '*.jade'))
		.pipe(jade({
			client: true
		}))
		.pipe(gulp.dest(PUB_DIR.root))
);

gulp.task('default', ['less', 'cssmin', 'watch']);
