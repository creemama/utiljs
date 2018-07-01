
'use strict';

module.exports = function Files(options) {
	function _asyncwaterfall() { return options.asyncwaterfall() }
	function _child_process() { return options.child_process() }
	function fs() { return options.fs() }
	function _fs() { return options.fs() }
	function _mkdirp() { return options.mkdirp() }
	function ncp() { return options.ncp() }
	function _objects() { return options.objects() }
	function path() { return options.path() }
	function promises() { return options.promises() }
	function _rimraf() { return options.rimraf() }
	function _strings() { return options.strings() }
	function _touch() { return options.touch() }

	Object.assign(this, fs())
	Object.assign(this, path())

	this.cp = cp
	this.cpr = cpr
	this.diff = Files_diff
	this.filesWithExtension = Files_filesWithExtension
	this.filesWithExtensionSync = Files_filesWithExtensionSync
	this.isDirectory = Files_isDirectory
	this.isDirectorySync = Files_isDirectorySync
	this.isFile = Files_isFile
	this.isFileSync = Files_isFileSync
	this.mkdirp = (path, cb) => {
		if (cb) {
			_mkdirp()(path, cb)
			return
		}
		return new Promise((resolve, reject) => {
			_mkdirp()(path, (err, made) => {
				if (err) reject(err)
				else resolve()
			})
		})
	}
	this.mkdirpSync = function(dir, opts) { return _mkdirp().sync(dir, opts) }
	this.readdir = promises().promisify(fs().readdir)
	this.readFile = readFile
	this.readFiles = Files_readFiles
	this.rmrf = rmrf
	this.rmrfSync = function(path, opts) { return _rimraf().sync(path, opts) }
	this.stat = stat
	this.touch = _touch()
	this.writeFile = writeFile

	function cp(source, target) {
		let doneCalled = false;

		return new Promise((resolve, reject) => {
			let rd = fs().createReadStream(source)
			let wr = fs().createWriteStream(target)
			rd.on('error', done)
			wr.on('error', done)
			wr.on('close', done)
			rd.pipe(wr)

			function done(err) {
				if (doneCalled) return
				doneCalled = true
				if (err) reject(err)
				else resolve()
			}
		})
	}

	function cpr(source, destination, options, callback) {
		if (typeof options !== 'function' && !callback) {
			if (options)
				return promises().promisifyAndCall(
					this,
					cpr,
					source,
					destination,
					options)
			return promises().promisifyAndCall(
				this,
				cpr,
				source,
				destination)
		}
		ncp().call(ncp(), source, destination, options, callback)
	}

	function Files_diff(pathA, pathB, cb) {
		if (!_objects().isDefined(pathA)) throw 'pathA cannot be undefined'
		if (!_objects().isDefined(pathB)) throw 'pathB cannot be undefined'
		var diff = _child_process().spawn('diff', [pathA, pathB])
		diff.on('close', (code) => { cb(null, code === 0) })
		diff.on('error', (err) => { cb(err) })
	}

	/**
	 * Does not recursively search for files.
	 * When specifying ext, do not include the period.
	 */
	function Files_filesWithExtensionSync(opts) {
		var dir = opts.dir
		var ext = opts.ext

		if (!_objects().isDefined(dir)) throw 'dir cannot be undefined'
		if (!_objects().isDefined(ext)) throw 'ext cannot be undefined'

		var files = _fs().readdirSync(dir)
		var filesWithExt = []

		var divider = _strings().endsWith(dir, '/') ? '' : '/'

		function Files_filesWithExtension_forEach(file) {
			if (_strings().endsWith(file.toLowerCase(), '.' + ext)) {
				filesWithExt.push(dir + divider + file)
			}
		}
		files.forEach(Files_filesWithExtension_forEach)
		return filesWithExt
	}

	function Files_filesWithExtension(opts, cb) {
		if (!cb)
			return promises().promisifyAndCall(
				this,
				Files_filesWithExtension,
				opts)

		if (!_objects().isDefined(opts)) {
			cb('opts cannot be undefined')
			return
		}
		if (typeof cb !== 'function') {
			throw 'cb must be a function'
			return
		}

		var dir = opts.dir
		var ext = opts.ext

		if (!_objects().isDefined(dir)) {
			cb('dir cannot be undefined')
			return
		}
		if (!_objects().isDefined(ext)) {
			cb('ext cannot be undefined')
			return
		}

		_fs().readdir(dir, (err, files) => {
			if (_objects().isDefined(err)) {
				cb(err)
				return
			}
			var filesWithExt = []

			var divider = _strings().endsWith(dir, '/') ? '' : '/'

			function Files_filesWithExtension_forEach(file) {
				if (_strings().endsWith(file.toLowerCase(), '.' + ext)) {
					filesWithExt.push(dir + divider + file)
				}
			}
			files.forEach(Files_filesWithExtension_forEach)
			cb(null, filesWithExt)
		})
	}

	function Files_isDirectory(path, cb) {
		_fs().lstat(path, function(err, stats) {
			if (_objects().isDefined(err)) {
				cb(err, null)
				return
			}
			cb(null, stats.isDirectory())
		})
	}

	function Files_isDirectorySync(path) { return _fs().lstatSync(path).isDirectory() }

	function Files_isFile(path, callback) {
		if (!callback) {
			return promises().promisifyAndCall(
				this,
				Files_isFile,
				path)
		}
		_fs().lstat(path, function(err, stats) {
			if (_objects().isDefined(err)) {
				callback(err, null)
				return
			}
			callback(null, stats.isFile())
		})
	}

	function Files_isFileSync(path) { return _fs().lstatSync(path).isFile() }

	function readFile() {
		return wrapCallback(arguments, readFile, _fs().readFile)
	}

	function wrapCallback(args, localMethod, targetMethod) {
		if (hasCallback(args))
			return targetMethod.apply(null, args)
		else
			return new Promise((resolve, reject) => {
				localMethod.call(null, ...args, (err, data) => {
					if (err) reject(err)
					else resolve(data)
				})
			})
	}

	function hasCallback(args) {
		return args.length > 0 && typeof args[args.length - 1] === 'function'
	}

	function Files_readFiles(files, options, cb) {
		var opts
		var caba
		if (typeof options === 'function' ) {
			opts = {}
			caba = options
		} else {
			opts = options
			caba = cb
		}
		if (typeof caba !== 'function') {
			throw 'callback cb is not a function'
		}
		var string = ''
		var tasks = []
		tasks.push(Files_readFiles_start)
		files.forEach(function(file) {
			tasks.push(Files_readFiles_readFile.bind({ file: file }))
			tasks.push(_fs().readFile)
		})
		_asyncwaterfall()(tasks, Files_readFiles_end)
		function Files_readFiles_start(callback) {
			callback(null, '')
		}
		function Files_readFiles_readFile(str, callback) {
			string += str
			callback(null, this.file, opts)
		}
		function Files_readFiles_end(err, str) {
			string += str
			if (_objects().isDefined(err)) {
				caba(err)
				return
			}
			caba(null, string)
		}
	}

	function rmrf(path, options, callback) {
		if (typeof options !== 'function' && !callback) {
			if (options)
				return promises().promisifyAndCall(
					this,
					rmrf,
					path,
					options)
			return promises().promisifyAndCall(
				this,
				rmrf,
				path)
		}
		_rimraf().call(_rimraf(), path, options, callback)
	}

	function stat() {
		return wrapCallback(arguments, stat, fs().stat)
	}

	function writeFile() {
		return wrapCallback(arguments, writeFile, _fs().writeFile)
	}
}