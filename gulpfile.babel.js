import { series, parallel } from 'gulp';
import clean from './tasks/clean';
import pages from './tasks/pages';
import styles from './tasks/styles';
import scripts from './tasks/scripts';
import images from './tasks/images';
import server from './tasks/server';
import watch from './tasks/watch';

export default series(
  clean,
  parallel(
    pages,
    styles,
    scripts,
    images,
  ),
  server,
  watch
)
