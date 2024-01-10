import { AccountAlreadyExistsError } from '../errors/account-already-exists-error';
import { prisma } from '../libs/prisma-client';

interface InputData {
  name: string;
  email: string;
  password: string;
}

type OutputData = void

export class SignUpUseCase {
  async execute({ name, email, password }: InputData): Promise<OutputData> {

    const accountAlreadyExists = await prisma.account.findUnique({
      where: { email },
    });

    if (accountAlreadyExists) throw new AccountAlreadyExistsError();

    await prisma.account.create({
      data: {
        name,
        email,
        password
      }
    });
  }
}
