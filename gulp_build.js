var gulp = require('gulp');//引入gulp自动化工具
var gulpif = require('gulp-if');//有条件的执行gulp任务
var runSequence = require('run-sequence');//运行多个gulp任务
var argv = require("yargs").arguments;//接收用户在命令行输入的参数  例如：gulp build -s 中的 -s
var clean = require('gulp-clean');//删除文件或文件夹
var path = require('path'); //path模块用于处理和转换文件路径
var RevAll = require('gulp-rev-all-fixed');//静态资源版本迭代，解决文件缓存问题，其实就是给文件名后加上哈希值
var uglify  = require('gulp-uglify');//js压缩
var cssmin = require('gulp-cssmin');//css压缩
var replace = require('gulp-replace');//字符串替换插件
var sass = require("gulp-sass");//预处理sass
var bower = require('gulp-bower');//下载bower包

var taskPaths = require('./tasks/paths'); //引入gulp任务所需要的路径

var jsonfile = require('jsonfile');//创建和解析json文件
var imgHashFile = {};


function getRevOpts(isDev) {//给gulp-rev-all-fixed模块生成选项的方法
    var opt = {
        hashLength: 12, //哈希值长度
        transformFilename: function (file, hash) {
            var ext = path.extname(file.path); //获取扩展名
            var suffixes = isDev ? '' : '.' + hash.substr(0, 6); //获取哈希值前六位

            if (ext.indexOf('scss') > 0) {//如果是scss文件，就变成css扩展名
                ext = '.css';
            }

            return path.basename(file.path, ext) + suffixes + ext;
            //path.basename(path, ext)返回路径的最后一段，例如./name/abc.html 则会返回abc.html
            //path.extname(path, ext)返回路径最后一段的扩展名，例如./name/abc.html 则返回.html
            //不带扩展名的基础文件名，后面连上哈希值，最后连上处理过的扩展名返回
        }
    };

    return opt;
}

/*gulp.task('bower', function() {//bower任务，下载bower插件到以下目录
    return bower({ directory: './public/bower_components' });
});*/

//clean任务，删除hash和assets文件夹下的文件，read: false参数使gulp不读取文件内容就进行删除，使操作变快
// gulp.task('clean', function () {
//     return gulp.src(taskPaths.cleanSrc, { read: false })
//         .pipe(clean());
// });

var temmoGulp = {
    buildJs: function (src, dest, isDev, isWatching) {
        var opts = {
            fileNameManifest: 'js_hash.json',
            hashLength: getRevOpts(isDev).hashLength,
            transformFilename: getRevOpts(isDev).transformFilename
        };
        //gulp-rev-all-fixed选项，
        //fileNameManifest，hash文件自定义命名
        //transformFilename，自定义命名方法
        var revAll = new RevAll(opts);//在将流导入revAll.revision()处理之前先要实例化RevAll对象

        return gulp.src(src)
            .pipe(uglify())
            .pipe(revAll.revision())
            .pipe(gulp.dest(dest))
            .pipe(revAll.manifestFile()) //生成hash名单文件
            .pipe(gulpif(!isWatching, gulp.dest('./hash'))); //将hash名单文件导入hash文件夹

    },
    buildImg: function (src, dest, isDev, isWatching) {
        var opts = {
            fileNameManifest: 'img_hash.json',
            hashLength: getRevOpts(isDev).hashLength,
            transformFilename: getRevOpts(isDev).transformFilename
        };
        var revAll = new RevAll(opts);

        return gulp.src(src)
            .pipe(revAll.revision())
            .pipe(gulp.dest(dest))
            .pipe(revAll.manifestFile())
            .pipe(gulpif(!isWatching, gulp.dest('./hash')));
    },
    buildCss: function (src, dest, isDev, isWatching) {
        var opts = {
            fileNameManifest: 'css_hash.json',
            hashLength: getRevOpts(isDev).hashLength,
            transformFilename: getRevOpts(isDev).transformFilename
        };
        var revAll = new RevAll(opts);

        var compassImporter = function(url, prev, done) {
            if (!/^compass/.test(url)) {
                return done({ file: url }); //如果url中不含compass
            }

            done({ file: 'compass-mixins/lib/' + url });
        };
        //url是当前导入的路径，prev是上一次处理的路径，done是可选回调函数

        //outputStyle最终输出css的风格
        //importer处理当遇到@import导入
        //includePaths一个路径的数组让Libsass可以解决@import声明
        //data传递给Libsass渲染
        return gulp.src(src)
            .pipe(sass({
                outputStyle: 'compressed',
                importer: compassImporter,
                includePaths: [ 'node_modules' ],
                data: '@import "compass"; .transition { @include transition(all); }'
            }))
            .pipe(sass().on('error', sass.logError))
            .pipe(cssmin()) //压缩css
            .pipe(replace(/(\.\.\/.*?(jpg|jpeg|gif|png|bmp){1})/mg, function ($1) {
                //replace第二个参数如果是函数，每个匹配都调用该函数，它返回的字符串将作为替换文本使用
                //$1参数是匹配到的字符串
                var img = $1;
                var imgRal = img.replace(/((\.\.\/){1,})(.*?(jpg|jpeg|gif|png|bmp){1})/g, '$1');

                try {
                    imgHashFile = jsonfile.readFileSync('./hash/img_hash.json'); //读取img hash名单
                } catch (e) {
                    imgHashFile = {};
                }

                for (var key in imgHashFile) {//循环img hash名单

                    if ((imgRal + key) === $1) {
                        img = '/static/assets/' + imgHashFile[key];

                        break;
                    }
                }

                return img; //将css中图片url文件名变为带hash的文件名
            }))
            .pipe(revAll.revision())
            .pipe(gulp.dest(dest))
            .pipe(revAll.manifestFile())
            .pipe(gulpif(!isWatching, gulp.dest('./hash')));
    }
};


var build = function () {
    // 是否监听
    var isDev = argv.dev === true;//若在命令行输入了dev参数，则isDev为真

    gulp.task('js', function () {
        return temmoGulp.buildJs(taskPaths.js.src, taskPaths.js.dest, isDev);
    });

    gulp.task('img', function () {
        return temmoGulp.buildImg(taskPaths.img.src, taskPaths.img.dest, isDev);
    });

    gulp.task('css', function () {
        return temmoGulp.buildCss(taskPaths.css.src, taskPaths.img.dest, isDev, false);
    });

    runSequence('clean', 'bower', 'js', 'img', 'css'); //顺序执行相关任务
};

gulp.task('build', function () { //build任务包含clean,下载bower包，处理js，处理img，处理css
    return build();
});

var getFileName = function (str) {
    var reg = /[^\\\/]*[\\\/]+/g; //获取路径里的文件名
    str = str.replace(reg, '');

    return str;
};

var getSinglePath = function (file) {
    var filePath = file.path,
        destPath,
        fileName = getFileName(file.path);

    filePath = filePath.replace(/(\\|\/)/img, '%');
    //将路径里的/和\换成%
    filePath = filePath.substring(filePath.indexOf('%public%'));
    //从$public%开始截取
    filePath = '.' + filePath.replace(/%/img, '/');
    //将%替换回/，导入路径

    destPath = filePath.replace(eval('/(' + fileName + ')$/mg'), '');
    //去掉文件名
    destPath = destPath.replace(eval('/\.\\/public\\//'), ('./public/assets/'));
    //导出路径为./public/assets/下

    return {
        filePath: filePath,
        destPath: destPath
    };
};


gulp.task('watch', function () { //监控js，css，img的变动，如果变动，重新执行处理任务
    gulp.watch(taskPaths.js.src, function (file) {
        var paths = getSinglePath(file);

        gulp.task('watchCss', function () {
            return temmoGulp.buildCss(paths.filePath, paths.destPath, true, true);
        });

        runSequence('watchCss');
    });

    gulp.watch(taskPaths.js.src, function (file) {
        var paths = getSinglePath(file);

        gulp.task('watchJs', function () {
            return temmoGulp.buildJs(paths.filePath, paths.destPath, true, true);
        });

        runSequence('watchJs');
    });

    gulp.watch(taskPaths.node.src, function(file) {
        var paths = getSinglePath(file);

        gulp.task('watchImg', function () {
            return temmoGulp.buildImg(paths.filePath, paths.destPath, true, true);
        });

        runSequence('watchImg');
    });
});