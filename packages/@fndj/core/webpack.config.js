/* eslint-disable */
module.exports = {
	entry: "./a.js",
	output: {
		filename: "lib.js",
		library: {
			type: "module"
		}
	},
	target: "web",
	optimization: {
		minimize: true
	},
	experiments: {
		topLevelAwait: true,
		outputModule: true
	}
};


/*
the consuming app should use this:

// app.js
const myModule = await import("library");

// webpack.config.js
module.exports = (env, { testPath }) => ({
	target: "node14",
	output: {
		chunkLoading: "import"
	},
	resolve: {
		alias: {
			library: path.resolve(testPath, "../0-create-library/lib.js")
		}
	},
	experiments: {
		topLevelAwait: true,
		outputModule: true
	}
});

*/
