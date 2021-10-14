import { PrismaClient } from '@prisma/client';
import { MissingParamError } from '@utilErrors/MissingParamError';

interface IFindUser {
  email: string;
}

interface IReturn {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default class FindUserByEmailService {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async execute({ email }: IFindUser): Promise<IReturn | null> {
    if (!email || email === '') {
      throw new MissingParamError('email');
    }

    const user = await this.client.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
}
