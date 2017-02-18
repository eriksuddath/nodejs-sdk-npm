const expect = require('Chai').expect;
const App = require('../lib/App').default;

// get test config
const { consumerKey, organizationId, projectId, base } = require('./test_config');

const app = new App({ consumerKey, organizationId, projectId });

describe('project', () => {

	describe('list projects', () => {

		it('should return detailed organization project list', (done) => {
			app.project.list()
			.then( ({ projectCount, projects }) => {
        expect(projectCount).to.be.a('number');
        expect(projects).to.be.a('array');
        expect(projects.length).to.gt(0);
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})

		it('should accept custom limit', (done) => {
			app.project.list({ limit: 1 })
			.then( ({ projectCount, projects }) => {
	      expect(projects).to.be.a('array');
	      expect(projects.length).to.eql(1);
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})

		it('should accept custom search', (done) => {
			app.project.list({ search: 'i18next-plug-test-radim' })
			.then( ({ projectCount, projects }) => {
	      expect(projectCount).to.eql(1);
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})

		it('should return full response', (done) => {
			app.project.list({ fullResponse: true })
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

	describe('show project detail', () => {

		it('should return detailed information about a project', (done) => {
			app.project.detail()
			.then( ({ creatorId, creator, targetLanguages }) => {
        expect(creatorId).to.be.a('number');
        expect(creator).to.be.a('string');
        expect(targetLanguages).to.be.a('array');
        expect(targetLanguages.length).to.gt(0);
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})

		it('should return full response', (done) => {
			app.project.detail({ fullResponse: true })
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

	describe('show project status', () => {
		it('should the status of all projects', (done) => {
			app.project.status()
			.then( ({ languages }) => {
	      expect(languages).to.be.a('array');
				done()
			})
			.catch(err => {
				expect(err).to.not.exist
				done()
			})
		})

		it('should return full response', (done) => {
			app.project.status({ fullResponse: true })
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

	describe('show project workflow', () => {
		it('should return the milestone information, status, and language for a project', (done) => {
			app.project.workflow()
			.then( ({ milestones }) => {
	      expect(milestones).to.be.a('array');
				done()
			})
			.catch( (err) => {
				console.log(err);
				expect(err).to.not.exist
				done()
			})
		})

		it('should return full response', (done) => {
			app.project.status({ fullResponse: true })
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

	describe('return project milestones', () => {
		it('should return the milestone information, status, and language for a project', (done) => {
			app.project.milestones()
			.then( (milestones) => {
	      expect(milestones).to.be.a('array');
				done()
			})
			.catch( (err) => {
				console.log(err);
				expect(err).to.not.exist
				done()
			})
		})

	})
})