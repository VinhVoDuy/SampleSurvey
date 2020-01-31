const request = require('supertest');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const { sequelize, Survey } = require('../../models');
let validateMock;

jest.setMock("../../services/survey/validateAnswer.js", () => {
  return validateMock;
});
const { server } = require('../../index');

describe('controllers → survey → submit()', () => {
  let token = jwt.sign({
    isAdmin: true,
  }, keys.jwtPrivateKey);

  const data = {
    userId: 1,
    surveyId: 1,
    answerIds: [1, 2, 3]
  }

  beforeEach(async () => {
    await Survey.destroy({ where: {} });
  });

  afterAll(() => {
    sequelize.close();
  })

  it('should return status 400 when answers are not valid', async () => {
    validateMock = { error: 'Error' };
    const response = await request(server).post('/api/survey/submit').set('X-Auth-Token', token).send(data);
    // console.log(require.cache['/Users/2359media/survey/node-projects/SampleSurvey/services/survey/validateAnswer.js']);
    console.log(response.text);

    expect(response.status).toBe(400);
  });
});