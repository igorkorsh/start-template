import { src, dest } from 'gulp';
import { path } from './config';
import imagemin from 'gulp-imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import pngquant from 'imagemin-pngquant';
import changed from 'gulp-changed';
import _if_ from 'gulp-if';

const images = () => {
  return src(path.src.images)
  .pipe(changed(path.build.images))
  .pipe(_if_(!!(process.env.NODE_ENV === 'production'), imagemin([
    pngquant({
      speed: 1,
      quality: [0.7, 0.9]
    }),
    mozjpeg({
      quality: 75,
      progressive: true
    }),
    imagemin.svgo({
      plugins: [{
        removeViewBox: false
      }]
    })
  ])))
  .pipe(dest(path.build.images))
};

export default images;
