{
	"dir": "/Users/jerry/Desktop/ssr/dva/examples/with-nextjs",
	"dev": true,
	"isServer": true,
	"config": {
		"webpackDevMiddleware": null,
		"poweredByHeader": true,
		"distDir": ".next",
		"assetPrefix": "",
		"configOrigin": "next.config.js",
		"useFileSystemPublicRoutes": true,
		"generateEtags": true,
		"pageExtensions": ["jsx", "js"]
	},
	"defaultLoaders": {
		"babel": {
			"loader": "babel-loader",
			"options": {
				"cacheDirectory": true,
				"presets": [],
				"plugins": [],
				"babelrc": true
			}
		}
	}
} {
	"devtool": "source-map",
	"name": "server",
	"cache": true,
	"target": "node",
	"externals": [null],
	"context": "/Users/jerry/Desktop/ssr/dva/examples/with-nextjs",
	"output": {
		"path": "/Users/jerry/Desktop/ssr/dva/examples/with-nextjs/.next/dist",
		"filename": "[name]",
		"libraryTarget": "commonjs2",
		"chunkFilename": "[name]-[chunkhash].js",
		"strictModuleExceptionHandling": true
	},
	"performance": {
		"hints": false
	},
	"resolve": {
		"extensions": [".js", ".jsx", ".json"],
		"modules": ["/Users/jerry/Desktop/ssr/dva/examples/with-nextjs/node_modules/next/node_modules", "node_modules"],
		"alias": {
			"next": "/Users/jerry/Desktop/ssr/dva/examples/with-nextjs/node_modules/next",
			"react$": "react/cjs/react.development.js",
			"react-dom$": "react-dom/cjs/react-dom.development.js"
		}
	},
	"resolveLoader": {
		"modules": ["/Users/jerry/Desktop/ssr/dva/examples/with-nextjs/node_modules/next/node_modules", "node_modules", "/Users/jerry/Desktop/ssr/dva/examples/with-nextjs/node_modules/next/dist/server/build/loaders"]
	},
	"module": {
		"rules": [{
			"test": {},
			"include": ["/Users/jerry/Desktop/ssr/dva/examples/with-nextjs"],
			"exclude": {},
			"use": {
				"loader": "babel-loader",
				"options": {
					"cacheDirectory": true,
					"presets": [],
					"plugins": [],
					"babelrc": true
				}
			}
		}]
	},
	"plugins": [{
		"resourceRegExp": {},
		"contextRegExp": {}
	}, {}, {
		"options": {}
	}, {
		"prevAssets": {}
	}, {
		"options": {},
		"pathCache": {},
		"fsOperations": 0,
		"primed": false
	}, {
		"options": {
			"options": {
				"context": "/Users/jerry/Desktop/ssr/dva/examples/with-nextjs"
			},
			"test": {}
		}
	}, {}, {
		"definitions": {
			"process.env.NODE_ENV": "\"development\""
		}
	}, {}]
}