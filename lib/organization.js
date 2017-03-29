'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var Organization = function () {
	function Organization(config, transformResponse) {
		(0, _classCallCheck3.default)(this, Organization);

		this._config = config;
		this._transformResponse = transformResponse;
	}
	/**
 * returns information about your organization's team members
 * @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
 * @param {object}     custom     Custom object with keys explained below: (optional)
  *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
 */


	(0, _createClass3.default)(Organization, [{
		key: 'team',
		value: function team() {
			var custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { fullResponse: false };
			var _config = this._config,
			    consumerKey = _config.consumerKey,
			    organizationId = _config.organizationId;
			var fullResponse = custom.fullResponse;


			var options = {
				url: _const.BASE + '/' + _const.ORG_TEAM,
				headers: { consumerKey: consumerKey, organizationId: organizationId },
				resolveWithFullResponse: fullResponse
			};

			return _requestPromise2.default.get(options).then(this._transformResponse);
		}
	}]);
	return Organization;
}();

exports.default = Organization;