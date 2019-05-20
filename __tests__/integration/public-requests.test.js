import httpRequest from 'supertest';
import App from '../../src/app';
import Category from '../../src/models/Category';
import Question from '../../src/models/Question';
import { connectMongoDBTest, disconnectMongoDBTest } from '../utils/db-utils';
import { generateCategory, generateQuestion, generateUser } from '../utils/mock-data';
import AuthController from '../../src/controllers/AuthController';

describe('Public Requests test suite', () => {
  beforeAll(async () => {
    await connectMongoDBTest();
  });
  afterAll(async () => {
    await disconnectMongoDBTest();
  });
  const user = generateUser();
  it('should create the Questions for find', async () => {
    const cats = await Category.create(generateCategory(10));
    console.log('[cats]', cats);

    const questions = generateQuestion(10);

    questions.forEach((question, index) => {
      question.categories.push(cats[index]);
    });

    const newQuestions = await Question.create(questions);

    expect(cats.length).toBe(10);
    expect(newQuestions.length).toBe(10);
  });

  it('should find All valid questions', async () => {
    const response = await httpRequest(App)
      .get('/questions')
      .send();

    console.log('[questions]', response.body);

    expect(response.body).not.toBeNull();
    expect(response.status).toBe(200);
  });

  it('should find paginate questions', async () => {
    const newUser = await httpRequest(App)
      .post('/auth/create')
      .send(user);
    user.token = newUser.body.token;

    const response = await httpRequest(App)
      .get('/questions/paginate?page=-2&perPage=-5')
      .set('Authorization', `Bearer ${user.token}`)
      .send();

    console.log('[questions]', response.body);

    expect(response.body).not.toBeNull();
    expect(response.body.length).toBe(5);
    expect(response.status).toBe(200);
  });
});
