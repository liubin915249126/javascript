{
	"mode": "development",
	"devtool": "cheap-module-source-map",
	"name": "client",
	"cache": true,
	"target": "web",
	"externals": [],
	"optimization": {
		"runtimeChunk": {
			"name": "static/runtime/webpack.js"
		},
		"splitChunks": {
			"cacheGroups": {
				"default": false,
				"vendors": false,
				"styles": {
					"name": "styles",
					"test": {},
					"chunks": "all",
					"enforce": true
				}
			}
		}
	},
	"recordsPath": "/Users/jerry/Desktop/gitlab/lan360/lwbBlogBuild/records.json",
	"context": "/Users/jerry/Desktop/gitlab/lan360",
	"output": {
		"path": "/Users/jerry/Desktop/gitlab/lan360/lwbBlogBuild",
		"libraryTarget": "jsonp",
		"hotUpdateChunkFilename": "static/webpack/[id].[hash].hot-update.js",
		"hotUpdateMainFilename": "static/webpack/[hash].hot-update.json",
		"chunkFilename": "static/chunks/[name].js",
		"strictModuleExceptionHandling": true
	},
	"performance": {
		"hints": false
	},
	"resolve": {
		"extensions": [".wasm", ".mjs", ".js", ".jsx", ".json"],
		"modules": ["/Users/jerry/Desktop/gitlab/lan360/node_modules/next/node_modules", "node_modules"],
		"alias": {
			"next": "/Users/jerry/Desktop/gitlab/lan360/node_modules/next"
		}
	},
	"resolveLoader": {
		"modules": ["/Users/jerry/Desktop/gitlab/lan360/node_modules/next/node_modules", "node_modules", "/Users/jerry/Desktop/gitlab/lan360/node_modules/next/dist/build/webpack/loaders"]
	},
	"module": {
		"rules": [{
			"test": {},
			"include": ["/Users/jerry/Desktop/gitlab/lan360/pages"],
			"use": {
				"loader": "hot-self-accept-loader",
				"options": {
					"include": ["/Users/jerry/Desktop/gitlab/lan360/pages"],
					"extensions": {}
				}
			}
		}, {
			"test": {},
			"include": ["/Users/jerry/Desktop/gitlab/lan360"],
			"exclude": {},
			"use": {
				"loader": "next-babel-loader",
				"options": {
					"dev": true,
					"isServer": false,
					"cwd": "/Users/jerry/Desktop/gitlab/lan360"
				}
			}
		}, {
			"test": {},
			"use": ["extracted-loader", "/Users/jerry/Desktop/gitlab/lan360/node_modules/mini-css-extract-plugin/dist/loader.js", {
				"loader": "css-loader",
				"options": {
					"modules": false,
					"minimize": false,
					"sourceMap": true,
					"importLoaders": 1
				}
			}, {
				"loader": "less-loader",
				"options": {
					"javascriptEnabled": true,
					"localIdentName": "[local]___[hash:base64:5]"
				}
			}]
		}]
	},
	"plugins": [{
		"_originalSettings": {
			"filename": "[name]_[hash].js",
			"path": "./static/development/dll",
			"context": "/Users/jerry/Desktop/gitlab/lan360",
			"entry": {
				"dll": ["react", "react-dom"]
			},
			"config": {
				"mode": "development",
				"resolve": {
					"extensions": [".wasm", ".mjs", ".js", ".jsx", ".json"],
					"modules": ["/Users/jerry/Desktop/gitlab/lan360/node_modules/next/node_modules", "node_modules"],
					"alias": {
						"next": "/Users/jerry/Desktop/gitlab/lan360/node_modules/next"
					}
				}
			}
		}
	}, {}, {
		"filename": "react-loadable-manifest.json"
	}, {
		"options": {
			"name": "client",
			"color": "green",
			"profile": false,
			"compiledIn": true,
			"done": null,
			"minimal": false,
			"stream": null
		}
	}, {
		"compilationSuccessInfo": {},
		"shouldClearConsole": true,
		"formatters": [null, null, null],
		"transformers": [null, null, null]
	}, {
		"options": {
			"resourceRegExp": {},
			"contextRegExp": {}
		}
	}, {
		"prevAssets": null
	}, {
		"options": {},
		"fullBuildTimeout": 200,
		"requestTimeout": 10000
	}, {}, {
		"prevAssets": {}
	}, {
		"options": {},
		"pathCache": {},
		"fsOperations": 0,
		"primed": false
	}, {}, {
		"definitions": {
			"process.browser": "true"
		}
	}, {
		"definitions": {
			"process.env.__NEXT_DIST_DIR": "\"/Users/jerry/Desktop/gitlab/lan360/lwbBlogBuild\""
		}
	}, {}, {}, {
		"options": {
			"filename": "static/css/[name].css",
			"chunkFilename": "static/css/[name].chunk.css"
		}
	}]
}
config {
	"mode": "development",
	"devtool": "cheap-module-source-map",
	"name": "server",
	"cache": true,
	"target": "node",
	"externals": [null],
	"optimization": {
		"splitChunks": false,
		"minimize": false
	},
	"recordsPath": "/Users/jerry/Desktop/gitlab/lan360/lwbBlogBuild/server/records.json",
	"context": "/Users/jerry/Desktop/gitlab/lan360",
	"output": {
		"path": "/Users/jerry/Desktop/gitlab/lan360/lwbBlogBuild/server",
		"libraryTarget": "commonjs2",
		"hotUpdateChunkFilename": "static/webpack/[id].[hash].hot-update.js",
		"hotUpdateMainFilename": "static/webpack/[hash].hot-update.json",
		"chunkFilename": "[name].js",
		"strictModuleExceptionHandling": true
	},
	"performance": {
		"hints": false
	},
	"resolve": {
		"extensions": [".wasm", ".mjs", ".js", ".jsx", ".json"],
		"modules": ["/Users/jerry/Desktop/gitlab/lan360/node_modules/next/node_modules", "node_modules"],
		"alias": {
			"next": "/Users/jerry/Desktop/gitlab/lan360/node_modules/next"
		}
	},
	"resolveLoader": {
		"modules": ["/Users/jerry/Desktop/gitlab/lan360/node_modules/next/node_modules", "node_modules", "/Users/jerry/Desktop/gitlab/lan360/node_modules/next/dist/build/webpack/loaders"]
	},
	"module": {
		"rules": [{
			"test": {},
			"include": ["/Users/jerry/Desktop/gitlab/lan360"],
			"exclude": {},
			"use": {
				"loader": "next-babel-loader",
				"options": {
					"dev": true,
					"isServer": true,
					"cwd": "/Users/jerry/Desktop/gitlab/lan360"
				}
			}
		}, {
			"test": {},
			"use": ["ignore-loader"]
		}]
	},
	"plugins": [{}, {
		"options": {
			"name": "server",
			"color": "green",
			"profile": false,
			"compiledIn": true,
			"done": null,
			"minimal": false,
			"stream": null
		}
	}, {
		"options": {
			"resourceRegExp": {},
			"contextRegExp": {}
		}
	}, {
		"prevAssets": null
	}, {}, {
		"prevAssets": {}
	}, {
		"options": {},
		"pathCache": {},
		"fsOperations": 0,
		"primed": false
	}, {}, {
		"definitions": {
			"process.browser": "false"
		}
	}, {}, {}, {
		"options": {
			"outputPath": "/Users/jerry/Desktop/gitlab/lan360/lwbBlogBuild/server"
		}
	}]
}