# Qordoba-nodejs-sdk-npm

NodeJS client for interacting with the Qordoba API

## Getting Started

Before getting started, you will need to visit Qordoba.com and set up an account.

Install the SDK via NPM

```
npm install --save qordoba-nodejs-sdk
```

### Creating a new app


```js
const QordobaApp = require('qordoba-nodejs-sdk');

const app = new QordobaApp({ 
  consumerKey: 'your_consumer_key', 
  organizationId: 'your_organization_id', 
  projectId: 'your_project_id' 
});
```

### Basic Use

```js
app.ping()
.then( body => /* do something */ )
.catch( err => /* do something */ )
```

### Arguments

Required arguments are passed directly into the methods

```js
app.file.list(languageId)
.then( body => /* do something */ )
.catch( err => /* do something */ )
```

### Custom Options

Custom arguments can optionally be passed inside an object literal as the last argument

```js
app.file.segments(languageId, fileId, { limit: 1 })
.then( body => /* do something */ )
.catch( err => /* do something */ )
```

### Full Response

get full response by passing ```js{ fullResponse: true }``` as a custom option

```js
app.ping({ fullResponse: true })
.then( body => /* do something */ )
.catch( err => /* do something */ )
```

## Available Methods

### Globals

#### Ping

Returns the status of the Qordoba API

```js
app.ping()
```

Resolve with Full Response

```js
app.ping({ fullResponse: true })
.then( body => /* do something */ )
```
#### Languages

Returns language detail for Qordoba
  
```js
app.languages()
.then( body => /* do something */ )
```    

#### Countries

Returns the country list for Qordoba

```js
app.countries()
.then( body => /* do something */ )
```

#### Organization

Returns information about your organization's team members

```js
app.organization.team()
.then( body => /* do something */ )
```

### Project

#### List Projects

Returns a list of projects that belong to an organization, including some project details.

```js
app.project.list()
.then( body => /* do something */ )
```
Pick and choose custom parameters

```js
app.project.list({ offset: 0, limit: 100, search: 'foo', fullResponse: true })
.then( body => /* do something */ )

// offset           Number of files to skip before starting the list (optional, default: 0)
// limit            Maximum number of files to list (optional, default: 100)
// search           The search term (optional, default: none)
// fullResponse     Forces return of full response (optional, default: false)
```

#### Project Detail

Returns detailed information about a project

```js
app.project.detail()
.then( body => /* do something */ )
```
#### Project Status

Returns the status of all projects

```js
app.project.status()
.then( body => /* do something */ )
```
#### Project Workflow

Returns the milestone information, status, and language for a project

```js
app.project.workflow()
.then( body => /* do something */ )
```

### File

#### List Files

Returns a list of project files for a given target languageId or languageCode

With language Id
```js
const languageId = 222;

app.file.list(languageId)
.then( body => /* do something */ )

// languageId           The id of target language (number or string)
```

With 4 letter language code

```js
app.file.list('es-mx')
.then( body => /* do something */ )  
```

With Custom Options
```js
app.file.list('es-mx', { limit, offset })
.then( body => /* do something */ )

// offset           Number of files to skip before starting the list (optional, default: 0)
// limit            Maximum number of files to list (optional, default: 100)
```

#### List File Types

Returns a list of the file types in a project

```js
app.file.types()
.then( body => /* do something */ )  
```

#### Upload Files

Returns a list of the file types in a project

Upload a single file
```js
const file = {
  path: 'the_path_to_your_file',
  type: 'JSON'
};

const versionTag = '1.0.0';

app.file.upload(file, versionTag)
.then( body => /* do something */ )

// file                 A file object or array of file objects(object or array)
// versionTag          A versionTag for files(string)
```
Upload multiple files

```js
// array of file paths
const files = [{ path: 'path_to_file1', type: 'JSON' }, { path: 'path_to_file2', type: 'JSON' } ... ];

// versionTag for all files
const versionTag = '1.0.0';

app.file.upload(files, versionTag)
.then( body => /* do something */ )  
```

#### Export Files as a Zip

Returns a link for downloading a .zip file that contains project files for a specified page and target language

Export a single File
```js

const fileId = 'your_file_id';
const languageId = 'your_language_id';

app.file.export(languageId, fileIds)
.then( body => /* do something */ ) 

// fileId              The id or ids of files to export (number or array of numbers)
// languageId          The id of target language (number or string)
```

Export a group of files

```js

const filesIds = [ 420024, 902102, etc... ] ;
const languageId = 222;

app.file.export(languageId, fileIds)
.then( body => /* do something */ )  
```

#### Update File

Updates a file in a project - parallel updates are not supported

```js
const fileToUpdate = {
  path: 'path_to_your_file',
  fileId: 'fileId_of_file_to_update'
}

app.file.update(fileToUpdate)
.then( body => /* do something */ )  

// path              Path to target file(string)
// languageId        Id of file to update(number)
```


#### List File Segments

Returns a list or filtered list of the segments in a file

```js
const languageId = 222;
const fileId = 902102;

app.file.segments(languageId, fileId)
.then( body => /* do something */ )  

// fileId            The id or ids of files to export (number)
// languageId        Id of file to update(number)
```

With custom options 

```js
app.file.segments(languageId, fileId, { offset, limit, search })

// offset           Number of files to skip before starting the list (optional, default: 0)
// limit            Maximum number of files to list (optional, default: 100)
// search           The search term (optional, default: none)
// fullResponse     Forces return of full response (optional, default: false)
```

#### File Segment Detail

Returns a file segment by its id

```js
app.file.segment(languageId, fileId, segmentId)
.then( body => /* do something */ )

// fileId            Id or ids of files to export (number)
// languageId        Id of file to update(number)
// segmentId         Id of file segment (number)
```

#### Download File As JSON

Returns json object of key value pairs for specified files

Downlaod a single file

```js
app.file.json(languageId, milestoneId, fileIds)
.then( body => /* do something */ )

// languageId        Id of file to update(number)
// milestoneId       id of the milestone to download from
// fileId            Id or ids of file(s) to download
```

Download multiple files

```js
const filesIds = [ 420024, 902102, etc... ] ;

app.file.json(languageId, milestoneId, fileIds)
.then( body => /* do something */ )
```

#### Recent File Ids

```js
app.file.recent(languageId)
.then( body => /* do something */ )

// languageId        Id of file to update(number)
```

### Directory Structure

```
├── root
│   ├── lib // transplied ES6 code
│   ├── src
│   │   ├── App.js 
│   │   ├── const.js
│   │   ├── file.js
│   │   ├── lang_codes.js
│   │   ├── organization.js
│   │   ├── project.js
│   │   ├── tm.js
│   ├── test
│   ├── node_modules
│   ├── gulpfile.js
│   ├── package.json
│   ├── readme.md

```

### Scripts

- 'gulp build' - transpliles ES6 code from src -> lib into ES5. Provides runtime support for promises.

## Running the tests

'npm test' in the root directory

## Built With

* [rp-promise](https://github.com/request/request-promise) -The simplified HTTP request client 'request' with Promise suppor

## Authors

* **Erik Suddath** -

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
