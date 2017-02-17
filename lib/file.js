'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _const = require('./const');

var _lang_codes = require('./lang_codes');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var File = function () {
	function File(config, transformResponse) {
		(0, _classCallCheck3.default)(this, File);

		this._config = config;
		this._transformResponse = transformResponse;
	}

	(0, _createClass3.default)(File, [{
		key: '_getLangId',
		value: function _getLangId(code) {
			return _lang_codes.LANG_CODES[code] !== undefined ? _lang_codes.LANG_CODES[code] : code;
		}
	}, {
		key: '_validate',
		value: function _validate(options) {
			var keys = (0, _keys2.default)(options);
			var validate = {
				languageId: function languageId() {
					var languageId = options.languageId;

					if (typeof languageId === 'number' && String(languageId).length <= 3) {
						return;
					}
					if (typeof languageId === 'string' && languageId[2] === '-') {
						return;
					}
					throw Error('languageId must be a valid string code or number');
				},
				filesUpload: function filesUpload() {
					var filesUpload = options.filesUpload;

					console.log('filesUpload', filesUpload);
				},
				filesUpdate: function filesUpdate() {
					var filesUpdate = options.filesUpdate;

					console.log('filesUpdate', filesUpdate);
				},
				fileIds: function fileIds() {
					var fileIds = options.fileIds;

					console.log('fileIds', fileIds);
				},
				fileId: function fileId() {
					var fileId = options.fileId;

					console.log('fileId', fileId);
				},
				segmentId: function segmentId() {
					var segmentId = options.segmentId;

					console.log('segmentId', segmentId);
				},
				milestoneId: function milestoneId() {
					var milestoneId = options.milestoneId;

					console.log('milestoneId', milestoneId);
				}
			};

			keys.forEach(function (key) {
				return validate[key]();
			});
		}
	}, {
		key: 'list',
		value: function list(languageId) {
			var custom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			this._validate({ languageId: languageId });
			languageId = this._getLangId(languageId);
			var _config = this._config,
			    consumerKey = _config.consumerKey,
			    projectId = _config.projectId;


			var options = {
				url: _const.BASE + '/' + _const.FILE_LISTFILES,
				headers: { consumerKey: consumerKey, languageId: languageId, projectId: projectId, 'content-type': 'application/json' },
				body: {},
				json: true
			};

			(0, _assign2.default)(options, custom);

			return _requestPromise2.default.post(options).then(this._transformResponse);
		}
	}, {
		key: 'types',
		value: function types() {
			var custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var _config2 = this._config,
			    consumerKey = _config2.consumerKey,
			    projectId = _config2.projectId;


			var options = {
				url: _const.BASE + '/' + _const.FILE_TYPES,
				headers: { consumerKey: consumerKey, projectId: projectId }
			};

			(0, _assign2.default)(options, custom);

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
		/*
  ================================
  Old one - only supports one file
  ================================
  	upload(file, custom = {}) {
  		const { consumerKey, organizationId, projectId } = this._config;
  	const { path, versionTag, type } = file;
  		var options = { 
  	  url: `${BASE}/${FILE_UPLOAD}`,
  	  qs: { type },
  	  headers: { versionTag, projectId, organizationId, consumerKey, 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
  	  formData: { 
  	    file: fs.createReadStream(path),
  	    file_names: '[]'
  	  }
  	};
  		Object.assign(options, custom);
  		return rp.post(options).then(this._transformResponse);
  }
  */

	}, {
		key: 'upload',
		value: function upload(filesUpload) {
			var _this = this;

			var custom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			/*
   	ALPHA ROUTE: NEED TO UPDATE TO APIGEE
   */
			this._validate({ filesUpload: filesUpload });
			var _config3 = this._config,
			    consumerKey = _config3.consumerKey,
			    organizationId = _config3.organizationId,
			    projectId = _config3.projectId;

			var x_auth_token = '2e6ed10f-cf65-4fe9-9067-a714a8849d85';

			var allOptions = [].concat(filesUpload).map(function (file) {
				var path = file.path,
				    type = file.type;


				var options = {
					url: 'https://app.qordoba.com/api/organizations/' + organizationId + '/upload/uploadFile_anyType?content_type_code=' + type + '&projectId=' + projectId,
					qs: { type: type },
					headers: { 'x-auth-token': x_auth_token, 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
					formData: {
						file: _fs2.default.createReadStream(path),
						file_names: '[]'
					}
				};

				(0, _assign2.default)(options, custom);

				return options;
			});

			// make first request to upload files, returns fileIds
			return _promise2.default.all(allOptions.map(function (options) {
				return _requestPromise2.default.post(options).then(_this._transformResponse);
			})).then(function (files) {
				var versions = [];
				var filenames = [];
				var payload = files.map(function (file) {
					var upload_id = file.upload_id,
					    file_name = file.file_name,
					    version_tags = file.version_tags;

					var versionTag = _this._incrementVersion(version_tags);
					versions.push(versionTag);
					filenames.push(file_name);
					return {
						"id": upload_id,
						"source_columns": [],
						"file_name": file_name,
						"version_tag": versionTag,
						"content_type_codes": [{
							"content_type_code_id": 148,
							"content_type_code": "JSON",
							"name": "JSON",
							"extensions": ["json"],
							"be_value": "JSON",
							"upload_path": "/organizations/:organization_id/upload/uploadFile_anyType"
						}]
					};
				});

				var options = {
					url: 'https://app.qordoba.com/api/projects/' + projectId + '/append_files',
					headers: { 'x-auth-token': x_auth_token, 'content-type': 'application/json;charset=UTF-8' },
					body: payload,
					json: true
				};

				// make second reqest to append files with new version numbers
				return _requestPromise2.default.post(options).then(_this._transformResponse).then(function (_ref) {
					var files_ids = _ref.files_ids;

					return files_ids.map(function (fileId, index) {
						var version = versions[index];
						var filename = filenames[index];
						console.log('versions', versions);
						return (0, _assign2.default)({}, { fileId: fileId, filename: filename, versionTag: version });
					});
				});
			});
		}
	}, {
		key: '_incrementVersion',
		value: function _incrementVersion(versionTags) {
			if (versionTags.length === 0) {
				return '1.0';
			}
			var mostRecent = versionTags[0];
			var main = mostRecent.split('.')[0];
			var sub = mostRecent.split('.')[1];

			if (sub !== '9') {
				var newSub = String(Number(sub) + 1);
				return main + '.' + newSub;
			} else {
				var _newSub = '0';
				var newMain = String(Number(main) + 1);
				return newMain + '.' + _newSub;
			}
		}
	}, {
		key: 'export',
		value: function _export(languageId, fileIds) {
			var custom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			this._validate({ languageId: languageId, fileIds: fileIds });

			languageId = this._getLangId(languageId);
			if (Array.isArray(fileIds)) {
				fileIds = fileIds.join(',');
			}
			var _config4 = this._config,
			    consumerKey = _config4.consumerKey,
			    projectId = _config4.projectId;


			var options = {
				url: _const.BASE + '/' + _const.FILE_EXPORT,
				headers: { consumerKey: consumerKey, projectId: projectId, fileIds: fileIds, targetLanguageIds: languageId },
				body: {},
				json: true
			};

			(0, _assign2.default)(options, custom);

			return _requestPromise2.default.post(options).then(this._transformResponse);
		}

		// update(files, custom = {}) {
		// 	const { consumerKey, projectId } = this._config;

		// 	const allOptions = files.map((file) => {
		// 		const { path, fileId } = file;
		// 		const option = { 
		// 		  url: `${BASE}/${FILE_UPDATE}`,
		// 		  headers: { consumerKey, projectId, fileId, 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
		// 		  formData: { 
		// 		    file: fs.createReadStream(path)
		// 	  	}
		// 	  };
		// 	  return Object.assign(option, custom);
		// 	})

		// 	return Promise.all(allOptions.map(options => rp.post(options).then(this._transformResponse)));
		// }

	}, {
		key: 'update',
		value: function update(filesUpdate) {
			var _this2 = this;

			var custom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			this._validate({ filesUpdate: filesUpdate });

			var _config5 = this._config,
			    consumerKey = _config5.consumerKey,
			    projectId = _config5.projectId;

			var x_auth_token = '2e6ed10f-cf65-4fe9-9067-a714a8849d85';
			var fileObjs = [].concat(filesUpdate);

			var allOptions = fileObjs.map(function (file) {
				var path = file.path,
				    fileId = file.fileId;

				var options = {
					url: 'https://app.qordoba.com/api/projects/' + projectId + '/files/' + fileId + '/update/upload',
					headers: {
						'x-auth-token': x_auth_token,
						'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
					formData: {
						file: _fs2.default.createReadStream(path)
					}
				};
				return (0, _assign2.default)(options, custom);
			});

			return _promise2.default.all(allOptions.map(function (options) {
				return _requestPromise2.default.post(options).then(_this2._transformResponse);
			})).then(function (files) {
				var allOptions = files.map(function (file, index) {
					var id = file.id;

					var fileId = fileObjs[index].fileId;
					var options = {
						url: 'https://app.qordoba.com/api/projects/' + projectId + '/files/' + fileId + '/update/apply',
						headers: {
							'content-type': 'application/json',
							'x-auth-token': x_auth_token },
						body: {
							'new_file_id': '' + id,
							'keep_in_project': false
						},
						json: true
					};
					return (0, _assign2.default)(options, custom);
				});

				var updateQueue = _promise2.default.resolve();
				var delay = function delay() {
					return new _promise2.default(function (resolve) {
						return setTimeout(resolve, 7000);
					});
				};
				var results = [];

				allOptions.forEach(function (options) {
					updateQueue = updateQueue.then(delay).then(function () {
						return _requestPromise2.default.put(options);
					}).then(_this2._transformResponse).then(function (body) {
						return results.push(body);
					});
				});

				return _promise2.default.resolve(updateQueue).then(function () {
					return results;
				});
			});
		}
	}, {
		key: 'segments',
		value: function segments(languageId, fileId) {
			var custom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			this._validate({ languageId: languageId, fileId: fileId });

			languageId = this._getLangId(languageId);
			var _config6 = this._config,
			    consumerKey = _config6.consumerKey,
			    projectId = _config6.projectId;


			var options = {
				url: _const.BASE + '/' + _const.FILE_SEGMENTS,
				headers: { consumerKey: consumerKey, projectId: projectId, languageId: languageId, fileId: fileId }
			};

			(0, _assign2.default)(options, custom);

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
	}, {
		key: 'segment',
		value: function segment(languageId, fileId, segmentId) {
			var custom = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

			this._validate({ languageId: languageId, fileId: fileId, segmentId: segmentId });

			languageId = this._getLangId(languageId);
			var _config7 = this._config,
			    consumerKey = _config7.consumerKey,
			    projectId = _config7.projectId;


			var options = {
				url: _const.BASE + '/' + _const.FILE_SEGMENT,
				headers: { consumerKey: consumerKey, projectId: projectId, languageId: languageId, segmentId: segmentId, fileId: fileId }
			};

			(0, _assign2.default)(options, custom);

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
	}, {
		key: 'json',
		value: function json(languageId, milestoneId, fileIds) {
			var _this3 = this;

			var custom = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

			this._validate({ languageId: languageId, milestoneId: milestoneId, fileIds: fileIds });

			languageId = this._getLangId(languageId);
			var _config8 = this._config,
			    consumerKey = _config8.consumerKey,
			    projectId = _config8.projectId;

			// handle multiple fileIds

			var allOptions = [].concat(fileIds).map(function (fileId) {
				var options = {
					url: _const.BASE + '/' + _const.FILE_JSON,
					headers: { consumerKey: consumerKey, projectId: projectId, languageId: languageId, fileId: fileId, milestoneId: milestoneId }
				};

				(0, _assign2.default)(options, custom);

				return options;
			});

			return _promise2.default.all(allOptions.map(function (options) {
				return _requestPromise2.default.get(options).then(_this3._transformResponse);
			}));
		}
	}]);
	return File;
}();

exports.default = File;