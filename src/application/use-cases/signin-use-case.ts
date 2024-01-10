import { prisma } from '../libs/prisma-client';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { environment } from '../config/env';

interface InputData {
  email: string;
  password: string;
}

interface OutputData {
  accessToken: string;
}

export class SignUpUseCase {
  async execute({ email, password }: InputData): Promise<OutputData> {

    const account = await prisma.account.findUnique({
      where: { email },
    });

    if (!account) throw new InvalidCredentialsError();

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) throw new InvalidCredentialsError();

    const accessToken = sign(
      { sub: account.id },
      environment.jwtSecret,
      { expiresIn: '1d' }
    );
    return { accessToken };
  }
}
