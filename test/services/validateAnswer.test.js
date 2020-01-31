const { Answer } = require('../../models');
const validateAndPopulateAnswers = require('../../services/survey/validateAnswer')

describe('services → validateAndPopulateAnswers()', () => {
  afterEach(() => {
    jest.resetAllMocks();
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

    const getAll = jest.spyOn(Answer, 'findAll');
    getAll.mockImplementationOnce(() => returnValue);

    const result = await validateAndPopulateAnswers(answerIds, null);

    expect(result).toHaveProperty('error');
    expect(getAll).toBeCalledTimes(1);
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

    const getAll = jest.spyOn(Answer, 'findAll');
    getAll.mockImplementationOnce(() => returnValue);

    const result = await validateAndPopulateAnswers(answerIds, null);

    expect(result).toEqual(returnValue);
    expect(getAll).toBeCalledTimes(1);
  });
});
