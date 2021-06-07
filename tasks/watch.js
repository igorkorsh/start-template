import pages from './pages';
import styles from './styles';
import scripts from './scripts';
import images from './images';
import { path } from './config';
import { watch } from 'gulp';

const observer = () => {
  watch(path.watch.pages, pages);
  watch(path.watch.styles, styles);
  watch(path.watch.scripts, scripts);
  watch(path.watch.images, images);
}

export default observer;