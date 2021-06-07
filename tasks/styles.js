import { src, dest } from 'gulp';
import { path } from './config';
import sass from 'gulp-sass';
import dartCompiler from 'sass';
import Fiber from 'fibers';
sass.compiler = dartCompiler;
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import rename from 'gulp-rename';
import _if_ from 'gulp-if';

const styles = () => {
  return src(path.src.styles)
  .pipe(sass({fiber: Fiber, outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(_if_(!!(process.env.NODE_ENV === 'production'), postcss([
    autoprefixer(),
    cssnano()
  ])))
  .pipe(_if_(!!(process.env.NODE_ENV === 'production'), rename({suffix: '.min'})))
  .pipe(dest(path.build.styles))
};

export default styles;
