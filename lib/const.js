'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.V_milestoneId = exports.V_segmentId = exports.V_fileId = exports.V_fileIds = exports.V_filesUpdate = exports.V_fileUpdate = exports.V_filesUpload = exports.V_languageId = exports.V_projectId = exports.V_organizationId = exports.V_consumerKey = exports.MILESTONE_ID_ERROR = exports.SEGMENT_ID_ERROR = exports.FILE_ID_ERROR = exports.FILE_IDS_ERROR = exports.FILES_UPDATE_ERROR = exports.FILE_UPDATE_ERROR = exports.FILES_UPLOAD_ERROR = exports.LANGUAGE_ID_ERROR = exports.PROJECT_ID_ERROR = exports.ORGANIZATION_ID_ERROR = exports.CONSUMER_KEY_ERROR = exports.TM_DELETE_SEGMENT = exports.TM_UPDATE_SEGMENT = exports.TM_ADD_SEGMENT = exports.TM_SEGMENTS = exports.TM_SHOW = exports.TM_UPLOAD = exports.TM_LIST = exports.FILE_JSON = exports.FILE_SEGMENT = exports.FILE_SEGMENTS = exports.FILE_UPDATE = exports.FILE_EXPORT = exports.FILE_UPLOAD = exports.FILE_TYPES = exports.FILE_LISTFILES = exports.PROJ_WORKFLOW = exports.PROJ_STATUS = exports.PROJ_DETAIL = exports.PROJ_LIST = exports.ORG_TEAM = exports.COUNTRIES = exports.LANGUAGES = exports.PING = exports.BASE = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API
var BASE = exports.BASE = 'https://api.qordoba.com/v2';
var PING = exports.PING = 'ping';
var LANGUAGES = exports.LANGUAGES = 'languages';
var COUNTRIES = exports.COUNTRIES = 'countries';

// ORGANIZATION
var ORG_TEAM = exports.ORG_TEAM = 'organizations/team';

// PROJECTS
var PROJ_LIST = exports.PROJ_LIST = 'projects/list';
var PROJ_DETAIL = exports.PROJ_DETAIL = 'projects/detail';
var PROJ_STATUS = exports.PROJ_STATUS = 'projects/status';
var PROJ_WORKFLOW = exports.PROJ_WORKFLOW = 'projects/workflow';

// FILES
var FILE_LISTFILES = exports.FILE_LISTFILES = 'files/list';
var FILE_TYPES = exports.FILE_TYPES = 'files/types';
var FILE_UPLOAD = exports.FILE_UPLOAD = 'files/upload';
var FILE_EXPORT = exports.FILE_EXPORT = 'files/export';
var FILE_UPDATE = exports.FILE_UPDATE = 'files/update';
var FILE_SEGMENTS = exports.FILE_SEGMENTS = 'files/segments/list';
var FILE_SEGMENT = exports.FILE_SEGMENT = 'files/segments/show';
var FILE_JSON = exports.FILE_JSON = 'files/json';

// TM
var TM_LIST = exports.TM_LIST = 'tms/list';
var TM_UPLOAD = exports.TM_UPLOAD = 'tms/upload';
var TM_SHOW = exports.TM_SHOW = 'tms/show';
var TM_SEGMENTS = exports.TM_SEGMENTS = 'tms/segments/list';
var TM_ADD_SEGMENT = exports.TM_ADD_SEGMENT = 'tms/segments/add';
var TM_UPDATE_SEGMENT = exports.TM_UPDATE_SEGMENT = 'tms/segments/update';
var TM_DELETE_SEGMENT = exports.TM_DELETE_SEGMENT = 'tms/segments/delete';

// ERROR HANDLING
var CONSUMER_KEY_ERROR = exports.CONSUMER_KEY_ERROR = 'consumer key must be a 32 digit string';
var ORGANIZATION_ID_ERROR = exports.ORGANIZATION_ID_ERROR = 'organizationId must be a 4 digit number';
var PROJECT_ID_ERROR = exports.PROJECT_ID_ERROR = 'projectId must be a 4 digit number';
var LANGUAGE_ID_ERROR = exports.LANGUAGE_ID_ERROR = 'languageId must be a valid string code or number';
var FILES_UPLOAD_ERROR = exports.FILES_UPLOAD_ERROR = 'filesUpload must be a valid object or array of objects';
var FILE_UPDATE_ERROR = exports.FILE_UPDATE_ERROR = 'must be a valid file - parallel updates are not supported';
var FILES_UPDATE_ERROR = exports.FILES_UPDATE_ERROR = 'filesUpdate must be a valid object or array of objects';
var FILE_IDS_ERROR = exports.FILE_IDS_ERROR = 'must be a valid fileId or array of valid fileIds';
var FILE_ID_ERROR = exports.FILE_ID_ERROR = 'must be a valid six digit fileId';
var SEGMENT_ID_ERROR = exports.SEGMENT_ID_ERROR = 'must be a valid numberic segmentId';
var MILESTONE_ID_ERROR = exports.MILESTONE_ID_ERROR = 'must be a valid 4 digit numeric milestoneId';

var V_consumerKey = exports.V_consumerKey = function V_consumerKey(consumerKey) {
  if (typeof consumerKey !== 'string' && String(consumerKey).length !== 32) {
    throw Error(CONSUMER_KEY_ERROR);
  }
};

var V_organizationId = exports.V_organizationId = function V_organizationId(organizationId) {
  if (typeof organizationId !== 'number' && String(organizationId).length !== 4) {
    throw Error(ORGANIZATION_ID_ERROR);
  }
};

var V_projectId = exports.V_projectId = function V_projectId(projectId) {
  if (typeof projectId !== 'number' && String(projectId).length !== 4) {
    throw Error(PROJECT_ID_ERROR);
  }
};

var V_languageId = exports.V_languageId = function V_languageId(languageId) {
  if (typeof languageId === 'number' && String(languageId).length <= 3) {
    return;
  }
  if (typeof languageId === 'string' && languageId[2] === '-') {
    return;
  }
  throw Error(LANGUAGE_ID_ERROR);
};

var V_filesUpload = exports.V_filesUpload = function V_filesUpload(filesUpload) {
  if (Array.isArray(filesUpload) && typeof filesUpload[0].path === 'string') {
    return;
  }
  if ((typeof filesUpload === 'undefined' ? 'undefined' : (0, _typeof3.default)(filesUpload)) === 'object' && typeof filesUpload.path === 'string') {
    return;
  }
  throw Error(FILES_UPLOAD_ERROR);
};

var V_fileUpdate = exports.V_fileUpdate = function V_fileUpdate(fileUpdate) {
  if ((typeof fileUpdate === 'undefined' ? 'undefined' : (0, _typeof3.default)(fileUpdate)) !== 'object' && fileUpdate.path === 'string' && fileUpdate.fileId !== 'number') {
    throw Error(FILE_UPDATE_ERROR);
  }
};

var V_filesUpdate = exports.V_filesUpdate = function V_filesUpdate(filesUpdate) {
  if (Array.isArray(filesUpdate) && typeof filesUpdate[0].path === 'string' && typeof filesUpdate[0].fileId === 'number') {
    return;
  }
  if ((typeof filesUpdate === 'undefined' ? 'undefined' : (0, _typeof3.default)(filesUpdate)) === 'object' && typeof filesUpdate.path === 'string' && typeof filesUpdate.fileId === 'number') {
    return;
  }
  throw Error(FILES_UPDATE_ERROR);
};

var V_fileIds = exports.V_fileIds = function V_fileIds(fileIds) {
  if (Array.isArray(fileIds) && fileIds.every(function (el) {
    return typeof el === 'number';
  })) {
    return;
  }
  if (typeof fileIds === 'number' && String(fileIds).length === 6) {
    return;
  }
  throw Error(FILE_IDS_ERROR);
};

var V_fileId = exports.V_fileId = function V_fileId(fileId) {
  if (typeof fileId !== 'number' && String(fileId).length !== 6) {
    throw Error(FILE_ID_ERROR);
  }
};

var V_segmentId = exports.V_segmentId = function V_segmentId(segmentId) {
  if (typeof segmentId !== 'number') {
    throw Error(SEGMENT_ID_ERROR);
  }
};

var V_milestoneId = exports.V_milestoneId = function V_milestoneId(milestoneId) {
  if (typeof milestoneId !== 'number' && String(milestoneId).length !== 4) {
    throw Error(MILESTONE_ID_ERROR);
  }
};