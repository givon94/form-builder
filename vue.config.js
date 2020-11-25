const CopyPlugin = require('copy-webpack-plugin');
const path = require('path')


module.exports = {
	  configureWebpack: {
	    plugins: [
			new CopyPlugin({
	      		patterns: [
			        {
			          from: 'src/styles/style.css',
			          to: 'api/files/form_style.min.css',
			        },
	      		],
	    	}),
	    ],
	},
	publicPath: ""
}


