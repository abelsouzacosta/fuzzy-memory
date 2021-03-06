import { PrismaClient } from '@prisma/client';
import { MissingParamError } from '@utilErrors/MissingParamError';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

interface IReturn {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default class CreateUserRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async execute({ name, email, password }: ICreateUser): Promise<IReturn> {
    if (!name || name === '') {
      throw new MissingParamError('name');
    }

    if (!email || email === '') {
      throw new MissingParamError('email');
    }

    if (!password || password === '') {
      throw new MissingParamError('password');
    }

    const user = this.client.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }
}
