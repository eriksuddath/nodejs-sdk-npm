// API
export const BASE = 'https://devapi.qordoba.com/v2';
export const PING = 'ping';
export const LANGUAGES = 'languages';
export const COUNTRIES = 'countries';

// ORGANIZATION
export const ORG_TEAM = 'organizations/team';

// PROJECTS
export const PROJ_LIST = 'projects/list';
export const PROJ_DETAIL = 'projects/detail';
export const PROJ_STATUS = 'projects/status';
export const PROJ_WORKFLOW = 'projects/workflow';
 
// FILES
export const FILE_LISTFILES = 'files/list';
export const FILE_TYPES = 'files/types';
export const FILE_UPLOAD = 'files/upload';
export const FILE_EXPORT = 'files/export';
export const FILE_UPDATE = 'files/update';
export const FILE_SEGMENTS = 'files/segments/list';
export const FILE_SEGMENT = 'files/segments/show';
export const FILE_JSON = 'files/json';
export const FILE_BULK1 = 'files/bulk1';
export const FILE_BULK2 = 'files/bulk2';

// TM
export const TM_LIST = 'tms/list';
export const TM_UPLOAD = 'tms/upload';
export const TM_SHOW = 'tms/show';
export const TM_SEGMENTS = 'tms/segments/list';
export const TM_ADD_SEGMENT = 'tms/segments/add';
export const TM_UPDATE_SEGMENT = 'tms/segments/update';
export const TM_DELETE_SEGMENT = 'tms/segments/delete';

// ERROR HANDLING
export const CONSUMER_KEY_ERROR = 'consumer key must be a 32 digit string';
export const ORGANIZATION_ID_ERROR = 'organizationId must be a 4 digit number';
export const PROJECT_ID_ERROR = 'projectId must be a 4 digit number';
export const LANGUAGE_ID_ERROR = 'languageId must be a valid string code or number';
export const FILES_UPLOAD_ERROR = 'filesUpload must be a valid object or array of objects';
export const FILE_UPDATE_ERROR = 'must be a valid file - parallel updates are not supported';
export const FILES_UPDATE_ERROR = 'filesUpdate must be a valid object or array of objects';
export const FILE_IDS_ERROR = 'must be a valid fileId or array of valid fileIds';
export const FILE_ID_ERROR = 'must be a valid six digit fileId';
export const SEGMENT_ID_ERROR = 'must be a valid numberic segmentId';
export const MILESTONE_ID_ERROR = 'must be a valid 4 digit numeric milestoneId';

export const V_consumerKey = (consumerKey) => {
  if (typeof consumerKey !== 'string' || String(consumerKey).length !== 32) { throw Error(CONSUMER_KEY_ERROR) }
}

export const V_organizationId = (organizationId) => {
  if (typeof organizationId !== 'number' && String(organizationId).length !== 4 ) { throw Error(ORGANIZATION_ID_ERROR) }
}

export const V_projectId = (projectId) => {
  if (typeof projectId !== 'number' && String(projectId).length !== 4) { throw Error(PROJECT_ID_ERROR) }
} 

export const V_languageId = (languageId) => {
  if (typeof languageId === 'number' && String(languageId).length <= 3) { return; }
  if (typeof languageId === 'string' && languageId[2] === '-') { return; }
  throw Error(LANGUAGE_ID_ERROR)
}

export const V_filesUpload = (filesUpload) => {
  if (Array.isArray(filesUpload) && typeof filesUpload[0].path === 'string') { return; }
  if (typeof filesUpload === 'object' && typeof filesUpload.path === 'string') { return; }
  throw Error(FILES_UPLOAD_ERROR);
}

export const V_fileUpdate = (fileUpdate) => {
  if (typeof fileUpdate !== 'object' && fileUpdate.path === 'string' && fileUpdate.fileId !== 'number') { throw Error(FILE_UPDATE_ERROR) }
}

export const V_filesUpdate = (filesUpdate) => {
  if (Array.isArray(filesUpdate) && typeof filesUpdate[0].path === 'string' && typeof filesUpdate[0].fileId === 'number') { return; }
  if (typeof filesUpdate === 'object' && typeof filesUpdate.path === 'string' && typeof filesUpdate.fileId === 'number') { return; }
  throw Error(FILES_UPDATE_ERROR);
};

export const V_fileIds = (fileIds) => {
  if (Array.isArray(fileIds) && fileIds.every( el => typeof el === 'number' ) ) { return; }
  if (typeof fileIds === 'number' && String(fileIds).length === 6 ) { return; }
  throw Error(FILE_IDS_ERROR);
};

export const V_fileId = (fileId) => {
  if (typeof fileId !== 'number' && String(fileId).length !== 6 ) { throw Error(FILE_ID_ERROR) }
};

export const V_segmentId = (segmentId) => {
  if (typeof segmentId !== 'number' ) { throw Error(SEGMENT_ID_ERROR) }
};

export const V_milestoneId = (milestoneId) => {
  if (typeof milestoneId !== 'number' && String(milestoneId).length !== 4) { throw Error(MILESTONE_ID_ERROR) }
}

