import { src, dest } from 'gulp';
import { path } from './config';
import replace from 'gulp-replace';
import _if_ from 'gulp-if';

const pages = () => {
  return src(path.src.pages)
  .pipe(_if_(!!(process.env.NODE_ENV === 'production'), replace(/(?<!min)(\.(css|js))/g, '.min$1')))
  .pipe(dest(path.build.pages))
};

export default pages;
