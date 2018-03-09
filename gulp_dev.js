var gulp = require('gulp');
var nodemon = require('gulp-nodemon'); //监控文件变化，有变化则立即重启服务

gulp.task("develop", function () {
    nodemon({
        script: "bin/www",
        ext: "js",
        ignore: ['./public', './node_modules']
    }).on("restart", function () {
        console.log('restart');
    });
});