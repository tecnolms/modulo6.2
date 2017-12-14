var path = require("path");
var webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var isProd = process.env.NODE_ENV === "production"

var publicPath = isProd ? "./" : "dist/"

module.exports = [
  {
    // Bundle for SCSS
    entry: "./src/assets/sass/theme.scss",
    output: {
      filename: "index.css",
      path: path.resolve(__dirname, "./dist/css/"),
      publicPath: "dist/"
    },
    devtool: "eval-source-map",
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract([
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                plugins: function() {
                  return [require("autoprefixer")];
                }
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ])
        },
        {
          test: /.(woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/,
          loader: "file-loader",
          options: {
            name: "fonts/[name].[sha512:hash:base64:6].[ext]",
            publicPath: "./"
          }
        },
        {
          test: /.(png|gif|svg|jpe?g)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "img/[name].[sha512:hash:base64:6].[ext]",
                useRelativePath: true,
                context: "",
                emitFile: true,
                publicPath: "./",
                loader: "image-webpack-loader",
                options: {
                  progressive: true,
                  optimizationLevel: 6,
                  pngquant: {
                    quality: "65-90",
                    speed: 4
                  },
                  gifsicle: {
                    interlaced: false
                  }
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("index.css")
      //if you want to pass in options, you can do so:
      //new ExtractTextPlugin({
      //  filename: 'style.css'
      //})
    ]
  },
  {
    entry: "./src/main.js",
    output: {
      path: path.resolve(__dirname, "./dist"),
      publicPath: isProd ? "./" : "./dist",
      filename: "build.js"
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: {
            loaders: {
              // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
              // the "scss" and "sass" values for the lang attribute to the right configs here.
              // other preprocessors should work out of the box, no loader config like this necessary.
              scss: "vue-style-loader!css-loader!sass-loader",
              sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
            }
            // other vue-loader options go here
          }
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /.(png|gif|svg|jpe?g|ico)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "img/[name].[sha512:hash:base64:6].[ext]",
                publicPath: publicPath,
                useRelativePath: true,
                context: "",
                emitFile: true,
                loader: "image-webpack-loader",
                options: {
                  progressive: true,
                  optimizationLevel: 6,
                  pngquant: {
                    quality: "65-90",
                    speed: 4
                  },
                  gifsicle: {
                    interlaced: false
                  }
                }
              }
            }
          ]
        },
        {
          test: /.(woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/,
          loader: "file-loader",
          options: {
            publicPath: publicPath,
            name: "fonts/[name].[sha512:hash:base64:6].[ext]"
          }
        },
        {
          test: /.(pdf|doc?x|ppt?x)$/,
          loader: "file-loader",
          options: {
            publicPath: publicPath,
            name: "pdf/[name].[sha512:hash:base64:6].[ext]"
          }
        },
        {
          test: /.(mp4|avi|webm)$/,
          loader: "file-loader",
          options: {
            publicPath: publicPath,
            name: "video/[name].[sha512:hash:base64:6].[ext]"
          }
        },
        {
          test: /.(mp3|ogv)$/,
          loader: "file-loader",
          options: {
            publicPath: publicPath,
            name: "audio/[name].[sha512:hash:base64:6].[ext]"
          }
        }
      ]
    },
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js"
      }
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true
    },
    performance: {
      hints: false
    },
    devtool: "#eval-source-map",
    plugins: [new HtmlWebpackPlugin({
      title: "Curso",
      template: isProd ? "index-prod.html" : "index.html"
    })]
  }
];

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
