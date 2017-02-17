import rp from 'request-promise';
import request from 'request';

import { BASE, TM_LIST, TM_SHOW, TM_SEGMENTS } from './const';
import App from './App';


class Tm {
	constructor(config, transformResponse) {
		this._config = config;
		this._transformResponse = transformResponse;
	}

	list(custom = {}) {
		const { consumerKey, organizationId } = this._config;

		var options = {
		  url: `${BASE}/${TM_LIST}`,
		  headers: { consumerKey, organizationId }
		};

		Object.assign(options, custom);

		return rp.get(options).then(this._transformResponse);
	}

	show(tmId, custom = {}) {
		const { consumerKey, organizationId } = this._config;

		var options = {
		  url: `${BASE}/${TM_SHOW}`,
		  headers: { consumerKey, organizationId, tmId }
		};

		Object.assign(options, custom);

		return rp.get(options).then(this._transformResponse);
	}

	segments(tmId, custom = {}) {
		const { consumerKey, organizationId } = this._config;

		var options = {
		  url: `${BASE}/${TM_SEGMENTS}`,
		  headers: { consumerKey, organizationId, tmId }
		};

		Object.assign(options, custom);

		return rp.get(options).then(this._transformResponse);
	}
}

export default Tm;