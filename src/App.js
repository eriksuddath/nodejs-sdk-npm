import rp from 'request-promise';
import { BASE, PING, LANGUAGES, COUNTRIES, V_consumerKey, V_organizationId, V_projectId } from './const';
import request from 'request';
import Organization from './organization';
import Project from './project';
import File from './file';
import Tm from './tm';

class App {
	constructor(options) {
		this._validate(options);
		this._init(options);
	}

	_validate(options) {
		const keys = Object.keys(options);
		
		const validate = {
			consumerKey: () => V_consumerKey(options.consumerKey),
			organizationId: () => V_organizationId(options.organizationId),
			projectId: () => V_projectId(options.projectId)
		}
		
		keys.forEach( key => validate[key]() )
	}

	_init({ consumerKey, organizationId, projectId }) {
		this._config = { consumerKey, organizationId, projectId };

		this.organization = new Organization(this._config, this._transformResponse);
		this.project = new Project(this._config, this._transformResponse);
		this.file = new File(this._config, this._transformResponse);

	}

	_transformResponse(res) {
		if (typeof res === 'string') {
			return JSON.parse(res);
		}
		return res;
	}

	ping() {
		const { consumerKey } = this._config;

		var options = {
      url: `${BASE}/${PING}`,
      headers: { consumerKey },
     	resolveWithFullResponse: true
    };

    return rp.get(options).then(this._transformResponse)
	}

	languages(custom = {}) {
		const { consumerKey } = this._config;

		var options = {
		  url: `${BASE}/${LANGUAGES}`,
		  headers: { consumerKey }
		};

		Object.assign(options, custom);

		return rp.get(options).then(this._transformResponse);
	}

	countries(custom = {}) {
		const { consumerKey } = this._config;

		var options = {
		  url: `${BASE}/${COUNTRIES}`,
		  headers: { consumerKey }
		};

		Object.assign(options, custom);

		return rp.get(options).then(this._transformResponse);
	}

}

export default App;