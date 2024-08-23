const presetEnv = require.resolve('@babel/preset-env');
const presetReact = require.resolve('@babel/preset-react');
const tsPreset = require.resolve('@babel/preset-typescript');
const webpack = require('webpack');
const transformRuntimePlugin = require.resolve('@babel/plugin-transform-runtime');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = settings => ({
    target: 'web',
    mode: 'production',
    output: {
        filename: '[name].bundle.js',
        path: '/',
        publicPath: `/webapp/${settings.appName}`
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|jsx|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [presetEnv, tsPreset, presetReact],
                        plugins: [transformRuntimePlugin]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader','sass-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader','sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name(resourcePath) {
                                return resourcePath;
                            },
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            BASENAME: JSON.stringify(`/webapp/${settings.appName}`)
        }),
        new htmlWebpackPlugin({
            templateContent: settings.htmlTemplate
        })
    ]
});
