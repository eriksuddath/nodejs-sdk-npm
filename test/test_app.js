const expect = require('Chai').expect;
const App = require('../lib/App');

// get test config
const { consumerKey, organizationId, projectId, base } = require('./test_config');

const app = new App({ consumerKey, organizationId, projectId });

describe('app', () => {

	describe('ping', () => {

		it('should return a status of 200', (done) => {
			app.ping({ fullResponse: true })
			.then( ({ statusCode }) => {
				expect(statusCode).to.eql(200);
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})

	})

	describe('languages', () => {

		it('should return a list of languages', (done) => {
			app.languages({ fullResponse: true })
			.then( ({ body, statusCode }) => {
				const data = JSON.parse(body);

				expect(statusCode).to.eql(200);
				expect(data.languages).to.be.a('array')
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})

	})

	describe('list countries', () => {

		it('should return country list detail', (done) => {
			app.countries()
			.then( ({ countries }) => {
				expect(countries.length).to.gt(0);
        expect(countries).to.be.a('array');
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})

	})

})