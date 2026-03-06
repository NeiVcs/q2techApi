import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { AuthBodyRequest, AuthResponse } from '@modules/auth/schemas/AuthSchema'
import { AuthTransformer } from '@modules/auth/transformers/AuthTransformer';
import { AuthService } from '@modules/auth/services/AuthService';

@singleton()
export class AuthController {
  constructor(
    private readonly transformer: AuthTransformer,
    private readonly service: AuthService
  ) {}

  handler = async (request: FastifyRequest<{ Body: AuthBodyRequest }>, reply: FastifyReply): Promise<AuthResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }  
}
