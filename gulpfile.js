const { src, dest, series, parallel } = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const clean = require('gulp-clean');
const brotli = require('gulp-brotli');
const gzip = require('gulp-gzip');

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
    return src('./dist/**/*', { read: false }).pipe(clean());
}

exports.clean = taskClean;
exports.buildDev = buildDev;
exports.buildProd = buildProd;
exports.compressBrotli = compressBrotli
exports.compressGzip = compressGzip;
exports.compress = parallel(exports.compressBrotli, exports.compressGzip);
exports.dev = series(exports.clean, buildDev);
exports.prod = series(exports.clean, buildProd, exports.compress);