const expect = require('Chai').expect;
const App = require('../lib/App').default;

// get test config
const { consumerKey, organizationId, projectId, languageId, milestoneId } = require('./test_config');

const app = new App({ consumerKey, organizationId, projectId });

describe('file', () => {

	let fileIds, segmentId, uploadedFiles;
	xdescribe('list files', () => {

		it('should return a list of project files for a given target language', (done) => {
			app.file.list(languageId)
			.then( (files) => {
				expect(files).to.be.a('array');
				expect(files.length).to.be.within(0,100);
				if (files.length > 0) {
				  const file = files[0];
				  expect(file.fileId).to.exist;
				  expect(file.fileName).to.exist;
				  expect(file.updated).to.exist;
				}
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})

		it('should accept a custom limit and offset', (done) => {
			const limit = 200;
			const offset = 0;
			app.file.list(languageId, { limit, offset })
			.then( (files) => {
				expect(files).to.be.a('array');
				expect(files.length).to.be.within(0,200);
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})

		it('should accept option to return full response', (done) => {
			app.file.list(languageId, { fullResponse: true })
			.then( ({ body, statusCode }) => {
				expect(statusCode).to.exist;
				expect(statusCode).to.eql(200);
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})

	})

	xdescribe('list file types', () => {

		it('should return a list of the file types in a project', (done) => {
			app.file.types()
			.then( (types) => {
        const type = types[0];
        expect(types).to.be.a('array');
        expect(types.length).to.gt(0);
        expect(type.typeId).to.exist;
        expect(type.typeCode).to.exist;
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})

		it('should accept option to return full response', (done) => {
			app.file.types({ fullResponse: true })
			.then( ({ body, statusCode }) => {
	      expect(statusCode).to.exist;
				expect(statusCode).to.eql(200);
				done()
			})
			.catch(err => {
				console.log(err)
				expect(err).to.not.exist
				done()
			})
		})

	})

	xdescribe('upload files', () => {
		const files = [{
			path: __dirname + '/mockFiles/test000.json',
			type: 'JSON'
		},
		{
			path: __dirname + '/mockFiles/test001.json',
			type: 'JSON'
		}]
		
		it('should upload a single file', (done) => {
			const file = files[0];

			app.file.upload(file)
			.then( (files) => {
				const file = files[0];
        expect(files).to.be.a('array');
        expect(file.fileId).to.be.a('number');
        expect(file.filename).to.be.a('string');
        expect(file.versionTag).to.be.a('string');
				// save a file id for later test
				fileIds = file.fileId;
				console.log('Adding 10 second timeout to prevent server error')
				setTimeout(done, 10000);
			})
			.catch(err => {
				console.log(err)
				expect(err).to.not.exist
				done()
			})
		})

		it('should bulk upload a group of files', (done) => {
			app.file.upload(files)
			.then( (files) => {
        expect(files).to.be.a('array');
				expect(files.length).to.eql(2);
				uploadedFiles = files;
				done()
			})
			.catch(err => {
				console.log(err)
				expect(err).to.not.exist
				done()
			})
		})

	})

	xdescribe('export files', () => {

		it('should return a link for downloading a .zip file that contains project files', (done) => {
			app.file.export(languageId, fileIds)
			.then( ({ downloadLink }) => {
        expect(downloadLink).to.exist;
				done()
			})
			.catch(err => {
				console.log(err);
				expect(err).to.not.exist
				done()
			})
		})

		it('should handle multiple file ids in an array', (done) => {
			const fileIds = [738099, 740365];

			app.file.export(languageId, fileIds)
			.then( ({ downloadLink }) => {
        expect(downloadLink).to.exist;
				done()
			})
			.catch(err => {
				console.log(err);
				expect(err).to.not.exist
				done()
			})
		})

	})

	xdescribe('update file', () => {
		it('should update a file', (done) => {
			const uploadedFile = uploadedFiles[0];
			const file = {
				path: `${__dirname}/mockFiles/${uploadedFile.filename}`,
				fileId: uploadedFile.fileId
			}

			app.file.update(file)
			.then( ({ result, files_ids }) => {
				expect(result).to.eql('success');
				expect(files_ids).to.be.a('array');
				done()
			})
			.catch(err => {
				console.log(err)
				expect(err).to.not.exist
				done()
			})
		})

	})

	xdescribe('list file segments', () => {

		it('should list segments in a file', (done) => {
			const languageId = 222;
			const fileId = 738099;

			app.file.segments(languageId, fileId)
			.then( ({ sourceId, sourceCode, segments }) => {
				expect(sourceId).to.be.a('number');
				expect(sourceCode).to.be.a('string');
				expect(segments).to.be.a('array');

				const firstSegment = segments[0];
				expect(firstSegment).to.exist;
				expect(firstSegment.segmentId).to.be.a('number');
				segmentId = firstSegment.segmentId;
				console.log(segmentId)

				done()
			})
			.catch(err => {
				console.log(err)
				expect(err).to.not.exist
				done()
			})
		})

		it('should accept custom limit', (done) => {
			const languageId = 222;
			const fileId = 738099;

			app.file.segments(languageId, fileId, { limit: 1 })
			.then( ({ segments }) => {
				expect(segments).to.be.a('array');
				expect(segments.length).to.eql(1);
				done()
			})
			.catch(err => {
				console.log(err)
				expect(err).to.not.exist
				done()
			})
		})

		it('should accept custom search', (done) => {
			const languageId = 222;
			const fileId = 738099;

			app.file.segments(languageId, fileId, { search: 'test' })
			.then( ({ segments }) => {
				expect(segments).to.be.a('array');
				expect(segments[0].segment).to.eql('test segment')
				done()
			})
			.catch(err => {
				console.log(err)
				expect(err).to.not.exist
				done()
			})
		})

	})

	xdescribe('show file segment', () => {

		it('should show details of a segment in a file', (done) => {
			const fileId = 738099;
			const segmentId = 94177257;

			app.file.segment(languageId, fileId, segmentId)
			.then( ({ lastSaved, segmentId, segment }) => {
				expect(lastSaved).to.be.a('number');
				expect(segmentId).to.be.a('number');
				expect(segment).to.be.a('string');
				done()
			})
			.catch(err => {
				console.log(err)
				expect(err).to.not.exist
				done()
			})
		})

	})

	describe('get file json', () => {

		it('should return json of a file', (done) => {
			const fileId = 738099;

			app.file.json(languageId, milestoneId, fileId)
			.then( (body) => {
				expect(body).to.be.a('array');
				expect(body.length).to.eql(1);
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})

		it('should handle an array of fileIds', (done) => {
			const fileIds = [738099, 740365];

			app.file.json(languageId, milestoneId, fileIds)
			.then( (body) => {
				expect(body).to.be.a('array');
				expect(body.length).to.eql(2);
				expect(body[0]).to.be.a('object');
				expect(body[0]['header']).to.exist;
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})
	})

	describe('most recent', () => {

		it('should return most recent files', (done) => {
			const limit = 1000;
			app.file.recent(languageId, { limit })
			.then( (files) => {
				expect(files).to.be.a('array');
				const filenames = files.map( file => file.filename );
				const uniqueFilenames = [ ...new Set(filenames) ];
				expect(filenames.length).to.eql(uniqueFilenames.length);
				done()
			})
			.catch(err => {
				console.log(err)
				expect(err).to.not.exist
				done()
			})
		})

	})
})