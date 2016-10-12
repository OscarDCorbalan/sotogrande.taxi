'use strict';

const path = require('path');
const gulp = require('gulp');
const less = require('gulp-less');
const jade = require('gulp-jade');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const connect = require('gulp-connect');
const imagemin = require('gulp-imagemin');


const SRC_DIR = path.join(__dirname, 'source');
const SRC_ASSETS = {
	img: path.join(SRC_DIR, 'images', '*'),
	less: path.join(SRC_DIR, 'less', '*.less'),
	jade: path.join(SRC_DIR, 'jade', '*.jade')
};


const PUB_DIR = {
	root: path.join(__dirname, 'public')
};
PUB_DIR.assets = path.join(PUB_DIR.root, 'assets');
PUB_DIR.css = path.join(PUB_DIR.assets, 'css');
PUB_DIR.fnt = path.join(PUB_DIR.assets, 'fonts');
PUB_DIR.img = path.join(PUB_DIR.assets, 'images');


/* TASKS */

gulp.task('watch', () => {
	gulp.watch(SRC_ASSETS.img, ['imagemin']);
	gulp.watch(SRC_ASSETS.less, ['less', 'cssmin']);
	gulp.watch(SRC_ASSETS.jade, ['jade']);
});

gulp.task('less', () =>
	gulp.src(SRC_ASSETS.less)
		.pipe(less().on('error', err => console.log(err)))
		.pipe(gulp.dest(PUB_DIR.css))
		.pipe(connect.reload())
);

gulp.task('cssmin', () =>
    gulp.src(path.join(PUB_DIR.css, 'style.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(PUB_DIR.css))
		.pipe(connect.reload())
);

gulp.task('jade', () =>
	gulp.src(SRC_ASSETS.jade)
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(PUB_DIR.root))
		.pipe(connect.reload())
);

gulp.task('imagemin', () =>
    gulp.src(SRC_ASSETS.img)
        .pipe(imagemin())
        .pipe(gulp.dest(PUB_DIR.img))
		.pipe(connect.reload())
);

gulp.task('webserver', function() {
	connect.server({
    	root: 'public',
		livereload: true,
		port: 80,
		host: 'gulp.dev'
	});
});

gulp.task('default', ['less', 'cssmin', 'jade', 'imagemin', 'webserver', 'watch']);
