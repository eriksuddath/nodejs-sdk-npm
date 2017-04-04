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
	FILE_JSON,
	FILE_BULK1,
	FILE_BULK2,
	V_languageId,
	V_filesUpload,
	V_fileUpdate,
	V_fileIds,
	V_fileId,
	V_segmentId,
	V_milestoneId,
	V_versionTag
} from './const';

import { LANG_CODES } from './lang_codes';

import App from './App';

class File {
	constructor(config, transformResponse) {
		this._config = config;
		this._transformResponse = transformResponse;
	}
	/**
	* converts languageCode ('es-mx') into a languageId (222)
	*/
	_getLangId(languageCode) {
		return LANG_CODES[languageCode] !== undefined ? LANG_CODES[languageCode] : languageCode;
	}
	/**
	* validates keys before request
	*/
	_validate(options) {
		const keys = Object.keys(options);

		const validate = {
			languageId: () => V_languageId(options.languageId),
			filesUpload: () => V_filesUpload(options.filesUpload),
			fileUpdate: () => V_fileUpdate(options.fileUpdate),
			fileIds: () => V_fileIds(options.fileIds),
			fileId: () => V_fileId(options.fileId),
			segmentId: () => V_segmentId(options.segmentId),
			milestoneId: () => V_milestoneId(options.milestoneId),
			versionTag: () => V_versionTag(options.versionTag)
		}
		
		keys.forEach( key => validate[key]() )
	}
	/**
	* returns a list of project files for a given target languageId or languageCode
	* @params {number|string}     languageId | languageCode			The id of target language
	* @param {object}     custom     Custom object with keys explained below: (optional)
  *   @param {number}     custom.offset        Number of files to skip before starting the list (optional, default: 0)
  *   @param {number}     custom.limit     Maximum number of files to list (optional, default: 100)
  *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
	* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
	*/
	list(languageId, custom = { offset: 0, limit: 100, fullResponse: false  }) {
		this._validate({ languageId });

		languageId = this._getLangId(languageId);

		const { consumerKey, projectId } = this._config;
		const { offset, limit, fullResponse } = custom;

		var options = { 
		  url: `${BASE}/${FILE_LISTFILES}`,
		  headers: { consumerKey, languageId, projectId, 'content-type': 'application/json' },
		  qs: { offset, limit },
		  resolveWithFullResponse: fullResponse,
		  body: {},
		  json: true 
		};

		return rp.post(options).then(this._transformResponse);
	}
	/**
	* returns a list of the file types in a project
	* @param {object}     custom     Custom object with keys explained below: (optional)
  *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
	* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
	*/
	types(custom = { fullResponse: false  }) {
		const { consumerKey, projectId } = this._config;
		const { fullResponse } = custom;

		var options = { 
		  url: `${BASE}/${FILE_TYPES}`,
		  headers: { consumerKey, projectId },
		  resolveWithFullResponse: fullResponse
		};

		return rp.get(options).then(this._transformResponse);
	}



	/**
	* returns a list of the file types in a project
	* @params {object|array}     filesUpload			A file object or array of file objects { path, type } || [{ path, type}, { path, type }...]
  *   @param {string}     some_file_object.path        System path to target file
  *   @param {string}     some_file_object.type        Type of file to uplaod
	* @params {string}     versionTag			A versionTag for files
	*/
	upload(filesUpload, versionTag ) {
		/*
			ALPHA ROUTE: NEED TO UPDATE TO APIGEE
		*/
		this._validate({ filesUpload, versionTag })
		const { consumerKey, organizationId, projectId } = this._config;
		
		const allOptions = [].concat(filesUpload).map( (file) => {
			const { path, type } = file;

			var options = { 
			  url: `${BASE}/${FILE_BULK1}`,
			  qs: { type },
			  headers: { consumerKey, organizationId, projectId,'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
			  formData: { 
			    file: fs.createReadStream(path),
			    file_names: '[]'
			  }
			};

			return options;
		});

		// make first request to upload files, returns fileIds
		return Promise.all(allOptions.map(options => rp.post(options).then(this._transformResponse)))
		.then((files) => {
			const filenames = [];
			const payload = files.map((file) => {
				const { upload_id, file_name } = file;
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
			  url: `${BASE}/${FILE_BULK2}`,
			  headers: { consumerKey, projectId,'content-type': 'application/json;charset=UTF-8' },
			  body: payload,
		  	json: true 
			};

			// make second reqest to append files with new version numbers
			return rp.post(options)
				.then(this._transformResponse)
				.then(({ files_ids }) => {
					return files_ids.map((fileId, index) => {
						const filename = filenames[index];
						return Object.assign({}, { fileId, filename, versionTag });
					})
			 	})
		})
	}

	/**
	* returns a link for downloading a .zip file that contains project files for a specified page and target language
	* @params {number|string}     languageId | languageCode			The id of target language
	* @params {string|array}     fileIds			Ids of files to export
	* @param {object}     custom     Custom object with keys explained below: (optional)
  *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
	*/
	export(languageId, fileIds, custom = { fullResponse: false }) {
		this._validate({ languageId, fileIds });

		languageId = this._getLangId(languageId);
		const { fullResponse } = custom;

		if (Array.isArray(fileIds)) { fileIds = fileIds.join('-') }
		const { consumerKey, projectId } = this._config;

		var options = { 
      url: `${BASE}/${FILE_EXPORT}`,
      headers: 
       { consumerKey, projectId, fileIds, targetLanguageIds: languageId },
		  resolveWithFullResponse: fullResponse,
      body: {},
      json: true 
    };

		return rp.post(options).then(this._transformResponse);
	}	
	/**
	* updates a file in a project - parallel updates are not supported
	* @params {object}     fileUpdate			A file object { path, fileId }
	  *   @param {string}     some_file_object.path        Path to target file
	  *   @param {string}     some_file_object.fileId        Id of file to update
	* @param {object}     custom     Custom object with keys explained below: (optional)
  *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
	*/
	update(fileUpdate, custom = { fullResponse: false }) {
		this._validate({ fileUpdate })

		const { consumerKey, projectId } = this._config;
		const { fullResponse } = custom;
		const { path, fileId } = fileUpdate;

		const options = { 
		  url: `${BASE}/${FILE_UPDATE}`,
		  headers: { consumerKey, projectId, fileId, 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
		  resolveWithFullResponse: fullResponse,
		  formData: { 
		    file: fs.createReadStream(path)
	  	}
	  };

		return rp.post(options).then(this._transformResponse);
	}
	/**
	* returns a list or filtered list of the segments in a file
	* @params {number|string}     languageId | languageCode			The id of target language
	* @params {number}     fileId			The id of the file to retrieve segments
	* @param {object}     custom     Custom object with keys explained below: (optional)
  *   @param {number}     custom.offset        Number of files to skip before starting the list (optional, default: 0)
  *   @param {number}     custom.limit     Maximum number of files to list (optional, default: 100)
  *   @param {string}     custom.search     The search term (optional, default: none)
  *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
	*/
	segments(languageId, fileId, custom = { offset: 0, limit: 100, fullResponse: false }) {
		this._validate({ languageId, fileId });

		languageId = this._getLangId(languageId);

		const { consumerKey, projectId } = this._config;
		const { offset, limit, fullResponse } = custom;

		var options = { 
		  url: `${BASE}/${FILE_SEGMENTS}`,
		  headers: { consumerKey, projectId, languageId, fileId },
		  qs: { offset, limit },
		  resolveWithFullResponse: fullResponse
		}

		// assign filter and search params to qs if passed
		if (custom.search) { Object.assign(options.qs, { search: custom.search }) }

		return rp.get(options).then(this._transformResponse);
	}
	/**
	* returns a file segment by its id
	* @params {number|string}     languageId | languageCode			The id of target language
	* @params {number}     fileId			The id of the file to retrieve segments
	* @params {number}     segmentId			The id of segment
	* @param {object}     custom     Custom object with keys explained below: (optional)
  *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
	*/
	segment(languageId, fileId, segmentId, custom = { fullResponse: false }) {
		this._validate({ languageId, fileId, segmentId });

		languageId = this._getLangId(languageId);

		const { consumerKey, projectId } = this._config;
		const { fullResponse } = custom;

		var options = { 
		  url: `${BASE}/${FILE_SEGMENT}`,
		  headers: { consumerKey, projectId, languageId, segmentId, fileId },
		  resolveWithFullResponse: fullResponse
		}

		return rp.get(options).then(this._transformResponse);
	}
	/**
	* returns json object of key value pairs 
	* @params {number|string}     languageId | languageCode			The id of target language
	* @params {number}     milestoneId		The id of the milestone to get json from (see app.project.milestone)
	* @params {number}     fileId			The id of the file to retrieve segments
	* @params {number}     segmentId			The id of segment
	*/
	json(languageId, milestoneId, fileIds) {
		this._validate({ languageId, milestoneId, fileIds });

		languageId = this._getLangId(languageId);

		const { consumerKey, projectId } = this._config;

		// handle multiple fileIds
		const allOptions = [].concat(fileIds).map( (fileId) => {
			const options = { 
		  	url: `${BASE}/${FILE_JSON}`,
		  	headers: { consumerKey, projectId, languageId, fileId, milestoneId },
			}

			return options;
		});
		
		return Promise.all(allOptions.map(options => rp.get(options).then(this._transformResponse)))
	}
	/**
	* returns array of most version of files by target language
	* @params {number|string}     languageId | languageCode			The id of target language
	* @param {object}     custom     Custom object with keys explained below: (optional)
  *   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
	*/
	recent(languageId, custom = { offset: 0, limit: 100, fullResponse: false }) {
		this._validate({ languageId });
		languageId = this._getLangId(languageId);

		const { consumerKey, projectId } = this._config;
		const { offset, limit, fullResponse } = custom;

	  var options = { 
	    method: 'POST',
	    url: 'https://api.qordoba.com/v2/files/list',
	    qs: { limit, offset },
	    headers: { consumerKey, languageId, projectId, 'content-type': 'application/json' },
		  resolveWithFullResponse: fullResponse,
	    body: {},
	    json: true 
	  };

  	return rp(options)
  		.then(this._transformResponse)
	    .then( (body) => {
		      const files = body.reduce((obj, { fileName, fileId, updated }) => {
		      	const filename = fileName;
		        if (obj[filename] === undefined) { obj[filename] = { filename, updated, fileId }; }
		        
		        if (updated > obj[filename]['updated']) {
		          obj[filename] = { filename, updated, fileId };
		        }
		        
		        return obj
		      }, {})

		      return Object.values(files);
	    })
	}

}

export default File;