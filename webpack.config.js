const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
    entry: {
        'dist/index': './src/index.ts',
    },
    externals: [
        // externals here
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname),
        libraryTarget: 'umd'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
            sourceMap: true
        })],
    },
    performance: {
        hints: false
    }
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    return config;
};
