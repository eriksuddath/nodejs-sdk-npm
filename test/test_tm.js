/*
const expect = require('Chai').expect;
const App = require('../lib/App').default;
====================================================
BETA! WILL NOT WORK UNTIL BACKEND ROUTES ARE UPDATED
====================================================
// get test config
const { consumerKey, organizationId, projectId, tmId } = require('./test_config');

const app = new App({ consumerKey, organizationId, projectId });

describe('tm (translation memory)', () => {

	describe('list translation memories', () => {

		it('should list translation memories', (done) => {
			app.tm.list()
			.then( ({ tmCount, tms }) => {
				expect(tmCount).to.be.a('number');
				expect(tms).to.be.a('array');
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})

	})

	describe('upload translation memory', () => {

		it('should upload a translation memory', (done) => {
			console.log('TO DO!!!');
			done();
		})

	})

	describe('show translation memory', () => {
		it('should show translation memory details by tm id', (done) => {
			app.tm.show(tmId)
			.then( ({ sourceId, segmentsCount, segments }) => {
				expect(sourceId).to.be.a('number');
				expect(segments).to.be.a('array');
				expect(segments.length).to.eql(segmentsCount);
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})

	})

	describe('list tm segments', () => {
		it('should return all translation memory segments', (done) => {
			app.tm.segments(tmId)
			.then( ({ segmentsCount, segments }) => {
				console.log(segmentsCount, segments)
				expect(segmentsCount).to.be.a('number');
				expect(segments).to.be.a('array');
				expect(segments.length).to.eql(segmentsCount);
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
*/