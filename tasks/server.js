import { path, build } from './config';
import bs from 'browser-sync';

const server = (done) => {
  bs.create().init({
    server: build,
    notify: false,
    cors: true,
    open: false,
    files: [
      path.watch.pages, {
        fn: () => this.reload
      },
      path.watch.styles,
      path.watch.scripts,
      path.watch.images, {
        fn: () => this.stream()
      }
    ]
  });

  done();
};

export default server;
