import path from 'path'
import fs from 'fs'

import { glob } from 'glob'

import { src, dest, watch, series } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';

const sass = gulpSass(dartSass)

import terser from 'gulp-terser'
import sharp from 'sharp'

export function js( done ) {
    src('src/js/app.js')
        .pipe(terser())
        .pipe( dest('build/js') ) 

    done()
}

export function css(done) {
    src('src/scss/app.scss', { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([cssnano()])) // Aplica compresión adicional
        .pipe(dest('build/css', { sourcemaps: "." }));

    done();
}

// Función Crop para Galería Js

export async function crop(done) {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}


// Convertir imagenes a formatos web

export async function imagenes(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images = await glob('./src/img/**/*.{jpg,jpeg,png}');

    await Promise.all(
        images.map(async file => {
            const relativePath = path.relative(srcDir, path.dirname(file));
            const outputSubDir = path.join(buildDir, relativePath);
            await procesarImagenes(file, outputSubDir);
        })
    );

    done();
}


async function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file));
    const extName = path.extname(file);
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`);
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`);
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`);

    const options = { quality: 80 };

    await sharp(file).jpeg(options).toFile(outputFile);
    await sharp(file).webp(options).toFile(outputFileWebp);
    await sharp(file).avif(options).toFile(outputFileAvif);
}

// Acaban funciones para Imagenes 

export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
    //watch('src/img/**/*.{png,jpg}', imagenes)
}

export default series( /*crop,*/ js, css, /* imagenes, */ dev )   //Comentado hasta usarse