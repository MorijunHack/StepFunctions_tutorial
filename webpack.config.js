'use strict';
const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const ROOT_DIR = path.resolve(__dirname);
const SRC_DIR = path.join(ROOT_DIR, 'src');

const entry = entries('lambda');
// const entry = { ...entries('lambda') };

const output = {
    filename: '[name].js',
    path: path.join(ROOT_DIR, '.dist'),
    libraryTarget: 'commonjs2',
};

module.exports = {
    // devtool: 'source-map',
    entry,
    externals: [nodeExternals()],
    mode: 'development',

    module: {
        rules: [
            {
                include: [
                    SRC_DIR,
                ],
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                },
            },
        ]
    },
    output,

    resolve: {
        extensions: ['.ts'],
        alias: {
            'src': SRC_DIR,
        },
        modules: [
            SRC_DIR,
            'node_modules',
        ],
    },
    target: 'node',
};

function entries() {
    const retval = {};

    const dirpath = SRC_DIR;
    const targets = fs.readdirSync(dirpath, { withFileTypes: true });

    for (const dirent of targets) {
        if (dirent.isDirectory() === false) continue;
        const { name } = dirent;
        retval[`${name}/index`] = path.join(dirpath, name, 'index.ts');
    }

    return retval;
}
