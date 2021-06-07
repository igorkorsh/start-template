import { path } from './config';
import { rollup } from 'rollup';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const scripts = () => {
  return rollup({
    input: `${path.src.scripts}/main.js`,
    plugins: [
      babel({
        babelHelpers: 'bundled'
      }),
      !!(process.env.NODE_ENV === 'production') && terser()
    ]
  }).then(bundle => {
    return bundle.write({
      file: path.build.scripts + (!!(process.env.NODE_ENV === 'production') ? 'main.min.js' : 'main.js'),
      format: 'iife',
    })
  })
};

export default scripts;
