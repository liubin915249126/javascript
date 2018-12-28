{
	"bail": true,
	"devtool": false,
	"entry": {
		"index": ["./src/index.js"]
	},
	"output": {
		"path": "/Users/yangsaina/Desktop/gitlab/operate_manager/dist",
		"filename": "[name].js",
		"publicPath": "/",
		"libraryTarget": "var",
		"chunkFilename": "[name].async.js"
	},
	"resolve": {
		"modules": ["/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/roadhog/node_modules", "/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules", "node_modules"],
		"extensions": [".web.js", ".web.jsx", ".web.ts", ".web.tsx", ".js", ".json", ".jsx", ".ts", ".tsx"]
	},
	"resolveLoader": {
		"modules": ["/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/roadhog/node_modules", "/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules"],
		"moduleExtensions": ["-loader"]
	},
	"module": {
		"rules": [{
			"exclude": [{}, {}, {}, {}, {}, {}],
			"loader": "url",
			"options": {
				"limit": 10000,
				"name": "static/[name].[hash:8].[ext]"
			}
		}, {
			"test": {},
			"include": "/Users/yangsaina/Desktop/gitlab/operate_manager/src",
			"loader": "babel",
			"options": {
				"babelrc": false,
				"presets": ["/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/babel-preset-es2015/lib/index.js", "/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/babel-preset-react/lib/index.js", "/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/babel-preset-stage-0/lib/index.js"],
				"plugins": ["/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/babel-plugin-add-module-exports/lib/index.js", "/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/babel-plugin-react-require/lib/index.js", "/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/babel-plugin-syntax-dynamic-import/lib/index.js", "transform-runtime", "transform-decorators-legacy", "transform-class-properties", ["import", {
					"libraryName": "antd",
					"libraryDirectory": "es",
					"style": true
				}]],
				"cacheDirectory": true
			}
		}, {
			"test": {},
			"use": [{
				"loader": "/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/extract-text-webpack-plugin/dist/loader.js",
				"options": {
					"omit": 0,
					"remove": true
				}
			}, {
				"loader": "css",
				"options": {
					"importLoaders": 1,
					"sourceMap": true,
					"modules": true,
					"localIdentName": "[local]___[hash:base64:5]"
				}
			}, {
				"loader": "postcss"
			}]
		}, {
			"test": {},
			"use": [{
				"loader": "/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/extract-text-webpack-plugin/dist/loader.js",
				"options": {
					"omit": 0,
					"remove": true
				}
			}, {
				"loader": "css",
				"options": {
					"importLoaders": 1,
					"sourceMap": true,
					"modules": true,
					"localIdentName": "[local]___[hash:base64:5]"
				}
			}, {
				"loader": "postcss"
			}, {
				"loader": "less",
				"options": {
					"modifyVars": {
						"card-actions-background": "#f5f8fa"
					}
				}
			}]
		}, {
			"test": {},
			"use": [{
				"loader": "/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/extract-text-webpack-plugin/dist/loader.js",
				"options": {
					"omit": 0,
					"remove": true
				}
			}, {
				"loader": "css",
				"options": {
					"importLoaders": 1,
					"sourceMap": true
				}
			}, {
				"loader": "postcss"
			}]
		}, {
			"test": {},
			"use": [{
				"loader": "/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/extract-text-webpack-plugin/dist/loader.js",
				"options": {
					"omit": 0,
					"remove": true
				}
			}, {
				"loader": "css",
				"options": {
					"importLoaders": 1,
					"sourceMap": true
				}
			}, {
				"loader": "postcss"
			}, {
				"loader": "less",
				"options": {
					"modifyVars": {
						"card-actions-background": "#f5f8fa"
					}
				}
			}]
		}, {
			"test": {},
			"loader": "file",
			"options": {
				"name": "[name].[ext]"
			}
		}, {
			"test": {},
			"include": "/Users/yangsaina/Desktop/gitlab/operate_manager/src",
			"use": [{
				"loader": "babel",
				"options": {
					"babelrc": false,
					"presets": ["/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/babel-preset-es2015/lib/index.js", "/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/babel-preset-react/lib/index.js", "/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/babel-preset-stage-0/lib/index.js"],
					"plugins": ["/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/babel-plugin-add-module-exports/lib/index.js", "/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/babel-plugin-react-require/lib/index.js", "/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/babel-plugin-syntax-dynamic-import/lib/index.js", "transform-runtime", "transform-decorators-legacy", "transform-class-properties", ["import", {
						"libraryName": "antd",
						"libraryDirectory": "es",
						"style": true
					}]],
					"cacheDirectory": true
				}
			}, {
				"loader": "awesome-typescript",
				"options": {
					"transpileOnly": true
				}
			}]
		}, {
			"test": {},
			"loader": "file",
			"options": {
				"name": "static/[name].[hash:8].[ext]"
			}
		}]
	},
	"plugins": [{}, {}, {
		"filename": "[name].css",
		"id": 1,
		"options": {
			"allChunks": true
		}
	}, {
		"definitions": {
			"process.env": {
				"NODE_ENV": "\"production\""
			}
		}
	}, {}, {
		"resourceRegExp": {},
		"contextRegExp": {}
	}, {
		"options": {
			"options": {
				"context": "/Users/yangsaina/Desktop/gitlab/operate_manager/node_modules/roadhog/lib/config",
				"postcss": [null]
			},
			"test": {}
		}
	}, {
		"options": {
			"compress": {
				"screw_ie8": true,
				"warnings": false
			},
			"mangle": {
				"screw_ie8": true
			},
			"output": {
				"comments": false,
				"screw_ie8": true,
				"ascii_only": true
			}
		}
	}],
	"externals": {
		"g2": "G2",
		"g-cloud": "Cloud",
		"g2-plugin-slider": "G2.Plugin.slider"
	},
	"node": {
		"fs": "empty",
		"net": "empty",
		"tls": "empty"
	}
}