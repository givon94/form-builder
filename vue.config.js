const CopyPlugin = require('copy-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
	  configureWebpack: {
	    plugins: [
			new CopyPlugin({
	      		patterns: [
			        {
			          from: 'src/styles/style.css',
			          to: 'api/files/form_style.css',
			        },
	      		],
	    	}),
	    ],
	}
}


