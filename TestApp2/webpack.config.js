const path = require('path');
let HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
/**
 * placeholders
 * [hash]
 * [chunkhash]
 * [name]
 * [id]
 * [query]
 * [contenthash]
 */
module.exports = {
  mode: 'development',
  entry: {
    mainfile: './src/index.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8081,
  },
  output: {
    publicPath: "http://localhost:8081/",
  },
  module: {
    rules: [
      {
        test: /\.bundle\.js$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        }
        },
    {
        test: /\.html$/,
        use: ["html-loader"]
      },
     
      
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({//it will generate a new index.html file everytime inside dist folder with dynamic script name
      template: "./src/index.html"
    }),

    new ModuleFederationPlugin({
      name: "TestApp2",
      library: { type: "var", name: "TestApp2" },
      filename: "remoteEntry.js",
      remotes: {
        TestApp: "TestApp",
      },
      shared: ["sass-loader","file-loader"],
        
      
      exposes: {
        "./Button": "./src/Button.js"
      }
    })
  ],


};
