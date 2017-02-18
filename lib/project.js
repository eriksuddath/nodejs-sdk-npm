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
	/**
 * returns a list of projects that belong to an organization, including some project details.
 * @param {object}     custom     Custom object with keys explained below: (optional)
  *   @param {number}     custom.offset        Number of files to skip before starting the list (optional, default: 0)
  *   @param {number}     custom.limit     Maximum number of files to list (optional, default: 100)
  *   @param {string}     custom.search     The search term (optional, default: none)
  *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
 * @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
 */


	(0, _createClass3.default)(Project, [{
		key: 'list',
		value: function list() {
			var custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { offset: 0, limit: 100, fullResponse: false };
			var _config = this._config,
			    consumerKey = _config.consumerKey,
			    organizationId = _config.organizationId;
			var offset = custom.offset,
			    limit = custom.limit,
			    fullResponse = custom.fullResponse;


			var options = {
				url: _const.BASE + '/' + _const.PROJ_LIST,
				headers: { consumerKey: consumerKey, organizationId: organizationId },
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
  * returns detailed information about a project
  * @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
  * @param {object}     custom     Custom object with keys explained below: (optional)
   *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
  */

	}, {
		key: 'detail',
		value: function detail() {
			var custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { fullResponse: false };
			var _config2 = this._config,
			    consumerKey = _config2.consumerKey,
			    projectId = _config2.projectId;
			var fullResponse = custom.fullResponse;


			var options = {
				url: _const.BASE + '/' + _const.PROJ_DETAIL,
				headers: { consumerKey: consumerKey, projectId: projectId },
				resolveWithFullResponse: fullResponse
			};

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
		/**
  * returns the status of all projects
  * @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
  * @param {object}     custom     Custom object with keys explained below: (optional)
   *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
  */

	}, {
		key: 'status',
		value: function status() {
			var custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { fullResponse: false };
			var _config3 = this._config,
			    consumerKey = _config3.consumerKey,
			    projectId = _config3.projectId;
			var fullResponse = custom.fullResponse;


			var options = {
				url: _const.BASE + '/' + _const.PROJ_STATUS,
				headers: { consumerKey: consumerKey, projectId: projectId },
				resolveWithFullResponse: fullResponse
			};

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
		/**
  * returns the milestone information, status, and language for a project
  * @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
  * @param {object}     custom     Custom object with keys explained below: (optional)
   *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
  */

	}, {
		key: 'workflow',
		value: function workflow() {
			var custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { fullResponse: false };
			var _config4 = this._config,
			    consumerKey = _config4.consumerKey,
			    projectId = _config4.projectId;
			var fullResponse = custom.fullResponse;


			var options = {
				url: _const.BASE + '/' + _const.PROJ_WORKFLOW,
				headers: { consumerKey: consumerKey, projectId: projectId },
				resolveWithFullResponse: fullResponse
			};

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
		/**
  * returns the milestone information, status, and language for a project
  * @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
  */

	}, {
		key: 'milestones',
		value: function milestones() {
			var _config5 = this._config,
			    consumerKey = _config5.consumerKey,
			    projectId = _config5.projectId;


			var options = {
				url: _const.BASE + '/' + _const.PROJ_WORKFLOW,
				headers: { consumerKey: consumerKey, projectId: projectId }
			};

			return _requestPromise2.default.get(options).then(this._transformResponse).then(function (body) {
				return body.milestones.map(function (_ref) {
					var milestoneId = _ref.milestoneId,
					    milestoneName = _ref.milestoneName;

					return { milestoneId: milestoneId, milestoneName: milestoneName };
				});
			});
		}
	}]);
	return Project;
}();

exports.default = Project;