const expect = require('Chai').expect;
const App = require('../lib/App').default;

// get test config
const { consumerKey, organizationId, projectId, languageId, milestoneId } = require('./test_config');

const app = new App({ consumerKey, organizationId, projectId });

describe('file', () => {

	let fileIds, segmentId, uploadedFiles;
	describe('list files', () => {

		it('should return a list of project files for a given target language', (done) => {
			app.file.list(languageId)
			.then( (files) => {
				expect(files).to.be.a('array');
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

	})

	describe('list file types', () => {

		it('should return a list of the file types in a project', (done) => {
			app.file.types(languageId)
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

	})

	// describe('upload file', () => {
	// 	const file = {
	// 		path: __dirname + '/mockFiles/uploadFile.json',
	// 		version: '1.0.0',
	// 		type: 'JSON'
	// 	}
		

	// 	it('should upload files to a project', (done) => {
	// 		app.file.upload(file)
	// 		.then( ({ result, files_ids }) => {
 //        // for use in next test
 //        fileIds = files_ids;

 //        expect(result).to.eql('success');
 //        expect(files_ids).to.be.a('array');
	// 			done()
	// 		})
	// 		.catch(err => {
	// 			expect(err).to.not.exist
	// 			done()
	// 		})
	// 	})

	// })

	describe('upload files', () => {
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
			.then( (body) => {
				console.log(body)
				fileIds = body[0].fileId;
				console.log('fileId', fileIds)
        // expect(result).to.eql('success');
        // expect(files_ids).to.be.a('array');
        // add delay to prevent error on next test
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
			.then( (body) => {
				console.log(body)
				uploadedFiles = body;
        // expect(result).to.eql('success');
        // expect(files_ids).to.be.a('array');
				done()
			})
			.catch(err => {
				console.log(err)
				expect(err).to.not.exist
				done()
			})
		})

	})

	describe('export files', () => {

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
				console.log('dl', downloadLink)
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

	describe('update file', () => {

		it('should handle updating multiple files', (done) => {
			const files = uploadedFiles.map((file) => {
				return {
					path: `${__dirname}/mockFiles/${file.filename}`,
					fileId: file.fileId
				}
			})

			app.file.update(files)
			.then(body => {
				console.log(body)
				done()
			})
			.catch(err => {
				console.log(err)
				// expect(err).to.not.exist
				done()
			})
		})

	})

	describe('list file segments', () => {

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

				done()
			})
			.catch(err => {
				console.log(err)
				expect(err).to.not.exist
				done()
			})
		})

	})

	describe('show file segments', () => {

		it('should show details of a segment in a file', (done) => {
			const fileId = 738099;

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
})