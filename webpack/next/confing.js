{
	"mode": "production",
	"devtool": false,
	"name": "client",
	"target": "web",
	"externals": [],
	"optimization": {
		"runtimeChunk": {
			"name": "static/runtime/webpack.js"
		},
		"splitChunks": {
			"chunks": "all",
			"cacheGroups": {
				"default": false,
				"vendors": false,
				"commons": {
					"name": "commons",
					"chunks": "all",
					"minChunks": 3
				},
				"react": {
					"name": "commons",
					"chunks": "all",
					"test": {}
				},
				"styles": {
					"name": "styles",
					"test": {},
					"chunks": "all",
					"enforce": true
				}
			}
		},
		"minimizer": [{
			"options": {
				"test": {},
				"extractComments": false,
				"sourceMap": false,
				"cache": true,
				"parallel": true,
				"terserOptions": {
					"output": {
						"comments": {}
					},
					"safari10": true
				}
			}
		}]
	},
	"recordsPath": "/Users/jerry/Desktop/github/next-dva/.next/records.json",
	"context": "/Users/jerry/Desktop/github/next-dva",
	"output": {
		"path": "/Users/jerry/Desktop/github/next-dva/.next",
		"libraryTarget": "jsonp",
		"hotUpdateChunkFilename": "static/webpack/[id].[hash].hot-update.js",
		"hotUpdateMainFilename": "static/webpack/[hash].hot-update.json",
		"chunkFilename": "static/chunks/[name].[contenthash].js",
		"strictModuleExceptionHandling": true,
		"futureEmitAssets": true,
		"webassemblyModuleFilename": "static/wasm/[modulehash].wasm"
	},
	"performance": {
		"hints": false
	},
	"resolve": {
		"extensions": [".wasm", ".mjs", ".js", ".jsx", ".json"],
		"modules": ["node_modules"],
		"alias": {
			"next": "/Users/jerry/Desktop/github/next-dva/node_modules/next",
			"private-next-pages": "/Users/jerry/Desktop/github/next-dva/pages",
			"private-dot-next": "/Users/jerry/Desktop/github/next-dva/.next",
			"components": "/Users/jerry/Desktop/github/next-dva/components",
			"~": "/Users/jerry/Desktop/github/next-dva/static"
		},
		"mainFields": ["browser", "module", "main"]
	},
	"resolveLoader": {
		"modules": ["/Users/jerry/Desktop/github/next-dva/node_modules/next/node_modules", "node_modules", "/Users/jerry/Desktop/github/next-dva/node_modules/next/dist/build/webpack/loaders"]
	},
	"module": {
		"rules": [{
			"test": {},
			"include": ["/Users/jerry/Desktop/github/next-dva", {}],
			"use": {
				"loader": "next-babel-loader",
				"options": {
					"dev": false,
					"isServer": false,
					"cwd": "/Users/jerry/Desktop/github/next-dva"
				}
			}
		}, {
			"test": {},
			"exclude": {},
			"use": ["/Users/jerry/Desktop/github/next-dva/node_modules/mini-css-extract-plugin/dist/loader.js", {
				"loader": "css-loader",
				"options": {
					"modules": true,
					"minimize": true,
					"sourceMap": false,
					"importLoaders": 1,
					"localIdentName": "[local]___[hash:base64:5]"
				}
			}, {
				"loader": "less-loader",
				"options": {
					"javascriptEnabled": true
				}
			}]
		}, {
			"test": {},
			"include": {},
			"use": ["/Users/jerry/Desktop/github/next-dva/node_modules/mini-css-extract-plugin/dist/loader.js", {
				"loader": "css-loader",
				"options": {
					"modules": false,
					"minimize": true,
					"sourceMap": false,
					"importLoaders": 1
				}
			}, {
				"loader": "less-loader",
				"options": {
					"javascriptEnabled": true
				}
			}]
		}]
	},
	"plugins": [{}, {
		"filename": "react-loadable-manifest.json"
	}, {
		"options": {
			"context": null,
			"hashFunction": "md4",
			"hashDigest": "base64",
			"hashDigestLength": 4
		}
	}, {
		"definitions": {
			"process.browser": "true"
		}
	}, {}, {
		"options": {}
	}, {
		"options": {
			"filename": "static/css/[name].[contenthash:8].css",
			"chunkFilename": "static/css/[name].[contenthash:8].chunk.css"
		}
	}]
}