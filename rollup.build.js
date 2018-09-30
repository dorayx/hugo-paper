const glob = require('glob');
const path = require('path');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');

function readFiles(pattern) {
  return new Promise((resolve, reject) => {
    glob(pattern, null, (err, paths) => {
      if (err) return reject(err);
      else resolve(paths);
    });
  });
}

function createInputOptions(files) {
  return files.map(f => ({
    input: path.resolve(__dirname, f),
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }));
}

function createOutputOptions(files, from, to) {
  return files.map(f => {
    const relPath = path.relative(from, f);
    const dirname = path.dirname(relPath);
    const ext = path.extname(relPath);
    const name = path.basename(relPath, ext);
    return {
      file: path.resolve(path.resolve(__dirname, to), path.join(dirname, `${name}.build${ext}`)),
      format: 'iife'
    };
  });
}

const mapCollections = ([col1, col2], cb) => col1.map((col1Item, index) => cb(col1Item, col2[index]));
async function runTasks(inputOptions, outputOptions) {
  const errors = [];
  const bundles = mapCollections([inputOptions, outputOptions], async (input, output) => {
    try {
      const bundle = await rollup.rollup(input);
      return await bundle.write(output);
    } catch (e) {
      errors.push(e);
    }
  });
  return [errors, await Promise.all(bundles)];
}

const dirname = (pattern) => path.dirname(pattern).replace(/\*[^\s]+/g, '');
async function build({ from, to }) {
  const files = await readFiles(from);

  const inputOptions = createInputOptions(files);
  const outputOptions = createOutputOptions(files, dirname(from), to);

  const [errors, tasks] = await runTasks(inputOptions, outputOptions);
  console.log(errors, tasks);
}

build({
  from: './assets.raw/**/*.js',
  to: './assets'
});

