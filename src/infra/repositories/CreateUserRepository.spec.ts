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

    if (!email || email === '') {
      throw new MissingParamError('email');
    }

    if (!password || password === '') {
      throw new MissingParamError('password');
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

  it('Should throw a new MissingParamErorr if email is not provided', async () => {
    const sut = new CreateUserRepository();
    const promise = sut.execute({
      name: 'any_name',
      email: '',
      password: 'any_password',
    });

    await expect(promise).rejects.toThrow(new MissingParamError('email'));
  });

  it('Shold throw a new MissingParamError if password is not provided', async () => {
    const sut = new CreateUserRepository();
    const promise = sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: '',
    });

    await expect(promise).rejects.toThrow(new MissingParamError('password'));
  });
});
