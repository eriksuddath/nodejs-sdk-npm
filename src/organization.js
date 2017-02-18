import rp from 'request-promise';
import request from 'request';

import { BASE, ORG_TEAM } from './const';
import App from './App';


class Organization {
	constructor(config, transformResponse) {
		this._config = config;
		this._transformResponse = transformResponse;
	}
	/**
	* returns information about your organization's team members
	* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
	* @param {object}     custom     Custom object with keys explained below: (optional)
  *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
	*/
	team(custom = { fullResponse: false }) {
		const { consumerKey, organizationId } = this._config;
		const { fullResponse } = custom;

		var options = {
		  url: `${BASE}/${ORG_TEAM}`,
		  headers: { consumerKey, organizationId },
		  resolveWithFullResponse: fullResponse
		};

		return rp.get(options).then(this._transformResponse);
	}
}

export default Organization;