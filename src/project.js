import rp from 'request-promise';
import request from 'request';

import { BASE, PROJ_LIST, PROJ_DETAIL, PROJ_STATUS, PROJ_WORKFLOW } from './const';
import App from './App';


class Project {
	constructor(config, transformResponse) {
		this._config = config;
		this._transformResponse = transformResponse;
	}

	list(custom = {}) {
		const { consumerKey, organizationId } = this._config;

		var options = {
		  url: `${BASE}/${PROJ_LIST}`,
		  headers: { consumerKey, organizationId }
		};

		Object.assign(options, custom);

		return rp.get(options).then(this._transformResponse);
	}

	detail(custom = {}) {
		const { consumerKey, projectId } = this._config;

		var options = {
		  url: `${BASE}/${PROJ_DETAIL}`,
		  headers: { consumerKey, projectId }
		};

		Object.assign(options, custom);

		return rp.get(options).then(this._transformResponse);
	}

	status(custom = {}) {
		const { consumerKey, projectId } = this._config;

		var options = {
		  url: `${BASE}/${PROJ_STATUS}`,
		  headers: { consumerKey, projectId }
		};

		Object.assign(options, custom);

		return rp.get(options).then(this._transformResponse);

	}

	workflow(custom = {}) {
		const { consumerKey, projectId } = this._config;

		var options = {
		  url: `${BASE}/${PROJ_WORKFLOW}`,
		  headers: { consumerKey, projectId }
		};

		Object.assign(options, custom);

		return rp.get(options).then(this._transformResponse);

	}
}

export default Project;