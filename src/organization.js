import rp from 'request-promise';
import request from 'request';

import { BASE, ORG_TEAM } from './const';
import App from './App';


class Organization {
	constructor(config, transformResponse) {
		this._config = config;
		this._transformResponse = transformResponse;
	}

	team(custom = {}) {
		const { consumerKey, organizationId } = this._config;

		var options = {
		  url: `${BASE}/${ORG_TEAM}`,
		  headers: { consumerKey, organizationId }
		};

		Object.assign(options, custom);

		return rp.get(options).then(this._transformResponse);
	}
}

export default Organization;