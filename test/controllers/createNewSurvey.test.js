const request = require('supertest');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const { sequelize, Survey } = require('../../models');
const { server } = require('../../index');

describe('controllers → survey → createNewSurvey()', () => {
  const token = jwt.sign({
    isAdmin: true,
  }, keys.jwtPrivateKey);

  beforeEach(async () => {
    await Survey.destroy({ where: {} });
  });

  afterAll(() => {
    sequelize.close();
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

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('title');
  });
});