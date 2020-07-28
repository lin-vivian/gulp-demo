const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat')
const gulpHtml = require('gulp-htmlmin')
const uglify = require('gulp-uglify')
const clean = require('del');
const rename = require('gulp-rename');
const less = require('gulp-less');
const css = require('gulp-clean-css');
const image = require('gulp-imagemin');


//清空压缩包
gulp.task("clean", async (done) => {
    await clean(['./build'])
    done()
})
//html文件打包
gulp.task('htmlmin', (done) => {
    gulp.src('./public/**/*.html')
        .pipe(gulpHtml({
            //删除空格    
            collapseWhitespace: true,
            //删除注释
            removeComments: true
        }))
        .pipe(gulp.dest('build/html'))
    done()
});

//js文件打包
gulp.task('jsmin', (done) => {
    gulp.src(['src/**/*.js'])
        .pipe(babel()) //ES6转换为ES5
        .pipe(concat('main.js'))
        .pipe(uglify()) //js代码压缩
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('build/'))
    done()

})

//less文件打包,编译成css，并压缩css文件
gulp.task('lessmin', (done) => {
    gulp.src(['src/**/*.less'])
        .pipe(concat('main.less'))
        .pipe(less())
        .pipe(css({ compatibility: 'ie8' }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/css'))
    done()
})

//压缩图片
gulp.task('imagemin', (done) => {
    gulp.src(['src/static/images/*'])
        .pipe(image())
        .pipe(gulp.dest('build/image'))
    done()
})

// //开启一个任务
gulp.task('default', gulp.series('clean', 'htmlmin', 'lessmin', 'imagemin', 'jsmin'))
gulp.task('watch', () => {
    gulp.watch('src/**/*.*', gulp.series('default'))
})