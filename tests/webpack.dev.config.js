exports = {
	mode: 'development',
	context: 'D:\\Project\\KxUI',
	devtool: 'cheap-module-eval-source-map',
	node: {
		setImmediate: false,
		process: 'mock',
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	},
	output: {
		path: 'D:\\Project\\KxUI\\dist',
		filename: '[name].js',
		publicPath: '/',
		globalObject: 'this'
	},
	resolve: {
		alias: {
			'@': 'D:\\Project\\KxUI\\src',
			vue$: 'vue/dist/vue.runtime.esm.js'
		},
		extensions: [
			'.mjs',
			'.js',
			'.jsx',
			'.vue',
			'.json',
			'.wasm',
			'.ts',
			'.tsx'
		],
		modules: [
			'node_modules',
			'D:\\Project\\KxUI\\node_modules',
			'D:\\Project\\KxUI\\node_modules\\@vue\\cli-service\\node_modules'
		]
	},
	resolveLoader: {
		modules: [
			'D:\\Project\\KxUI\\node_modules\\@vue\\cli-plugin-typescript\\node_modules',
			'D:\\Project\\KxUI\\node_modules\\@vue\\cli-plugin-babel\\node_modules',
			'node_modules',
			'D:\\Project\\KxUI\\node_modules',
			'D:\\Project\\KxUI\\node_modules\\@vue\\cli-service\\node_modules'
		]
	},
	module: {
		noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
		rules: [
			/* config.module.rule('vue') */
			{
				test: /\.vue$/,
				use: [
					/* config.module.rule('vue').use('cache-loader') */
					{
						loader: 'cache-loader',
						options: {
							cacheDirectory: 'D:\\Project\\KxUI\\node_modules\\.cache\\vue-loader',
							cacheIdentifier: '355f5480'
						}
					},
					/* config.module.rule('vue').use('vue-loader') */
					{
						loader: 'vue-loader',
						options: {
							compilerOptions: {
								preserveWhitespace: false
							},
							cacheDirectory: 'D:\\Project\\KxUI\\node_modules\\.cache\\vue-loader',
							cacheIdentifier: '355f5480'
						}
					}
				]
			},
			/* config.module.rule('images') */
			{
				test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
				use: [
					/* config.module.rule('images').use('url-loader') */
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'img/[name].[hash:8].[ext]'
								}
							}
						}
					}
				]
			},
			/* config.module.rule('svg') */
			{
				test: /\.(svg)(\?.*)?$/,
				use: [
					/* config.module.rule('svg').use('file-loader') */
					{
						loader: 'file-loader',
						options: {
							name: 'img/[name].[hash:8].[ext]'
						}
					}
				]
			},
			/* config.module.rule('media') */
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				use: [
					/* config.module.rule('media').use('url-loader') */
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'media/[name].[hash:8].[ext]'
								}
							}
						}
					}
				]
			},
			/* config.module.rule('fonts') */
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				use: [
					/* config.module.rule('fonts').use('url-loader') */
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'fonts/[name].[hash:8].[ext]'
								}
							}
						}
					}
				]
			},
			/* config.module.rule('pug') */
			{
				test: /\.pug$/,
				use: [
					/* config.module.rule('pug').use('pug-plain-loader') */
					{
						loader: 'pug-plain-loader'
					}
				]
			},
			/* config.module.rule('css') */
			{
				test: /\.css$/,
				oneOf: [
					/* config.module.rule('css').oneOf('vue-modules') */
					{
						resourceQuery: /module/,
						use: [
							/* config.module.rule('css').oneOf('vue-modules').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('css').oneOf('vue-modules').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							/* config.module.rule('css').oneOf('vue-modules').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							}
						]
					},
					/* config.module.rule('css').oneOf('vue') */
					{
						resourceQuery: /\?vue/,
						use: [
							/* config.module.rule('css').oneOf('vue').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('css').oneOf('vue').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2
								}
							},
							/* config.module.rule('css').oneOf('vue').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							}
						]
					},
					/* config.module.rule('css').oneOf('normal-modules') */
					{
						test: /\.module\.\w+$/,
						use: [
							/* config.module.rule('css').oneOf('normal-modules').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('css').oneOf('normal-modules').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							/* config.module.rule('css').oneOf('normal-modules').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							}
						]
					},
					/* config.module.rule('css').oneOf('normal') */
					{
						use: [
							/* config.module.rule('css').oneOf('normal').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('css').oneOf('normal').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2
								}
							},
							/* config.module.rule('css').oneOf('normal').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							}
						]
					}
				]
			},
			/* config.module.rule('postcss') */
			{
				test: /\.p(ost)?css$/,
				oneOf: [
					/* config.module.rule('postcss').oneOf('vue-modules') */
					{
						resourceQuery: /module/,
						use: [
							/* config.module.rule('postcss').oneOf('vue-modules').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('postcss').oneOf('vue-modules').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							/* config.module.rule('postcss').oneOf('vue-modules').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							}
						]
					},
					/* config.module.rule('postcss').oneOf('vue') */
					{
						resourceQuery: /\?vue/,
						use: [
							/* config.module.rule('postcss').oneOf('vue').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('postcss').oneOf('vue').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2
								}
							},
							/* config.module.rule('postcss').oneOf('vue').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							}
						]
					},
					/* config.module.rule('postcss').oneOf('normal-modules') */
					{
						test: /\.module\.\w+$/,
						use: [
							/* config.module.rule('postcss').oneOf('normal-modules').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('postcss').oneOf('normal-modules').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							/* config.module.rule('postcss').oneOf('normal-modules').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							}
						]
					},
					/* config.module.rule('postcss').oneOf('normal') */
					{
						use: [
							/* config.module.rule('postcss').oneOf('normal').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('postcss').oneOf('normal').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2
								}
							},
							/* config.module.rule('postcss').oneOf('normal').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							}
						]
					}
				]
			},
			/* config.module.rule('scss') */
			{
				test: /\.scss$/,
				oneOf: [
					/* config.module.rule('scss').oneOf('vue-modules') */
					{
						resourceQuery: /module/,
						use: [
							/* config.module.rule('scss').oneOf('vue-modules').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('scss').oneOf('vue-modules').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							/* config.module.rule('scss').oneOf('vue-modules').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							/* config.module.rule('scss').oneOf('vue-modules').use('sass-loader') */
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true
								}
							}
						]
					},
					/* config.module.rule('scss').oneOf('vue') */
					{
						resourceQuery: /\?vue/,
						use: [
							/* config.module.rule('scss').oneOf('vue').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('scss').oneOf('vue').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2
								}
							},
							/* config.module.rule('scss').oneOf('vue').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							/* config.module.rule('scss').oneOf('vue').use('sass-loader') */
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true
								}
							}
						]
					},
					/* config.module.rule('scss').oneOf('normal-modules') */
					{
						test: /\.module\.\w+$/,
						use: [
							/* config.module.rule('scss').oneOf('normal-modules').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('scss').oneOf('normal-modules').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							/* config.module.rule('scss').oneOf('normal-modules').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							/* config.module.rule('scss').oneOf('normal-modules').use('sass-loader') */
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true
								}
							}
						]
					},
					/* config.module.rule('scss').oneOf('normal') */
					{
						use: [
							/* config.module.rule('scss').oneOf('normal').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('scss').oneOf('normal').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2
								}
							},
							/* config.module.rule('scss').oneOf('normal').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							/* config.module.rule('scss').oneOf('normal').use('sass-loader') */
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true
								}
							}
						]
					}
				]
			},
			/* config.module.rule('sass') */
			{
				test: /\.sass$/,
				oneOf: [
					/* config.module.rule('sass').oneOf('vue-modules') */
					{
						resourceQuery: /module/,
						use: [
							/* config.module.rule('sass').oneOf('vue-modules').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('sass').oneOf('vue-modules').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							/* config.module.rule('sass').oneOf('vue-modules').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							/* config.module.rule('sass').oneOf('vue-modules').use('sass-loader') */
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true,
									indentedSyntax: true
								}
							}
						]
					},
					/* config.module.rule('sass').oneOf('vue') */
					{
						resourceQuery: /\?vue/,
						use: [
							/* config.module.rule('sass').oneOf('vue').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('sass').oneOf('vue').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2
								}
							},
							/* config.module.rule('sass').oneOf('vue').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							/* config.module.rule('sass').oneOf('vue').use('sass-loader') */
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true,
									indentedSyntax: true
								}
							}
						]
					},
					/* config.module.rule('sass').oneOf('normal-modules') */
					{
						test: /\.module\.\w+$/,
						use: [
							/* config.module.rule('sass').oneOf('normal-modules').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('sass').oneOf('normal-modules').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							/* config.module.rule('sass').oneOf('normal-modules').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							/* config.module.rule('sass').oneOf('normal-modules').use('sass-loader') */
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true,
									indentedSyntax: true
								}
							}
						]
					},
					/* config.module.rule('sass').oneOf('normal') */
					{
						use: [
							/* config.module.rule('sass').oneOf('normal').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('sass').oneOf('normal').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2
								}
							},
							/* config.module.rule('sass').oneOf('normal').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							/* config.module.rule('sass').oneOf('normal').use('sass-loader') */
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true,
									indentedSyntax: true
								}
							}
						]
					}
				]
			},
			/* config.module.rule('less') */
			{
				test: /\.less$/,
				oneOf: [
					/* config.module.rule('less').oneOf('vue-modules') */
					{
						resourceQuery: /module/,
						use: [
							/* config.module.rule('less').oneOf('vue-modules').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('less').oneOf('vue-modules').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							/* config.module.rule('less').oneOf('vue-modules').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							/* config.module.rule('less').oneOf('vue-modules').use('less-loader') */
							{
								loader: 'less-loader',
								options: {
									sourceMap: true
								}
							}
						]
					},
					/* config.module.rule('less').oneOf('vue') */
					{
						resourceQuery: /\?vue/,
						use: [
							/* config.module.rule('less').oneOf('vue').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('less').oneOf('vue').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2
								}
							},
							/* config.module.rule('less').oneOf('vue').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							/* config.module.rule('less').oneOf('vue').use('less-loader') */
							{
								loader: 'less-loader',
								options: {
									sourceMap: true
								}
							}
						]
					},
					/* config.module.rule('less').oneOf('normal-modules') */
					{
						test: /\.module\.\w+$/,
						use: [
							/* config.module.rule('less').oneOf('normal-modules').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('less').oneOf('normal-modules').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							/* config.module.rule('less').oneOf('normal-modules').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							/* config.module.rule('less').oneOf('normal-modules').use('less-loader') */
							{
								loader: 'less-loader',
								options: {
									sourceMap: true
								}
							}
						]
					},
					/* config.module.rule('less').oneOf('normal') */
					{
						use: [
							/* config.module.rule('less').oneOf('normal').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('less').oneOf('normal').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2
								}
							},
							/* config.module.rule('less').oneOf('normal').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							/* config.module.rule('less').oneOf('normal').use('less-loader') */
							{
								loader: 'less-loader',
								options: {
									sourceMap: true
								}
							}
						]
					}
				]
			},
			/* config.module.rule('stylus') */
			{
				test: /\.styl(us)?$/,
				oneOf: [
					/* config.module.rule('stylus').oneOf('vue-modules') */
					{
						resourceQuery: /module/,
						use: [
							/* config.module.rule('stylus').oneOf('vue-modules').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('stylus').oneOf('vue-modules').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							/* config.module.rule('stylus').oneOf('vue-modules').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							/* config.module.rule('stylus').oneOf('vue-modules').use('stylus-loader') */
							{
								loader: 'stylus-loader',
								options: {
									sourceMap: true,
									preferPathResolver: 'webpack'
								}
							}
						]
					},
					/* config.module.rule('stylus').oneOf('vue') */
					{
						resourceQuery: /\?vue/,
						use: [
							/* config.module.rule('stylus').oneOf('vue').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('stylus').oneOf('vue').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2
								}
							},
							/* config.module.rule('stylus').oneOf('vue').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							/* config.module.rule('stylus').oneOf('vue').use('stylus-loader') */
							{
								loader: 'stylus-loader',
								options: {
									sourceMap: true,
									preferPathResolver: 'webpack'
								}
							}
						]
					},
					/* config.module.rule('stylus').oneOf('normal-modules') */
					{
						test: /\.module\.\w+$/,
						use: [
							/* config.module.rule('stylus').oneOf('normal-modules').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('stylus').oneOf('normal-modules').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							/* config.module.rule('stylus').oneOf('normal-modules').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							/* config.module.rule('stylus').oneOf('normal-modules').use('stylus-loader') */
							{
								loader: 'stylus-loader',
								options: {
									sourceMap: true,
									preferPathResolver: 'webpack'
								}
							}
						]
					},
					/* config.module.rule('stylus').oneOf('normal') */
					{
						use: [
							/* config.module.rule('stylus').oneOf('normal').use('vue-style-loader') */
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: true,
									shadowMode: false
								}
							},
							/* config.module.rule('stylus').oneOf('normal').use('css-loader') */
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									importLoaders: 2
								}
							},
							/* config.module.rule('stylus').oneOf('normal').use('postcss-loader') */
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							/* config.module.rule('stylus').oneOf('normal').use('stylus-loader') */
							{
								loader: 'stylus-loader',
								options: {
									sourceMap: true,
									preferPathResolver: 'webpack'
								}
							}
						]
					}
				]
			},
			/* config.module.rule('js') */
			{
				test: /\.m?jsx?$/,
				exclude: [
					function () { /* omitted long function */
					}
				],
				use: [
					/* config.module.rule('js').use('cache-loader') */
					{
						loader: 'cache-loader',
						options: {
							cacheDirectory: 'D:\\Project\\KxUI\\node_modules\\.cache\\babel-loader',
							cacheIdentifier: '602bfdaf'
						}
					},
					/* config.module.rule('js').use('babel-loader') */
					{
						loader: 'babel-loader'
					}
				]
			},
			/* config.module.rule('ts') */
			{
				test: /\.ts$/,
				use: [
					/* config.module.rule('ts').use('cache-loader') */
					{
						loader: 'cache-loader',
						options: {
							cacheDirectory: 'D:\\Project\\KxUI\\node_modules\\.cache\\ts-loader',
							cacheIdentifier: '0625940b'
						}
					},
					/* config.module.rule('ts').use('babel-loader') */
					{
						loader: 'babel-loader'
					},
					/* config.module.rule('ts').use('ts-loader') */
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
							appendTsSuffixTo: [
								'\\.vue$'
							],
							happyPackMode: false
						}
					}
				]
			},
			/* config.module.rule('tsx') */
			{
				test: /\.tsx$/,
				use: [
					/* config.module.rule('tsx').use('cache-loader') */
					{
						loader: 'cache-loader',
						options: {
							cacheDirectory: 'D:\\Project\\KxUI\\node_modules\\.cache\\ts-loader',
							cacheIdentifier: '0625940b'
						}
					},
					/* config.module.rule('tsx').use('babel-loader') */
					{
						loader: 'babel-loader'
					},
					/* config.module.rule('tsx').use('ts-loader') */
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
							happyPackMode: false,
							appendTsxSuffixTo: [
								'\\.vue$'
							]
						}
					}
				]
			}
		]
	},
	plugins: [
		/* config.plugin('vue-loader') */
		new VueLoaderPlugin(),
		/* config.plugin('define') */
		new DefinePlugin(
			{
				'process.env': {
					NODE_ENV: '"development"',
					BASE_URL: '"/"'
				}
			}
		),
		/* config.plugin('case-sensitive-paths') */
		new CaseSensitivePathsPlugin(),
		/* config.plugin('friendly-errors') */
		new FriendlyErrorsWebpackPlugin(
			{
				additionalTransformers: [
					function () { /* omitted long function */
					}
				],
				additionalFormatters: [
					function () { /* omitted long function */
					}
				]
			}
		),
		/* config.plugin('hmr') */
		new HotModuleReplacementPlugin(),
		/* config.plugin('progress') */
		new ProgressPlugin(),
		/* config.plugin('html-index') */
		new HtmlWebpackPlugin(
			{
				templateParameters: function () { /* omitted long function */
				},
				chunks: [
					'chunk-vendors',
					'chunk-common',
					'index'
				],
				template: 'example/public/index.html',
				filename: 'index.html'
			}
		),
		/* config.plugin('preload-index') */
		new PreloadPlugin(
			{
				rel: 'preload',
				includeHtmlNames: [
					'index.html'
				],
				include: {
					type: 'initial',
					entries: [
						'index'
					]
				},
				fileBlacklist: [
					/\.map$/,
					/hot-update\.js$/
				]
			}
		),
		/* config.plugin('prefetch-index') */
		new PreloadPlugin(
			{
				rel: 'prefetch',
				includeHtmlNames: [
					'index.html'
				],
				include: {
					type: 'asyncChunks',
					entries: [
						'index'
					]
				}
			}
		),
		/* config.plugin('fork-ts-checker') */
		new ForkTsCheckerWebpackPlugin(
			{
				vue: true,
				tslint: false,
				formatter: 'codeframe',
				checkSyntacticErrors: false
			}
		)
	],
	entry: {
		index: [
			'D:\\Project\\KxUI\\example\\main.js'
		]
	}
};
