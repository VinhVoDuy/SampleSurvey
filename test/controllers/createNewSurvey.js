const { expect } = require('chai');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const { Survey } = require('../../models');

describe('controllers → survey → createNewSurvey()', () => {
  let server;
  let token;

  before(async () => {
    server = require('../../index').server;
    token = jwt.sign({
      isAdmin: true,
    }, keys.jwtPrivateKey);

    await Survey.destroy({ where: {} });
  });

  after(async () => {
    await server.close();
  })

  it('should return status 200 with survey object', async () => {
    const data = {
      title: 'You are my sunshine',
      startTime: Date.now(),
      endTime: Date.now(),
      questions: [
        {
          description: 'This is a description',
          answers: [
            { description: 'First answer', score: 1 },
            { description: 'Second answer', score: 2 },
          ]
        }
      ]
    }

    const response = await request(server)
      .post('/api/survey')
      .set('X-Auth-Token', token)
      .send(data);

    expect(response.status).equal(200);
    expect(response.body).to.have.property('title');
  });
});