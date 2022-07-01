// Подключаем основной модуль
import gulp from 'gulp';

// Подключаем плагины
import browserSync from 'browser-sync';
import del from 'del';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import mqpacker from '@hail2u/css-mqpacker';
import _if_ from 'gulp-if';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import webpack from 'webpack-stream';
import TerserPlugin from 'terser-webpack-plugin';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGiflossy from 'imagemin-giflossy';
import imageminSvgo from 'imagemin-svgo';
import svgstore from 'gulp-svgstore';
import inject from 'gulp-inject';

// Задаем переменные окружения
const isProd = process.argv.includes('--build');
const isDevv = !isProd

// Задаем переменные для путей
const srcDir = 'src';
const buildDir = 'build';

const config = {
	src: {
		pages: `${srcDir}/*.html`,
		styles: `${srcDir}/styles/*.scss`,
		scripts: `${srcDir}/scripts/*.js`,
		images: `${srcDir}/images/*.{jpg,jpeg,png,gif,svg}`,
		icons: `${srcDir}/images/icons/*.svg`,
		assets: `${srcDir}/assets/**/*.*`,
	},
	build: {
		pages: `${buildDir}/`,
		styles: `${buildDir}/styles/`,
		scripts: `${buildDir}/scripts/`,
		images: `${buildDir}/images/`,
		assets: `${buildDir}/assets/`,
	},
	watch: {
		pages: [`${srcDir}/*.html`, `${srcDir}/images/icons/*.svg`],
		styles: `${srcDir}/styles/**/*.scss`,
		scripts: `${srcDir}/scripts/**/*.js`,
		images: `${srcDir}/images/*.{jpg,jpeg,png,gif,svg}`,
		assets: `${srcDir}/assets/**/*`
	}
};

// Очищаем папку сборки
const clean = () => {
	return del(buildDir);
}

// Копируем файлы
const copy = () => {
	return gulp.src(config.src.assets)
		.pipe(gulp.dest(config.build.assets));
}

// Создаем сервер
const server = (done) => {
	browserSync.init({
		server: {
			baseDir: buildDir
		},
		notify: false,
		port: 3000,
		cors: true
	});

	done();
}

// Собираем страницы
const pages = () => {
	const sprite = gulp.src(config.src.icons)
		.pipe(svgstore({ inlineSvg: true }));

	return gulp.src(config.src.pages)
		.pipe(inject(sprite, {
			transform: function(filePath, file) {
				return file.contents.toString();
			}
		}))
		.pipe(_if_(isProd, replace(/(?=scripts|styles)(.+)(\.min)?\.(js|css)/g, '$1.min.$3')))
		.pipe(gulp.dest(config.build.pages))
		.pipe(browserSync.stream());
}

// Собираем стили
const sass = gulpSass(dartSass);

const styles = () => {
	return gulp.src(config.src.styles)
		.pipe(sass({
			outputStyle: 'expanded',
		}))
		.pipe(postcss([
			autoprefixer()
		]))
		.pipe(_if_(isProd, postcss([
			mqpacker(),
			cssnano()
		])))
		.pipe(_if_(isProd, rename({
			suffix: '.min'
		})))
		.pipe(gulp.dest(config.build.styles))
		.pipe(browserSync.stream());
}

// Собираем скрипты
const scripts = () => {
	return gulp.src(config.src.scripts)
		.pipe(webpack({
			mode: isDevv ? 'development' : 'production',
			output: {
				filename: isDevv ? 'main.js' : 'main.min.js',
				environment: {
					arrowFunction: false
				}
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						use: 'babel-loader'
					}
				]
			},
			optimization: {
				minimize: isProd ? true : false,
				minimizer: [new TerserPlugin({
					extractComments: false,
					terserOptions: {
						keep_fnames: false
					}
				})]
			}
		}))
		.pipe(gulp.dest(config.build.scripts))
		.on('end', browserSync.reload);
}

// Оптимизируем картинки
const images = () => {
	return gulp.src(config.src.images, {since: gulp.lastRun(images)})
		.pipe(_if_(isProd, imagemin([
			imageminMozjpeg({
				quality: 90,
				progressive: true
			}),
			imageminPngquant({
				speed: 1,
				quality: [0.8, 0.9]
			}),
			imageminGiflossy({
				optimizationLevel: 3,
				interlaced: true
			}),
			imageminSvgo({
				plugins: [{
					name: 'removeViewBox', active: false
				}]
			})
		])))
		.pipe(gulp.dest(config.build.images))
		.on('end', browserSync.reload);
}

// Наблюдаем за изменениями в файлах
const watcher = () => {
	gulp.watch(config.watch.assets, copy);
	gulp.watch(config.watch.pages, pages);
	gulp.watch(config.watch.styles, styles);
	gulp.watch(config.watch.scripts, scripts);
	gulp.watch(config.watch.images, images);
}

// Выполняем сценарий по умолчанию
export default gulp.series(
	clean,
	gulp.parallel(
		copy,
		pages,
		styles,
		scripts,
		images,
	),
	gulp.parallel(
		watcher,
		server
	)
)
