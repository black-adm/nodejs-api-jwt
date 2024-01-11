import { IController, IRequest, IResponse } from '../interfaces/controller';
import { randomUUID } from 'crypto';

export class ListLeadsController implements IController {
  async handle(request: IRequest): Promise<IResponse> {
    console.log(request);

    return {
      statusCode: 200,
      body: {
        leads: [
          { id: randomUUID(), name: 'Lucas' },
          { id: randomUUID(), name: 'Alice' },
          { id: randomUUID(), name: 'Vitoria' },
          { id: randomUUID(), name: 'Guilherme' },
          { id: randomUUID(), name: 'Maitê' },
        ]
      },
    };
  }
}
