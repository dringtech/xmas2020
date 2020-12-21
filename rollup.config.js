import copy from 'rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import common from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import styles from 'rollup-plugin-styles';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev', '--host', '0.0.0.0'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        }
      );

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

const outputDir = 'docs';

export default [
  {
    input: 'src/main.js',
    external: [ 'p5' ],
    output: {
      file: `${outputDir}/bundle.js`,
      format: 'iife',
      assetFileNames: '[name]-[hash][extname]',
      globals: { p5: 'p5' },
    },
    plugins: [
      resolve(),
      common(),
      styles({
        mode: 'extract',
        sourceMap: true,
        minimize: production,
      }),
      json(),
      html({
        title: 'Merry Christmas from The Drings',
        template: ({ attributes, bundle, files, publicPath, title, meta }) => {
          const htmlAttributes = Object.entries(attributes.html)
            .map(([k, v]) => `${k}="${v}"`)
            .join(' ');
          const metas = meta
            .map(
              (m) =>
                `<meta ${Object.entries(m)
                  .map(([k, v]) => `${k}="${v}"`)
                  .join(' ')}>`
            )
            .join('\n');
          const scripts = files.js
            .map((x) => `<script src="${x.fileName}"></script>`)
            .join('\n');
          const links = files.css
            .map((x) => `<link href="${x.fileName}" rel="stylesheet">`)
            .join('\n');
          return `<!DOCTYPE html>
<html ${htmlAttributes}>
  <head>
    ${metas}
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Mountains+of+Christmas&display=swap" rel="stylesheet"> 
    ${links}
    <script src="https://cdn.jsdelivr.net/npm/p5@1.2.0/lib/p5.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.2.0/lib/addons/p5.sound.min.js"></script>
  </head>
  <body>
    <main></main>
    ${scripts}
  </body>
</html>`;
        },
        meta: [
          { charset: 'utf-8' },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
        ],
      }),
      copy({
        targets: [{ src: 'src/assets/', dest: outputDir }],
      }),
      !production && serve(),
      !production && livereload('docs'),
      production && terser(),
    ],
  },
];
