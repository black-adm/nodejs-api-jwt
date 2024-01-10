import { AccountAlreadyExistsError } from '../errors/account-already-exists-error';
import { prisma } from '../libs/prisma-client';
import { hash } from 'bcryptjs';

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

    const hashedPassword = await hash(password, 12);

    if (accountAlreadyExists) throw new AccountAlreadyExistsError();

    await prisma.account.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
  }
}
