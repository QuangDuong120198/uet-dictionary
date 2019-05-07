const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        "no-redux": "./src/no-redux/index.js",
        "with-redux": "./src/with-redux/index.js"
    },
    output: {
        path: path.resolve(__dirname, "js"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [ "@babel/preset-env", "@babel/preset-react" ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: [ ".js", ".jsx" ]
    }
};
