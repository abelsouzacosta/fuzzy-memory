import { MissingParamError } from '../../presentation/errors/MissingParamError';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

class CreateUserRepository {
  async execute({ name, email, password }: ICreateUser) {
    if (!name || name === '') {
      throw new MissingParamError('name');
    }
  }
}

describe('CreateUserRepository', () => {
  it('Should throw a new MissingParamError if name is not provided', async () => {
    const sut = new CreateUserRepository();
    const promise = sut.execute({
      name: '',
      email: 'any_email',
      password: 'any_password',
    });

    await expect(promise).rejects.toThrow(new MissingParamError('name'));
  });
});
