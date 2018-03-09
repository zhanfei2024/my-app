
/**
 * 存放的是gulp任务中需要导入的文件的路径和导出的路径。
 * gulp.src 地址
 * gulp.dest 地址
 */

var commonSrc = './public/**/*';
var modelsSrc = './models/*.*';

module.exports = {
    js: {
        src: [
            commonSrc + '.js',
            modelsSrc
        ]
    },
    node: {
        src: ['./config/*.js', './controll/*.js', './nodel/*.js', './routes/*.js']
    },
}


