const { expect } = require('chai');
const sinon = require('sinon');
const { Answer } = require('../../models');
const validateAndPopulateAnswers = require('../../services/survey/validateAnswer')

describe('services → validateAndPopulateAnswers()', function () {
  let stub;

  beforeEach(function () {
    stub = sinon.stub(Answer, "findAll");
  });

  afterEach(function () {
    stub.restore();
  })

  it('return error message when there is answers from same question', async function () {
    const answerIds = [1, 2, 3];
    const returnValue = [
      {
        id: 1,
        description: 'a',
        questionId: 1
      },
      {
        id: 2,
        description: 'b',
        questionId: 1
      },
      {
        id: 3,
        description: 'c',
        questionId: 33
      },
    ];

    stub.resolves(returnValue);

    const result = await validateAndPopulateAnswers(answerIds, null);

    stub.restore();

    expect(stub.called).to.be.true;
    expect(result).to.have.property('error');
  });

  it('return the populated answers from database call when all answers are valid', async function () {
    const answerIds = [1, 2, 3];
    const returnValue = [
      {
        id: 1,
        description: 'a',
        questionId: 11
      },
      {
        id: 2,
        description: 'b',
        questionId: 22
      },
      {
        id: 3,
        description: 'c',
        questionId: 33
      },
    ];

    stub.resolves(returnValue);

    const result = await validateAndPopulateAnswers(answerIds, null);

    expect(result).to.equal(returnValue);
  });
});
