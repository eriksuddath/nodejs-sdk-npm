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

/*
=======================
MULTIPLE UPDATE SUPPORT (ALPHA) for file class
=======================
	update(filesUpdate, custom = {}) {
		this._validate({ filesUpdate });

		const { consumerKey, projectId } = this._config;
		const x_auth_token = '2e6ed10f-cf65-4fe9-9067-a714a8849d85';
		const fileObjs = [].concat(filesUpdate);

		const allOptions = fileObjs.map((file) => {
			const { path, fileId } = file;
			const options = { 
    		url: `https://app.qordoba.com/api/projects/${projectId}/files/${fileId}/update/upload`,
    		headers: { 
       		'x-auth-token': x_auth_token,
       		'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
    		formData: { 
      		file: fs.createReadStream(path)
    		}
  		};
		  return Object.assign(options, custom);
		})

		return Promise.all(allOptions.map(options => rp.post(options).then(this._transformResponse)))
			.then( (files) => {
				const allOptions = files.map( (file, index) => {
					const { id } = file;
					const fileId = fileObjs[index].fileId;
					var options = { 
					  url: `https://app.qordoba.com/api/projects/${projectId}/files/${fileId}/update/apply`,
					  headers: { 
					     'content-type': 'application/json',
					     'x-auth-token': x_auth_token },
					  body: {
					  'new_file_id': `${id}`,
					  'keep_in_project': false 
						},
					  json: true 
					};
					return Object.assign(options, custom);
				})

				let updateQueue = Promise.resolve();
				const delay = () => new Promise(resolve => setTimeout(resolve, 7000));
				const results = [];

				allOptions.forEach(options => {
					updateQueue = updateQueue.then(delay)
						.then(() => rp.put(options))
						.then(this._transformResponse)
						.then(body => results.push(body))
				})

				return Promise.resolve(updateQueue).then(() => results);

			})
	}

*/


	/*
	================================
	Old one - only supports one file
	================================

	upload(file, custom = {}) {

		const { consumerKey, organizationId, projectId } = this._config;
		const { path, versionTag, type } = file;

		var options = { 
		  url: `${BASE}/${FILE_UPLOAD}`,
		  qs: { type },
		  headers: { versionTag, projectId, organizationId, consumerKey, 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
		  formData: { 
		    file: fs.createReadStream(path),
		    file_names: '[]'
		  }
		};

		Object.assign(options, custom);

		return rp.post(options).then(this._transformResponse);
	}
	*/