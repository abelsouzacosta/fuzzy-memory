import client from '@client/client';
import { MissingParamError } from '@presentationErrors/MissingParamError';
import CreateUserRepository from './CreateUserRepository';

const makeSut = () => {
  const sut = new CreateUserRepository(client);

  return sut;
};

describe('CreateUserRepository', () => {
  beforeAll(async () => {
    await client.user.deleteMany();
  });

  it('Should throw a new MissingParamError if name is not provided', async () => {
    const sut = makeSut();
    const promise = sut.execute({
      name: '',
      email: 'any_email',
      password: 'any_password',
    });

    await expect(promise).rejects.toThrow(new MissingParamError('name'));
  });

  it('Should throw a new MissingParamErorr if email is not provided', async () => {
    const sut = makeSut();
    const promise = sut.execute({
      name: 'any_name',
      email: '',
      password: 'any_password',
    });

    await expect(promise).rejects.toThrow(new MissingParamError('email'));
  });

  it('Shold throw a new MissingParamError if password is not provided', async () => {
    const sut = makeSut();
    const promise = sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: '',
    });

    await expect(promise).rejects.toThrow(new MissingParamError('password'));
  });

  it('Should create an user instance with given params', async () => {
    const sut = makeSut();
    const user = sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    await expect(user).resolves.toEqual({
      id: (await user).id,
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });
  });
});
