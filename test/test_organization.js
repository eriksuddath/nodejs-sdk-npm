const expect = require('Chai').expect;
const App = require('../lib/App');

// get test config
const { consumerKey, organizationId, projectId, base } = require('./test_config');

const app = new App({ consumerKey, organizationId, projectId });

describe('organization', () => {

	describe('list team', () => {

		it('should return a list of team members in the organization', (done) => {
			app.organization.team()
			.then( ({ team, memberCount }) => {
				expect(team).to.be.a('array');
        expect(team.length).to.gt(0);
        expect(memberCount).to.be.a('number');
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})

		it('should return full response', (done) => {
			app.organization.team({ fullResponse: true })
			.then( ({ statusCode }) => {
	      expect(statusCode).to.eql(200);
				done()
			})
			.catch( (err) => {
				expect(err).to.not.exist
				done()
			})
		})

	})

})