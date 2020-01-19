const { src, dest, series, parallel } = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const clean = require('gulp-clean');
const brotli = require('gulp-brotli');
const gzip = require('gulp-gzip');
const stream = require('stream');
const crypto = require('crypto');
const path = require('path');

function buildDev()
{
    var config = require('./webpack.config');
    config.mode = 'development';
    delete config.optimization;
    return src('./src/**/*.ts')
        .pipe(gulpWebpack(config, require('webpack')))
        .pipe(dest('./dist/'));
}

function buildProd()
{
    var config = require('./webpack.config');
    config.mode = 'production';
    delete config.devtool;
    return src('./src/**/*.ts')
        .pipe(gulpWebpack(config, webpack))
        .pipe(dest('./dist/'));
}

function compressBrotli()
{
    return src(['./dist/**/*.js', './dist/**/*.css'])
        .pipe(brotli.compress({
            extension: 'br',
            quality: 11,
        }))
        .pipe(dest('./dist'));
}

function compressGzip()
{
    return src(['./dist/**/*.js', './dist/**/*.css'])
        .pipe(gzip())
        .pipe(dest('./dist'));
}

function taskClean()
{
    return src(['./dist/**/*','!./dist/index.html','!./dist/CookieLaw-Custom.css','!./dist/mockup.jpg'], { read: false }).pipe(clean());
}

function buildHashes()
{
    const assemblyStream = new stream.Transform({objectMode: true});
    assemblyStream._transform = function (file, _, callback)
    {
        const ext = path.extname(file.path);
        const fileName = path.basename(file.path);
        const sha = crypto.createHash('sha384');
        sha.update(file.contents);
        const hash = sha.digest('base64');
        if (/\.js/i.test(ext))
        {
            console.info(`<script src="${fileName}" integrity="sha384-${hash}" crossorigin="anonymous" referrerpolicy="origin" async></script>`);
        }
        else
        {
            console.info(`<link rel="stylesheet" href="${fileName}" integrity="sha384-${hash}" crossorigin="anonymous" referrerpolicy="origin" />`);
        }

        callback();
    }

    return assemblyStream;
}

function htmlTags()
{
    return src(['./dist/**/*.js', './dist/**/*.css'])
            .pipe(buildHashes())
}

exports.clean = taskClean;
exports.buildDev = buildDev;
exports.buildProd = buildProd;
exports.compressBrotli = compressBrotli
exports.compressGzip = compressGzip;
exports.compress = parallel(exports.compressBrotli, exports.compressGzip);
exports.dev = series(exports.clean, buildDev);

exports.prod = series(exports.clean, buildProd, exports.compress, htmlTags);
exports.default = exports.prod;