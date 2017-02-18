'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _const = require('./const');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _organization = require('./organization');

var _organization2 = _interopRequireDefault(_organization);

var _project = require('./project');

var _project2 = _interopRequireDefault(_project);

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

var _tm = require('./tm');

var _tm2 = _interopRequireDefault(_tm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function () {
	function App(options) {
		(0, _classCallCheck3.default)(this, App);

		this._validate(options);
		this._init(options);
	}
	/**
 * validates keys before initialization
 */


	(0, _createClass3.default)(App, [{
		key: '_validate',
		value: function _validate(options) {
			var keys = (0, _keys2.default)(options);

			var validate = {
				consumerKey: function consumerKey() {
					return (0, _const.V_consumerKey)(options.consumerKey);
				},
				organizationId: function organizationId() {
					return (0, _const.V_organizationId)(options.organizationId);
				},
				projectId: function projectId() {
					return (0, _const.V_projectId)(options.projectId);
				}
			};

			keys.forEach(function (key) {
				return validate[key]();
			});
		}
		/**
  * initializes configuration and organization, project and file classes
  */

	}, {
		key: '_init',
		value: function _init(_ref) {
			var consumerKey = _ref.consumerKey,
			    organizationId = _ref.organizationId,
			    projectId = _ref.projectId;

			this._config = { consumerKey: consumerKey, organizationId: organizationId, projectId: projectId };

			this.organization = new _organization2.default(this._config, this._transformResponse);
			this.project = new _project2.default(this._config, this._transformResponse);
			this.file = new _file2.default(this._config, this._transformResponse);
		}
		/**
  * transforms any json response into a javascript object
  */

	}, {
		key: '_transformResponse',
		value: function _transformResponse(res) {
			if (typeof res === 'string') {
				return JSON.parse(res);
			}
			return res;
		}
		/**
  * returns the status of the Qordoba API
  * @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
  * @param {object}     custom     Custom object with keys explained below: (optional)
   *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
  */

	}, {
		key: 'ping',
		value: function ping() {
			var custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { fullResponse: false };
			var consumerKey = this._config.consumerKey;
			var fullResponse = custom.fullResponse;


			var options = {
				url: _const.BASE + '/' + _const.PING,
				headers: { consumerKey: consumerKey },
				resolveWithFullResponse: fullResponse
			};

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
		/**
  * returns detail about the language detail for Qordoba
  * @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
  * @param {object}     custom     Custom object with keys explained below: (optional)
   *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
  */

	}, {
		key: 'languages',
		value: function languages() {
			var custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { fullResponse: false };
			var consumerKey = this._config.consumerKey;
			var fullResponse = custom.fullResponse;


			var options = {
				url: _const.BASE + '/' + _const.LANGUAGES,
				headers: { consumerKey: consumerKey },
				resolveWithFullResponse: fullResponse
			};

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
		/**
  * returns detail about the country list for Qordoba
  * @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
  * @param {object}     custom     Custom object with keys explained below: (optional)
   *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
  */

	}, {
		key: 'countries',
		value: function countries() {
			var custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { fullResponse: false };
			var consumerKey = this._config.consumerKey;
			var fullResponse = custom.fullResponse;


			var options = {
				url: _const.BASE + '/' + _const.COUNTRIES,
				headers: { consumerKey: consumerKey },
				resolveWithFullResponse: fullResponse
			};

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
	}]);
	return App;
}();

exports.default = App;