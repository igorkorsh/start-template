import del from 'del';
import { build } from './config';

const clean = () => del(build);

export default clean;