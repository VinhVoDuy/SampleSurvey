const { expect } = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const { Survey } = require('../../models');
const proxyquire = require('proxyquire');



describe('controllers → survey → submit()', () => {
  let server;
  let token;
  const data = {
    userId: 1,
    surveyId: 1,
    answerIds: [1, 2, 3]
  }

  beforeEach(() => {
    // require.cache['/Users/2359media/survey/node-projects/SampleSurvey/services/survey/validateAnswer.js'] = {
    //   exports: stub
    // }

    // delete require.cache['/Users/2359media/survey/node-projects/SampleSurvey/index.js']
    delete require.cache['/Users/2359media/survey/node-projects/SampleSurvey/services/survey/validateAnswer.js'];

    const stub = sinon.stub().resolves({ error: 'Error' });

    require.cache['/Users/2359media/survey/node-projects/SampleSurvey/services/survey/validateAnswer.js'] = {
      exports: stub
    }

    server = require('../../index').server;

  })

  before(async () => {

    // delete require.cache['/Users/2359media/survey/node-projects/SampleSurvey/index.js']
    // delete require.cache['/Users/2359media/survey/node-projects/SampleSurvey/test/controllers/surveySubmit.js']
    // console.log(require.cache['/Users/2359media/survey/node-projects/SampleSurvey/services/survey/validateAnswer.js']);


    token = jwt.sign({
      isAdmin: true,
    }, keys.jwtPrivateKey);

    await Survey.destroy({ where: {} });
  });

  afterEach(async () => {
    await server.close();
  });

  it('should return status 400 when answers are not valid', async () => {

    const response = await request(server).post('/api/survey/submit').set('X-Auth-Token', token).send(data);
    // console.log(require.cache['/Users/2359media/survey/node-projects/SampleSurvey/services/survey/validateAnswer.js']);

    expect(response.status).equal(400);

    console.log(response.text);
  });
});