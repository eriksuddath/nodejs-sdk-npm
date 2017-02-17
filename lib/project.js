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

var Project = function () {
	function Project(config, transformResponse) {
		(0, _classCallCheck3.default)(this, Project);

		this._config = config;
		this._transformResponse = transformResponse;
	}

	(0, _createClass3.default)(Project, [{
		key: 'list',
		value: function list() {
			var custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var _config = this._config,
			    consumerKey = _config.consumerKey,
			    organizationId = _config.organizationId;


			var options = {
				url: _const.BASE + '/' + _const.PROJ_LIST,
				headers: { consumerKey: consumerKey, organizationId: organizationId }
			};

			(0, _assign2.default)(options, custom);

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
	}, {
		key: 'detail',
		value: function detail() {
			var custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var _config2 = this._config,
			    consumerKey = _config2.consumerKey,
			    projectId = _config2.projectId;


			var options = {
				url: _const.BASE + '/' + _const.PROJ_DETAIL,
				headers: { consumerKey: consumerKey, projectId: projectId }
			};

			(0, _assign2.default)(options, custom);

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
	}, {
		key: 'status',
		value: function status() {
			var custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var _config3 = this._config,
			    consumerKey = _config3.consumerKey,
			    projectId = _config3.projectId;


			var options = {
				url: _const.BASE + '/' + _const.PROJ_STATUS,
				headers: { consumerKey: consumerKey, projectId: projectId }
			};

			(0, _assign2.default)(options, custom);

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
	}, {
		key: 'workflow',
		value: function workflow() {
			var custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var _config4 = this._config,
			    consumerKey = _config4.consumerKey,
			    projectId = _config4.projectId;


			var options = {
				url: _const.BASE + '/' + _const.PROJ_WORKFLOW,
				headers: { consumerKey: consumerKey, projectId: projectId }
			};

			(0, _assign2.default)(options, custom);

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
	}]);
	return Project;
}();

exports.default = Project;