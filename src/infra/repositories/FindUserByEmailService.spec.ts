import client from '@client/client';
import { MissingParamError } from '@utilErrors/MissingParamError';
import CreateUserRepository from './CreateUserRepository';
import FindUserByEmailService from './FindUserByEmailService';

const makeSut = () => {
  const sut = new FindUserByEmailService(client);

  return sut;
};

describe('FindUserByEmailService', () => {
  beforeEach(async () => {
    await client.user.deleteMany();
  });

  it('Should throw a new MissingParamError if an email is not provided', async () => {
    const sut = makeSut();
    const promise = sut.execute({
      email: '',
    });

    await expect(promise).rejects.toThrow(new MissingParamError('email'));
  });

  it('Should return an user when given a valid email', async () => {
    const sut = makeSut();
    const create = new CreateUserRepository(client);
    const user = await create.execute({
      name: 'any_name',
      email: 'valid@email.com',
      password: 'any_password',
    });

    await expect(
      sut.execute({
        email: 'valid@email.com',
      }),
    ).resolves.toEqual({
      id: user.id,
      name: 'any_name',
      email: 'valid@email.com',
      password: 'any_password',
    });
  });

  it('Should return null or undefined if user is not found', async () => {
    const sut = makeSut();
    const create = new CreateUserRepository(client);
    await create.execute({
      name: 'any_name',
      email: 'valid@email.com',
      password: 'any_password',
    });

    const promise = sut.execute({
      email: 'invalid@email.com',
    });

    expect(promise).resolves.toEqual(null);
  });
});
