import { defineConfig } from 'umi';
import LodashWebpackPlugin from 'lodash-webpack-plugin';

import Constant from './constant';
import Theme from './theme';
import routers from './router.config'

const API_ENV = process.env.NODE_ENV;

const chainWebpack = config => {
  config.plugin('lodash').use(LodashWebpackPlugin, [
    {
      collections: true,
      paths: true,
    },
  ]);
};
const plugins = {
  hash: true,
  antd: {},
  base: '/',
  history: { type: 'hash' },
  publicPath: API_ENV === 'development' ? '/' : './',
  outputPath: 'dist',
  favicon: '/public/favicon.ico',
  antd: {
    dark: false,
    compact: false,
  },
  dva: {
    immer: true,
    hmr: true,
  },
  locale: {
    baseSeparator: '-',
    default: 'zh-CN',
    antd: true,
    title: true,
    baseNavigator: true,
  },
};

const define = {
  'process.env.NODE_ENV': process.env.NODE_ENV,
  ...Constant,
};

// https://umijs.org/config/
export default defineConfig({
  alias: {},
  analyze: {},
  autoprefixer: { flexbox: 'no-2009' },
  base: './',
  chainWebpack,
  chunks: ['umi'],
  cssLoader: {
    modules: {
      getLocalIdent: (context, localIdentName, localName, options) => {
        if (context.resourcePath.includes('node_modules')) {
          return localName;
        }
      },
    },
  },
  define,
  dynamicImport: {
    loading: '@/components/PageLoading',
  },
  extraBabelPlugins: ['lodash'],
  hash: true,
  history: { type: 'browser' }, // browser、hash、memory
  ignoreMomentLocale: true,
  routes: routers,
  targets: { ie: 11, chrome: 49, firefox: 45, safari: 10, edge: 13, ios: 10 },
  theme: Theme,
  title: 'xxx网站',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://182.168.12:8080/api'
      }
    }
  },
  ...plugins,
});
