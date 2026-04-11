import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { RefreshTokenBodyRequest, RefreshTokenResponse } from '@modules/auth/schemas/RefreshTokenSchema'
import { RefreshTokenTransformer } from '@modules/auth/transformers/RefreshTokenTransformer';
import { RefreshTokenService } from '@modules/auth/services/RefreshTokenService';

@singleton()
export class RefreshTokenController {
  constructor(
    private readonly transformer: RefreshTokenTransformer,
    private readonly service: RefreshTokenService
  ) {}

  handler = async (request: FastifyRequest<{ Body: RefreshTokenBodyRequest }>, reply: FastifyReply): Promise<RefreshTokenResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }  
}
