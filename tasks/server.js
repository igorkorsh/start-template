import { path, build } from './config';
import { create as bsCreate } from 'browser-sync';

const bs = bsCreate();

const server = (done) => {
  bs.init({
    server: build,
    notify: false,
    cors: true,
    open: true,
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
