'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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
	/**
 * converts languageCode ('es-mx') into a languageId (222)
 */


	(0, _createClass3.default)(File, [{
		key: '_getLangId',
		value: function _getLangId(languageCode) {
			return _lang_codes.LANG_CODES[languageCode] !== undefined ? _lang_codes.LANG_CODES[languageCode] : languageCode;
		}
		/**
  * validates keys before request
  */

	}, {
		key: '_validate',
		value: function _validate(options) {
			var keys = (0, _keys2.default)(options);

			var validate = {
				languageId: function languageId() {
					return (0, _const.V_languageId)(options.languageId);
				},
				filesUpload: function filesUpload() {
					return (0, _const.V_filesUpload)(options.filesUpload);
				},
				fileUpdate: function fileUpdate() {
					return (0, _const.V_fileUpdate)(options.fileUpdate);
				},
				fileIds: function fileIds() {
					return (0, _const.V_fileIds)(options.fileIds);
				},
				fileId: function fileId() {
					return (0, _const.V_fileId)(options.fileId);
				},
				segmentId: function segmentId() {
					return (0, _const.V_segmentId)(options.segmentId);
				},
				milestoneId: function milestoneId() {
					return (0, _const.V_milestoneId)(options.milestoneId);
				}
			};

			keys.forEach(function (key) {
				return validate[key]();
			});
		}
		/**
  * returns a list of project files for a given target languageId or languageCode
  * @params {number|string}     languageId | languageCode			The id of target language
  * @param {object}     custom     Custom object with keys explained below: (optional)
   *   @param {number}     custom.offset        Number of files to skip before starting the list (optional, default: 0)
   *   @param {number}     custom.limit     Maximum number of files to list (optional, default: 100)
   *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
  * @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
  */

	}, {
		key: 'list',
		value: function list(languageId) {
			var custom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { offset: 0, limit: 100, fullResponse: false };

			this._validate({ languageId: languageId });

			languageId = this._getLangId(languageId);

			var _config = this._config,
			    consumerKey = _config.consumerKey,
			    projectId = _config.projectId;
			var offset = custom.offset,
			    limit = custom.limit,
			    fullResponse = custom.fullResponse;


			var options = {
				url: _const.BASE + '/' + _const.FILE_LISTFILES,
				headers: { consumerKey: consumerKey, languageId: languageId, projectId: projectId, 'content-type': 'application/json' },
				qs: { offset: offset, limit: limit },
				resolveWithFullResponse: fullResponse,
				body: {},
				json: true
			};

			return _requestPromise2.default.post(options).then(this._transformResponse);
		}
		/**
  * returns a list of the file types in a project
  * @param {object}     custom     Custom object with keys explained below: (optional)
   *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
  * @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
  */

	}, {
		key: 'types',
		value: function types() {
			var custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { fullResponse: false };
			var _config2 = this._config,
			    consumerKey = _config2.consumerKey,
			    projectId = _config2.projectId;
			var fullResponse = custom.fullResponse;


			var options = {
				url: _const.BASE + '/' + _const.FILE_TYPES,
				headers: { consumerKey: consumerKey, projectId: projectId },
				resolveWithFullResponse: fullResponse
			};

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}

		/**
  * returns a list of the file types in a project
  * @params {object|array}     filesUpload			A file object or array of file objects { path, type } || [{ path, type}, { path, type }...]
   *   @param {string}     some_file_object.path        System path to target file
   *   @param {string}     some_file_object.type        Type of file to uplaod
  */

	}, {
		key: 'upload',
		value: function upload(filesUpload) {
			var _this = this;

			/*
   	ALPHA ROUTE: NEED TO UPDATE TO APIGEE
   */
			this._validate({ filesUpload: filesUpload });
			var _config3 = this._config,
			    consumerKey = _config3.consumerKey,
			    organizationId = _config3.organizationId,
			    projectId = _config3.projectId;


			var allOptions = [].concat(filesUpload).map(function (file) {
				var path = file.path,
				    type = file.type;


				var options = {
					url: _const.BASE + '/' + _const.FILE_BULK1,
					qs: { type: type },
					headers: { consumerKey: consumerKey, organizationId: organizationId, projectId: projectId, 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
					formData: {
						file: _fs2.default.createReadStream(path),
						file_names: '[]'
					}
				};

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
					url: _const.BASE + '/' + _const.FILE_BULK2,
					headers: { consumerKey: consumerKey, projectId: projectId, 'content-type': 'application/json;charset=UTF-8' },
					body: payload,
					json: true
				};

				// make second reqest to append files with new version numbers
				return _requestPromise2.default.post(options).then(_this._transformResponse).then(function (_ref) {
					var files_ids = _ref.files_ids;

					return files_ids.map(function (fileId, index) {
						var version = versions[index];
						var filename = filenames[index];
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
		/**
  * returns a link for downloading a .zip file that contains project files for a specified page and target language
  * @params {number|string}     languageId | languageCode			The id of target language
  * @params {string|array}     fileIds			Ids of files to export
  * @param {object}     custom     Custom object with keys explained below: (optional)
   *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
  */

	}, {
		key: 'export',
		value: function _export(languageId, fileIds) {
			var custom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { fullResponse: false };

			this._validate({ languageId: languageId, fileIds: fileIds });

			languageId = this._getLangId(languageId);
			var fullResponse = custom.fullResponse;


			if (Array.isArray(fileIds)) {
				fileIds = fileIds.join(',');
			}
			var _config4 = this._config,
			    consumerKey = _config4.consumerKey,
			    projectId = _config4.projectId;


			var options = {
				url: _const.BASE + '/' + _const.FILE_EXPORT,
				headers: { consumerKey: consumerKey, projectId: projectId, fileIds: fileIds, targetLanguageIds: languageId },
				resolveWithFullResponse: fullResponse,
				body: {},
				json: true
			};

			return _requestPromise2.default.post(options).then(this._transformResponse);
		}
		/**
  * updates a file in a project - parallel updates are not supported
  * @params {object}     fileUpdate			A file object { path, fileId }
    *   @param {string}     some_file_object.path        Path to target file
    *   @param {string}     some_file_object.fileId        Id of file to update
  * @param {object}     custom     Custom object with keys explained below: (optional)
   *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
  */

	}, {
		key: 'update',
		value: function update(fileUpdate) {
			var custom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { fullResponse: false };

			this._validate({ fileUpdate: fileUpdate });

			var _config5 = this._config,
			    consumerKey = _config5.consumerKey,
			    projectId = _config5.projectId;
			var fullResponse = custom.fullResponse;
			var path = fileUpdate.path,
			    fileId = fileUpdate.fileId;


			var options = {
				url: _const.BASE + '/' + _const.FILE_UPDATE,
				headers: { consumerKey: consumerKey, projectId: projectId, fileId: fileId, 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
				resolveWithFullResponse: fullResponse,
				formData: {
					file: _fs2.default.createReadStream(path)
				}
			};

			return _requestPromise2.default.post(options).then(this._transformResponse);
		}
		/**
  * returns a list or filtered list of the segments in a file
  * @params {number|string}     languageId | languageCode			The id of target language
  * @params {number}     fileId			The id of the file to retrieve segments
  * @param {object}     custom     Custom object with keys explained below: (optional)
   *   @param {number}     custom.offset        Number of files to skip before starting the list (optional, default: 0)
   *   @param {number}     custom.limit     Maximum number of files to list (optional, default: 100)
   *   @param {string}     custom.search     The search term (optional, default: none)
   *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
  */

	}, {
		key: 'segments',
		value: function segments(languageId, fileId) {
			var custom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { offset: 0, limit: 100, fullResponse: false };

			this._validate({ languageId: languageId, fileId: fileId });

			languageId = this._getLangId(languageId);

			var _config6 = this._config,
			    consumerKey = _config6.consumerKey,
			    projectId = _config6.projectId;
			var offset = custom.offset,
			    limit = custom.limit,
			    fullResponse = custom.fullResponse;


			var options = {
				url: _const.BASE + '/' + _const.FILE_SEGMENTS,
				headers: { consumerKey: consumerKey, projectId: projectId, languageId: languageId, fileId: fileId },
				qs: { offset: offset, limit: limit },
				resolveWithFullResponse: fullResponse
			};

			// assign filter and search params to qs if passed
			if (custom.search) {
				(0, _assign2.default)(options.qs, { search: custom.search });
			}

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
		/**
  * returns a file segment by its id
  * @params {number|string}     languageId | languageCode			The id of target language
  * @params {number}     fileId			The id of the file to retrieve segments
  * @params {number}     segmentId			The id of segment
  * @param {object}     custom     Custom object with keys explained below: (optional)
   *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
  */

	}, {
		key: 'segment',
		value: function segment(languageId, fileId, segmentId) {
			var custom = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { fullResponse: false };

			this._validate({ languageId: languageId, fileId: fileId, segmentId: segmentId });

			languageId = this._getLangId(languageId);

			var _config7 = this._config,
			    consumerKey = _config7.consumerKey,
			    projectId = _config7.projectId;
			var fullResponse = custom.fullResponse;


			var options = {
				url: _const.BASE + '/' + _const.FILE_SEGMENT,
				headers: { consumerKey: consumerKey, projectId: projectId, languageId: languageId, segmentId: segmentId, fileId: fileId },
				resolveWithFullResponse: fullResponse
			};

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
		/**
  * returns json object of key value pairs 
  * @params {number|string}     languageId | languageCode			The id of target language
  * @params {number}     milestoneId		The id of the milestone to get json from (see app.project.milestone)
  * @params {number}     fileId			The id of the file to retrieve segments
  * @params {number}     segmentId			The id of segment
  */

	}, {
		key: 'json',
		value: function json(languageId, milestoneId, fileIds) {
			var _this2 = this;

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

				return options;
			});

			return _promise2.default.all(allOptions.map(function (options) {
				return _requestPromise2.default.get(options).then(_this2._transformResponse);
			}));
		}
		/**
  * returns array of most version of files by target language
  * @params {number|string}     languageId | languageCode			The id of target language
  * @param {object}     custom     Custom object with keys explained below: (optional)
   *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
  */

	}, {
		key: 'recent',
		value: function recent(languageId) {
			var custom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { offset: 0, limit: 100, fullResponse: false };

			this._validate({ languageId: languageId });
			languageId = this._getLangId(languageId);

			var _config9 = this._config,
			    consumerKey = _config9.consumerKey,
			    projectId = _config9.projectId;
			var offset = custom.offset,
			    limit = custom.limit,
			    fullResponse = custom.fullResponse;


			var options = {
				method: 'POST',
				url: 'https://api.qordoba.com/v2/files/list',
				qs: { limit: limit, offset: offset },
				headers: { consumerKey: consumerKey, languageId: languageId, projectId: projectId, 'content-type': 'application/json' },
				resolveWithFullResponse: fullResponse,
				body: {},
				json: true
			};

			return (0, _requestPromise2.default)(options).then(this._transformResponse).then(function (body) {
				var files = body.reduce(function (obj, _ref2) {
					var fileName = _ref2.fileName,
					    fileId = _ref2.fileId,
					    updated = _ref2.updated;

					var filename = fileName;
					if (obj[filename] === undefined) {
						obj[filename] = { filename: filename, updated: updated, fileId: fileId };
					}

					if (updated > obj[filename]['updated']) {
						obj[filename] = { filename: filename, updated: updated, fileId: fileId };
					}

					return obj;
				}, {});

				return (0, _values2.default)(files);
			});
		}
	}]);
	return File;
}();

exports.default = File;