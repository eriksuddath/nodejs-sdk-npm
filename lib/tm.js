'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _const = require('./const');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tm = function () {
	function Tm(config, transformResponse) {
		(0, _classCallCheck3.default)(this, Tm);

		this._config = config;
		this._transformResponse = transformResponse;
	}

	(0, _createClass3.default)(Tm, [{
		key: 'list',
		value: function list() {
			var custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var _config = this._config,
			    consumerKey = _config.consumerKey,
			    organizationId = _config.organizationId;


			var options = {
				url: _const.BASE + '/' + _const.TM_LIST,
				headers: { consumerKey: consumerKey, organizationId: organizationId }
			};

			(0, _assign2.default)(options, custom);

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
	}, {
		key: 'show',
		value: function show(tmId) {
			var custom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var _config2 = this._config,
			    consumerKey = _config2.consumerKey,
			    organizationId = _config2.organizationId;


			var options = {
				url: _const.BASE + '/' + _const.TM_SHOW,
				headers: { consumerKey: consumerKey, organizationId: organizationId, tmId: tmId }
			};

			(0, _assign2.default)(options, custom);

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
	}, {
		key: 'segments',
		value: function segments(tmId) {
			var custom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var _config3 = this._config,
			    consumerKey = _config3.consumerKey,
			    organizationId = _config3.organizationId;


			var options = {
				url: _const.BASE + '/' + _const.TM_SEGMENTS,
				headers: { consumerKey: consumerKey, organizationId: organizationId, tmId: tmId }
			};

			(0, _assign2.default)(options, custom);

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
	}]);
	return Tm;
}();

exports.default = Tm;

/*
=======================
MULTIPLE UPDATE SUPPORT (ALPHA) for file class
=======================
	update(filesUpdate, custom = {}) {
		this._validate({ filesUpdate });

		const { consumerKey, projectId } = this._config;
		const x_auth_token = '2e6ed10f-cf65-4fe9-9067-a714a8849d85';
		const fileObjs = [].concat(filesUpdate);

		const allOptions = fileObjs.map((file) => {
			const { path, fileId } = file;
			const options = { 
    		url: `https://app.qordoba.com/api/projects/${projectId}/files/${fileId}/update/upload`,
    		headers: { 
       		'x-auth-token': x_auth_token,
       		'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
    		formData: { 
      		file: fs.createReadStream(path)
    		}
  		};
		  return Object.assign(options, custom);
		})

		return Promise.all(allOptions.map(options => rp.post(options).then(this._transformResponse)))
			.then( (files) => {
				const allOptions = files.map( (file, index) => {
					const { id } = file;
					const fileId = fileObjs[index].fileId;
					var options = { 
					  url: `https://app.qordoba.com/api/projects/${projectId}/files/${fileId}/update/apply`,
					  headers: { 
					     'content-type': 'application/json',
					     'x-auth-token': x_auth_token },
					  body: {
					  'new_file_id': `${id}`,
					  'keep_in_project': false 
						},
					  json: true 
					};
					return Object.assign(options, custom);
				})

				let updateQueue = Promise.resolve();
				const delay = () => new Promise(resolve => setTimeout(resolve, 7000));
				const results = [];

				allOptions.forEach(options => {
					updateQueue = updateQueue.then(delay)
						.then(() => rp.put(options))
						.then(this._transformResponse)
						.then(body => results.push(body))
				})

				return Promise.resolve(updateQueue).then(() => results);

			})
	}

*/

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