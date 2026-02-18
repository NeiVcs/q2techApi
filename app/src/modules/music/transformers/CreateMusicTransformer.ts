import { singleton } from 'tsyringe';
import { z } from 'zod/v4';
import {FastifyRequest} from 'fastify';
import { validateRequest } from '@shared/validateRequest';
import { CreateMusicBodyRequest, CreateMusicResponse } from '@modules/music/schemas/CreateMusicSchema'
import { CreateMusicInputDTO } from "@modules/music/dto/CreateMusicInputDTO";
import { CreateMusicOutputDTO } from "@modules/music/dto/CreateMusicOutputDTO";


//TODO: Validação opcional usar apenas quando necessário para validações mais complexas.
  
const requestBodySchema = z.object({});

@singleton()
export class CreateMusicTransformer {
  public fromApi(request?: FastifyRequest<{ Body: CreateMusicBodyRequest }>): CreateMusicInputDTO {
    const { body } = request;
    
    validateRequest(requestBodySchema, body); //TODO: Validação opcional usar apenas quando necessário para validações mais complexas.

    return {
       name: body?.name || '',
       category: body?.category || '',
       artist: body?.artist || '',
       gender: body?.gender || '',
       link: body?.link || '',
    };
  }

  public toApi(outputDTO: CreateMusicOutputDTO): CreateMusicResponse {
    return {
      id: outputDTO?.id ?? '',
    };
  }
}