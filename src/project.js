import rp from 'request-promise';
import request from 'request';

import { BASE, PROJ_LIST, PROJ_DETAIL, PROJ_STATUS, PROJ_WORKFLOW } from './const';
import App from './App';


class Project {
	constructor(config, transformResponse) {
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
	list(custom = { offset: 0, limit: 100, fullResponse: false }) {
		const { consumerKey, organizationId } = this._config;
		const { offset, limit, fullResponse } = custom;

		var options = {
		  url: `${BASE}/${PROJ_LIST}`,
		  headers: { consumerKey, organizationId },
		  qs: { offset, limit },
		  resolveWithFullResponse: fullResponse
		};

		// assign filter and search params to qs if passed
		if (custom.search) { Object.assign(options.qs, { search: custom.search }) }

		return rp.get(options).then(this._transformResponse);
	}
	/**
	* returns detailed information about a project
	* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
	* @param {object}     custom     Custom object with keys explained below: (optional)
  *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
	*/
	detail(custom = { fullResponse: false }) {
		const { consumerKey, projectId } = this._config;
		const { fullResponse } = custom;

		var options = {
		  url: `${BASE}/${PROJ_DETAIL}`,
		  headers: { consumerKey, projectId },
		  resolveWithFullResponse: fullResponse
		};

		return rp.get(options).then(this._transformResponse);
	}
	/**
	* returns the status of all projects
	* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
	* @param {object}     custom     Custom object with keys explained below: (optional)
  *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
	*/
	status(custom = { fullResponse: false }) {
		const { consumerKey, projectId } = this._config;
		const { fullResponse } = custom;

		var options = {
		  url: `${BASE}/${PROJ_STATUS}`,
		  headers: { consumerKey, projectId },
		  resolveWithFullResponse: fullResponse
		};

		return rp.get(options).then(this._transformResponse);

	}
	/**
	* returns the milestone information, status, and language for a project
	* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
	* @param {object}     custom     Custom object with keys explained below: (optional)
  *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
	*/
	workflow(custom = { fullResponse: false }) {
		const { consumerKey, projectId } = this._config;
		const { fullResponse } = custom;

		var options = {
		  url: `${BASE}/${PROJ_WORKFLOW}`,
		  headers: { consumerKey, projectId },
		  resolveWithFullResponse: fullResponse
		};

		return rp.get(options).then(this._transformResponse);

	}
	/**
	* returns the milestone information, status, and language for a project
	* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
	*/
	milestones() {
		const { consumerKey, projectId } = this._config;

		var options = {
		  url: `${BASE}/${PROJ_WORKFLOW}`,
		  headers: { consumerKey, projectId },
		};

		return rp.get(options)
			.then(this._transformResponse)
			.then( body => body.milestones.map( ({ milestoneId, milestoneName }) => {
				return { milestoneId, milestoneName }
			}));
	}
}

export default Project;