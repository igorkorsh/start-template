export const src = 'src';

export const build = 'build';

export const path = {
  src: {
    pages: `${src}/pages/*.html`,
    styles: `${src}/styles/*.scss`,
    scripts: `${src}/scripts`,
    images: `${src}/images/*.{jpg,jpeg,png,svg}`
  },
  build: {
    pages: `${build}/`,
    styles: `${build}/css/`,
    scripts: `${build}/js/`,
    images: `${build}/images/`
  },
  watch: {
    pages: `${src}/pages/*.html`,
    styles: `${src}/styles/**/*.scss`,
    scripts: `${src}/scripts/**/*.js`,
    images: `${src}/images/*.{jpg,jpeg,png,svg}`
  }
}
