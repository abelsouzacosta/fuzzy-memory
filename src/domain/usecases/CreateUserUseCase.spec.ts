import { MissingParamError } from '@utilErrors/MissingParamError';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

class CreateUserUseCase {
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

describe('CreateUserUseCase', () => {
  it('Should throw an MissingParamError if no name is provided', async () => {
    const sut = new CreateUserUseCase();
    const promise = sut.execute({
      name: '',
      email: 'any_email',
      password: 'any_password',
    });

    expect(promise).rejects.toThrow(new MissingParamError('name'));
  });

  it('Should throw an MissingParamError if no email is provided', async () => {
    const sut = new CreateUserUseCase();
    const promise = sut.execute({
      name: 'any_name',
      email: '',
      password: 'any_password',
    });

    expect(promise).rejects.toThrow(new MissingParamError('email'));
  });

  it('Should throw an MissingParamError if no password is provided', async () => {
    const sut = new CreateUserUseCase();
    const promise = sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: '',
    });

    expect(promise).rejects.toThrow(new MissingParamError('password'));
  });
});
