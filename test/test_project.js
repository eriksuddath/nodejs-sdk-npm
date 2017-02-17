const expect = require('Chai').expect;
const App = require('../lib/App').default;

// get test config
const { consumerKey, organizationId, projectId, base } = require('./test_config');

const app = new App({ consumerKey, organizationId, projectId });

xdescribe('project', () => {

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

	})

	describe('show project detail', () => {
		// Can overide projectId with options
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

	})

		describe('show project status', () => {
			it('should return the status of all projects, or projects filtered by a target language', (done) => {
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

		})

		describe('show project workflow', () => {
			it('should return the milestone information, status, and language for a project', (done) => {
				app.project.workflow()
				.then( ({ milestones }) => {
	        expect(milestones).to.be.a('array');
					done()
				})
				.catch(err => {
					console.log(err);
					expect(err).to.not.exist
					done()
				})
			})

		})

})