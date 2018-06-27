/* Modules */
const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const plugins = require('gulp-load-plugins')();
const runSequence = require('run-sequence');

/* Paths */
const paths = {
    dist: './dist',
    styles: {
        source: './source/styles/**/*.scss',
        dest: './source/styles'
    },
    templates: {
        source: './source/templates/*.html',
        dest: './dist/templates',
    },
    tmp: './.tmp/'
};

/* Config */
const config = {
    browserSync: {
        baseDir: './.tmp',
        startPath: '/templates'
    },
    nunjucks: {
        path: ['./source/templates/snippets']
    }
}

/* Clean: Dist */
gulp.task('clean:dist', function() {
    return del(paths.dist);
});

/* Clean: Tmp */
gulp.task('clean:tmp', function() {
    return del(paths.tmp);
});

/* Clean */
gulp.task('clean', ['clean:dist', 'clean:tmp']);

/* Build Styles */
gulp.task('build:styles', function () {
    return gulp.src(paths.styles.source)
    .pipe(plugins.sass({
        outputStyle: 'nested'
    }))
    .pipe(gulp.dest(paths.styles.dest));
});

/* Build: Templates */
gulp.task('build:templates', ['build:styles'], function() {
    return gulp.src(paths.templates.source)
    .pipe(plugins.nunjucksRender(config.nunjucks))
    .pipe(plugins.inlineCss({
        applyStyleTags: true,
        removeStyleTags: false,
        removeLinkTags: false,
        preserveMediaQueries: true
    }))
    .pipe(plugins.htmlPrettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest(paths.templates.dest));
});

/* Serve: Browser Sync */
gulp.task('serve:browser-sync', function() {
    return browserSync({
        server: {
            baseDir: config.browserSync.baseDir,
            directory: true,
        },
        startPath: config.browserSync.startPath
    });
});

/* Serve: Styles */
gulp.task('serve:styles', function () {
    return gulp.src(paths.styles.source)
    .pipe(plugins.sass({
        outputStyle: 'compressed'
    }))
    .pipe(gulp.dest(paths.tmp + '/styles'))
    .pipe(reload({stream:true}));
});

/* Serve: Nunjucks Gen */
gulp.task('serve:nunjucks-gen', function() {
    return gulp.src(paths.templates.source)
    .pipe(plugins.nunjucksRender(config.nunjucks))
    .pipe(gulp.dest(paths.tmp + '/templates'));
});

/* Serve: Watch */
gulp.task('serve:watch', function() {
    gulp.watch(paths.styles.source, ['serve:styles']);
    gulp.watch(paths.templates.source, ['serve:nunjucks-gen', browserSync.reload]);
    gulp.watch(config.nunjucks.templates + '/**/*.html', ['serve:nunjucks-gen', browserSync.reload]);
});

/* Serve */
gulp.task('serve', function(callback) {
    runSequence(
        'clean:tmp',
        'serve:styles',
        'serve:nunjucks-gen',
        'serve:browser-sync',
        'serve:watch',
        callback
    );
});

/* Build */
gulp.task('build', function(callback) {
    runSequence(
        'clean:dist',
        'build:templates'
    );
});

/* Default */
gulp.task('default', ['serve']);
