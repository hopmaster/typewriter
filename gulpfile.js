var gulp = require('gulp');
var concatCSS = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uncss = require('gulp-uncss');
var fs = require("fs");
var addsrc = require('gulp-add-src');
var replace = require('gulp-replace');
const zip = require('gulp-zip');
const changed = require('gulp-changed');
var ver;


gulp.task('default', ['zip', 'watch']);

gulp.task('css', function () {


    return gulp.src('*.css')
        .pipe(concatCSS("style.css"))
        .pipe(uncss({

            html: ['http://localhost/machine']

        }))
        .pipe(cleanCSS(''))
        .pipe(gulp.dest('C:\\wamp\\www\\machine'))
        .pipe(notify('css собран!'));

});

gulp.task('html', function () {
    return gulp.src(['*.php', '*.html'])
        .pipe(concat('index.php'))
        //.pipe(rename('index.html'))
        .pipe(htmlmin({

            collapseWhitespace: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true


        }))
        .pipe(gulp.dest('C:\\wamp\\www\\machine'))
        .pipe(notify('php+html готов!'))
});

gulp.task('js',['ver'],function () {


    /**
     * первым должен идти about.js (объявление глобальной переменной)
     * последним должен быть script.js (после всех определений)
     */

    return gulp.src('start.js')
        .pipe(addsrc.append(['*.js', '!gulpfile.js', '!script.js', '!start.js']))
        .pipe(addsrc.append('script.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('script.js'))
        .pipe(replace('0.0.0', function () {


            console.log('version '+ver);
            return ver;

        }))
        .pipe(uglify())
        .pipe(gulp.dest('C:\\wamp\\www\\machine'));

});


gulp.task('watch', function () {


    gulp.watch(['*.*', '!gulpfile.js','!README.md','!package.json'], ['zip']);

});

gulp.task("copyJs", function () {
    return gulp.src(['js\\*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('C:\\wamp\\www\\machine\\js'))
        .pipe(notify("js\\*.js сжаты и скопированы"));
});

gulp.task('zip',['html','css','ver','js'],function(){

    gulp.src(['C:\\wamp\\www\\machine\\*\\*', 'C:\\wamp\\www\\machine\\*', '!C:\\wamp\\www\\machine\\versions\\*'])
        .pipe(zip('C:\\wamp\\www\\machine\\versions\\typeWriter' + (function(){

                return ver;

            })() + '.zip'))
        .pipe(gulp.dest(''))
        .pipe(notify("Версия "+ver+" упакована"));

});

gulp.task('ver',function(){

    //увеличиваем номер версии
    gulp.src('README.md')
        .pipe(replace(/([\d]+[.][\d]+[.])([\d]+)/i, function () {

            return ver = arguments[1] + (++arguments[2]);

        }))
        .pipe(gulp.dest(''));

});

gulp.task('realize',['zipServer'],function(){

    gulp.src(['!C:/wamp/www/machine/versions','!C:/wamp/www/machine/versions/*','C:/wamp/www/machine/*','C:/wamp/www/machine/*/*'])
        .pipe(changed('P:/public_html'))
        .pipe(gulp.dest('P:/public_html'/*'W:/hmelenko.ml/htdocs/www'*/));

});

gulp.task('zipServer',function(){

    gulp.src(['P:/public_html*','P:/public_html/*/*'])
        .pipe(zip('C:/wamp/www/machine/versions/typeWriterFormServer'+Date.now()+'.zip'))
        .pipe(gulp.dest(''));

});
