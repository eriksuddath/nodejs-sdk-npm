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
	/**
	* validates keys before initialization
	*/
	_validate(options) {
		const keys = Object.keys(options);
		
		const validate = {
			consumerKey: () => V_consumerKey(options.consumerKey),
			organizationId: () => V_organizationId(options.organizationId),
			projectId: () => V_projectId(options.projectId)
		}
		
		keys.forEach( key => validate[key]() )
	}
	/**
	* initializes configuration and organization, project and file classes
	*/
	_init({ consumerKey, organizationId, projectId }) {
		this._config = { consumerKey, organizationId, projectId };

		this.organization = new Organization(this._config, this._transformResponse);
		this.project = new Project(this._config, this._transformResponse);
		this.file = new File(this._config, this._transformResponse);

	}
	/**
	* transforms any json response into a javascript object
	*/
	_transformResponse(res) {
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
	ping(custom = { fullResponse: false }) {
		const { consumerKey } = this._config;
		const { fullResponse } = custom;

		var options = {
      url: `${BASE}/${PING}`,
      headers: { consumerKey },
		  resolveWithFullResponse: fullResponse
    };

    return rp.get(options).then(this._transformResponse)
	}
	/**
	* returns detail about the language detail for Qordoba
	* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
	* @param {object}     custom     Custom object with keys explained below: (optional)
  *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
	*/
	languages(custom = { fullResponse: false }) {
		const { consumerKey } = this._config;
		const { fullResponse } = custom;

		var options = {
		  url: `${BASE}/${LANGUAGES}`,
		  headers: { consumerKey },
		  resolveWithFullResponse: fullResponse
		};

		return rp.get(options).then(this._transformResponse);
	}
	/**
	* returns detail about the country list for Qordoba
	* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
	* @param {object}     custom     Custom object with keys explained below: (optional)
  *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
	*/
	countries(custom = { fullResponse: false }) {
		const { consumerKey } = this._config;
		const { fullResponse } = custom;

		var options = {
		  url: `${BASE}/${COUNTRIES}`,
		  headers: { consumerKey },
		  resolveWithFullResponse: fullResponse
		};

		return rp.get(options).then(this._transformResponse);
	}

}

module.exports = App;