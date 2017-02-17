import rp from 'request-promise';
import request from 'request';
import fs from 'fs';

import { 
	BASE, 
	FILE_LISTFILES, 
	FILE_TYPES, 
	FILE_UPLOAD, 
	FILE_EXPORT, 
	FILE_UPDATE, 
	FILE_SEGMENTS,
	FILE_SEGMENT,
	FILE_JSON
} from './const';

import { LANG_CODES } from './lang_codes';

import App from './App';


class File {
	constructor(config, transformResponse) {
		this._config = config;
		this._transformResponse = transformResponse;
	}

	_getLangId(code) {
		return LANG_CODES[code] !== undefined ? LANG_CODES[code] : code;
	}

	_validate(options) {
		const keys = Object.keys(options);
		const validate = {
			languageId: () => {
				const { languageId } = options;
				if (typeof languageId === 'number' && String(languageId).length <= 3) { return; }
  			if (typeof languageId === 'string' && languageId[2] === '-') { return; }
				throw Error('languageId must be a valid string code or number')
			},
			filesUpload: () => {
				const { filesUpload } = options;
				console.log('filesUpload', filesUpload)
			},
			filesUpdate: () => {
				const { filesUpdate } = options;
				console.log('filesUpdate', filesUpdate)
			},
			fileIds: () => {
				const { fileIds } = options;
				console.log('fileIds', fileIds)
			},
			fileId: () => {
				const { fileId } = options;
				console.log('fileId', fileId);
			},
			segmentId: () => {
				const { segmentId } = options;
				console.log('segmentId', segmentId)
			},
			milestoneId: () => {
				const { milestoneId } = options;
				console.log('milestoneId', milestoneId)
			}
		}
		
		keys.forEach( key => validate[key]() )
	}

	list(languageId, custom = {}) {
		this._validate({ languageId });
		languageId = this._getLangId(languageId);
		const { consumerKey, projectId } = this._config;

		var options = { 
		  url: `${BASE}/${FILE_LISTFILES}`,
		  headers: 
		   { consumerKey, languageId, projectId, 'content-type': 'application/json' },
		  body: {},
		  json: true 
		};

		Object.assign(options, custom);

		return rp.post(options).then(this._transformResponse);
	}

	types(custom = {}) {
		const { consumerKey, projectId } = this._config;

		var options = { 
		  url: `${BASE}/${FILE_TYPES}`,
		  headers: 
		   { consumerKey, projectId }
		};

		Object.assign(options, custom);

		return rp.get(options).then(this._transformResponse);
	}
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

	upload(filesUpload, custom = {}) {
		/*
			ALPHA ROUTE: NEED TO UPDATE TO APIGEE
		*/
		this._validate({ filesUpload })
		const { consumerKey, organizationId, projectId } = this._config;
		const x_auth_token = '2e6ed10f-cf65-4fe9-9067-a714a8849d85';
		
		const allOptions = [].concat(filesUpload).map( (file) => {
			const { path, type } = file;

			var options = { 
			  url: `https://app.qordoba.com/api/organizations/${organizationId}/upload/uploadFile_anyType?content_type_code=${type}&projectId=${projectId}`,
			  qs: { type },
			  headers: { 'x-auth-token': x_auth_token,'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
			  formData: { 
			    file: fs.createReadStream(path),
			    file_names: '[]'
			  }
			};

			Object.assign(options, custom);

			return options;
		});

		// make first request to upload files, returns fileIds
		return Promise.all(allOptions.map(options => rp.post(options).then(this._transformResponse)))
		.then((files) => {
			const versions = [];
			const filenames = [];
			const payload = files.map((file) => {
				const { upload_id, file_name, version_tags } = file;
				const versionTag = this._incrementVersion(version_tags);
				versions.push(versionTag);
				filenames.push(file_name);
				return {
		      "id": upload_id,
		      "source_columns":[],
		      "file_name": file_name,
		      "version_tag": versionTag,
		      "content_type_codes":[
		         {
		            "content_type_code_id":148,
		            "content_type_code":"JSON",
		            "name":"JSON",
		            "extensions":[
		               "json"
		            ],
		            "be_value":"JSON",
		            "upload_path":"/organizations/:organization_id/upload/uploadFile_anyType"
		         }
		      ]
		   	}
			});

			var options = { 
			  url: `https://app.qordoba.com/api/projects/${projectId}/append_files`,
			  headers: { 'x-auth-token': x_auth_token,'content-type': 'application/json;charset=UTF-8' },
			  body: payload,
		  	json: true 
			};

			// make second reqest to append files with new version numbers
			return rp.post(options)
				.then(this._transformResponse)
				.then(({ files_ids }) => {
					return files_ids.map((fileId, index) => {
						const version = versions[index];
						const filename = filenames[index];
						console.log('versions', versions)
						return Object.assign({}, { fileId, filename, versionTag: version });
					})
			 	})
		})
	}

	_incrementVersion(versionTags) {
		if (versionTags.length === 0) {
			return '1.0';
		}
		const mostRecent = versionTags[0];
		const main = mostRecent.split('.')[0];
		const sub = mostRecent.split('.')[1];

		if (sub !== '9') {
			const newSub = String(Number(sub) + 1);
			return `${main}.${newSub}`;
		} else {
			const newSub = '0';
			const newMain = String(Number(main) + 1);
			return `${newMain}.${newSub}`;
		}
	}

	export(languageId, fileIds, custom = {}) {
		this._validate({ languageId, fileIds });

		languageId = this._getLangId(languageId);
		if (Array.isArray(fileIds)) { fileIds = fileIds.join(',') }
		const { consumerKey, projectId } = this._config;

		var options = { 
      url: `${BASE}/${FILE_EXPORT}`,
      headers: 
       { consumerKey, projectId, fileIds, targetLanguageIds: languageId },
      body: {},
      json: true 
    };

		Object.assign(options, custom);

		return rp.post(options).then(this._transformResponse);
	}	

	// update(files, custom = {}) {
	// 	const { consumerKey, projectId } = this._config;

	// 	const allOptions = files.map((file) => {
	// 		const { path, fileId } = file;
	// 		const option = { 
	// 		  url: `${BASE}/${FILE_UPDATE}`,
	// 		  headers: { consumerKey, projectId, fileId, 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
	// 		  formData: { 
	// 		    file: fs.createReadStream(path)
	// 	  	}
	// 	  };
	// 	  return Object.assign(option, custom);
	// 	})

	// 	return Promise.all(allOptions.map(options => rp.post(options).then(this._transformResponse)));
	// }

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

	segments(languageId, fileId, custom = {}) {
		this._validate({ languageId, fileId });

		languageId = this._getLangId(languageId);
		const { consumerKey, projectId } = this._config;

		var options = { 
		  url: `${BASE}/${FILE_SEGMENTS}`,
		  headers: { consumerKey, projectId, languageId, fileId },
		}

		Object.assign(options, custom);

		return rp.get(options).then(this._transformResponse);
	}

	segment(languageId, fileId, segmentId, custom = {}) {
		this._validate({ languageId, fileId, segmentId });

		languageId = this._getLangId(languageId);
		const { consumerKey, projectId } = this._config;

		var options = { 
		  url: `${BASE}/${FILE_SEGMENT}`,
		  headers: { consumerKey, projectId, languageId, segmentId, fileId },
		}

		Object.assign(options, custom);

		return rp.get(options).then(this._transformResponse);
	}

	json(languageId, milestoneId, fileIds, custom = {}) {
		this._validate({ languageId, milestoneId, fileIds });

		languageId = this._getLangId(languageId);
		const { consumerKey, projectId } = this._config;

		// handle multiple fileIds
		const allOptions = [].concat(fileIds).map( (fileId) => {
			const options = { 
		  	url: `${BASE}/${FILE_JSON}`,
		  	headers: { consumerKey, projectId, languageId, fileId, milestoneId },
			}

			Object.assign(options, custom);

			return options;
		});
		
		return Promise.all(allOptions.map(options => rp.get(options).then(this._transformResponse)))
	}

}

export default File;