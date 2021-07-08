#### yarn add webpack webpack-cli webpack-dev-server -D 
#### yarn add clean-webpack-plugin html-webpack-plugin -D   
#### yarn add @babel/cli @babel/core @babel/preset-env @babel/preset-react -D  
#### yarn add eslint-loader eslint eslint-config-airbnb eslint-config-standard babel-eslint eslint-friendly-formatter -D 

#### Cannot find module 'webpack-cli/bin/config-yargs'
"webpack-cli": "^3.3.12",
#### CleanWebpackPlugin is not a constructor
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

#### clean-webpack-plugin only accepts an options object. See:
https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional