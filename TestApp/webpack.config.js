const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
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
  mode:'development',
  entry: {
    mainfile: './src/index.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
  },
  
  output: {
    publicPath: "http://localhost:8080/",
  },
  module: {
    
  
    rules: [
      
      {
        test: /\.bundle\.js$/,
        use: 'bundle-loader'
      },
      {
      test: /\.html$/,
      use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "assets"//it will create a new folder with assets name inside dist folder after the build.
          }
        }
      },
      {

        test: /\.scss$/,
        use:[
          "style-loader",//3.Inject styles into DOM
          //2.turns css into commonjs
          "css-loader",
          "sass-loader"
           // "sass-loader"//1.turns sass into css.it execute in reverse order
          //  {
          //   loader: 'sass-loader',
          //   options: {
          //     sassOptions: {
          //        includePaths: ["./src/stylesheet","./src/newstyle"],
          //     },
          //   },
          // },
        ]
      },
     
     
    ]
  },
  plugins: [
   
    new ModuleFederationPlugin({
      name: "TestApp",
    // library: { type: "var", name: "TestApp" },
      remotes: {
       TestApp2: "TestApp2@http://localhost:8081/remoteEntry.js",
        //TestApp2: "TestApp2"
      },
      shared: require("./package.json").dependencies
    }),
    new HtmlWebpackPlugin({//it will generate a new index.html file everytime inside dist folder with dynamic script name
      template: "./src/template.html"
    })
    
  ],
    
  
  
};
