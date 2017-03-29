# Qordoba-nodejs-sdk-npm

Makes it easy to work with the Qordoba API in nodejs

## Getting Started

Before getting started, you will need to visit Qordoba.com and set up an account.

After creating an account, clone down the repo from github and npm install in the root.

Directory Structure

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

```js
```

### Creating a new app

const app = new App({ consumerKey, organizationId, projectId });

### Basic Use

```js
app.ping()
.then( body => /* do something */ )
.catch( err => /* do something */ )
```

### Arguments

arguments are passed directly into the methods

```js
app.file.list(languageId)
.then( body => /* do something */ )
.catch( err => /* do something */ )
```

### Custom Options

can optionally be passed inside an object literal as the last argument

```js
app.file.segments(languageId, fileId, { limit: 1 })
.then( body => /* do something */ )
.catch( err => /* do something */ )
```

### Full Response

get full response by passing { fullResponse: true } as one of your key:value pairs inside custom options

```js
app.ping({ fullResponse: true })
.then( body => /* do something */ )
.catch( err => /* do something */ )
```

## Available Methods

### Globals

```js
app.ping()
* returns the status of the Qordoba API
* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
* @param {object}     custom     Custom object with keys explained below: (optional)
*   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
```


app.languages()
* returns detail about the language detail for Qordoba
* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
* @param {object}     custom     Custom object with keys explained below: (optional)
* @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)


app.countries()
* returns detail about the country list for Qordoba
* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
* @param {object}     custom     Custom object with keys explained below: (optional)
*   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)

### Organization

app.organization.team()
* returns information about your organization's team members
* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
* @param {object}     custom     Custom object with keys explained below: (optional)
*   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)

### Project

app.project.list()
* returns a list of projects that belong to an organization, including some project details.
* @param {object}     custom     Custom object with keys explained below: (optional)
*   @param {number}     custom.offset        Number of files to skip before starting the list (optional, default: 0)
*   @param {number}     custom.limit     Maximum number of files to list (optional, default: 100)
*   @param {string}     custom.search     The search term (optional, default: none)
*   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error

app.project.detail()
* returns detailed information about a project
* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
* @param {object}     custom     Custom object with keys explained below: (optional)
*   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)

app.project.status()
* returns the status of all projects
* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
* @param {object}     custom     Custom object with keys explained below: (optional)
*   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)

app.project.workflow()
* returns the milestone information, status, and language for a project
* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error
* @param {object}     custom     Custom object with keys explained below: (optional)
*   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)

app.project.milestones()
* returns the milestone information, status, and language for a project
* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error

### File

app.file.list(languageId)
* returns a list of project files for a given target languageId or languageCode
* @params {number|string}     languageId | languageCode			The id of target language
* @param {object}     custom     Custom object with keys explained below: (optional)
*   @param {number}     custom.offset        Number of files to skip before starting the list (optional, default: 0)
*   @param {number}     custom.limit     Maximum number of files to list (optional, default: 100)
*   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error

app.file.types()
* returns a list of the file types in a project
* @param {object}     custom     Custom object with keys explained below: (optional)
*   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)
* @return {Promise} A Promise that is fulfilled with the API response or rejected with an error

app.file.upload(filesUpload, versionTag)
* returns a list of the file types in a project
* @params {object|array}     filesUpload      A file object or array of file objects { path, type } || [{ path, type}, { path, type }...]
*   @param {string}     some_file_object.path        System path to target file
*   @param {string}     some_file_object.type        Type of file to uplaod
* @params {string}     versionTag     A versionTag for files

app.file.export(languageId, fileIds)
* returns a link for downloading a .zip file that contains project files for a specified page and target language
* @params {number|string}     languageId | languageCode			The id of target language
* @params {string|array}     fileIds			Ids of files to export
* @param {object}     custom     Custom object with keys explained below: (optional)
*   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)

app.file.update(fileUpdate)
* updates a file in a project - parallel updates are not supported
* @params {object}     fileUpdate			A file object { path, fileId }
  *   @param {string}     some_file_object.path        Path to target file
  *   @param {string}     some_file_object.fileId        Id of file to update
* @param {object}     custom     Custom object with keys explained below: (optional)
*   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)

app.file.segments(languageId, fileId)
* returns a list or filtered list of the segments in a file
* @params {number|string}     languageId | languageCode			The id of target language
* @params {number}     fileId			The id of the file to retrieve segments
* @param {object}     custom     Custom object with keys explained below: (optional)
*   @param {number}     custom.offset        Number of files to skip before starting the list (optional, default: 0)
*   @param {number}     custom.limit     Maximum number of files to list (optional, default: 100)
*   @param {string}     custom.search     The search term (optional, default: none)
*   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)

app.file.segment(languageId, fileId, segmentId)
* returns a file segment by its id
* @params {number|string}     languageId | languageCode			The id of target language
* @params {number}     fileId			The id of the file to retrieve segments
* @params {number}     segmentId			The id of segment
* @param {object}     custom     Custom object with keys explained below: (optional)
*   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)

app.file.json(languageId, milestoneId, fileIds)
* returns json object of key value pairs 
* @params {number|string}     languageId | languageCode			The id of target language
* @params {number}     milestoneId		The id of the milestone to get json from (see app.project.milestone)
* @params {number}     fileId			The id of the file to retrieve segments
* @params {number}     segmentId			The id of segment


app.file.recent(languageId)
* returns array of most version of files by target language
* @params {number|string}     languageId | languageCode			The id of target language
* @param {object}     custom     Custom object with keys explained below: (optional)
*   @param {number}     custom.fullResponse        Forces return of full response (optional, default: false)


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
