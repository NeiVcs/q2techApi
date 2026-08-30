import { singleton } from 'tsyringe';
import { RequestUserDeletionInputDTO } from "@modules/user/dto/RequestUserDeletionInputDTO";
import { UserRepository } from "@modules/user/data/UserRepository";
import { AccessDeniedException } from '@shared/exceptions';
import { passwordValidation } from '@shared/helpers/passwordValidation';
import { sendWhatsAppMessage } from '@config/baileys';
import { FindByIdUserOutputDTO } from '../dto/FindByIdUserOutputDTO';
import { RefreshTokenOutputDTO } from '@modules/auth/dto/RefreshTokenOutputDTO';
import jwt from 'jsonwebtoken';

@singleton()
export class RequestUserDeletionService {
  constructor(private storage: UserRepository) { }

  public async execute(inputDTO: RequestUserDeletionInputDTO): Promise<void> {
    const user = await this.storage.findById(inputDTO.userId)

    if (user.id !== inputDTO.userId) {
      throw new AccessDeniedException();
    }

    await passwordValidation({ email: user.email, password: inputDTO.password })

    const deletionToken = await this.genereteToken(user)

    this.sendMessage(user, deletionToken)

    return;
  }

  private async sendMessage(user: FindByIdUserOutputDTO, deletionToken: RefreshTokenOutputDTO): Promise<void> {
    sendWhatsAppMessage({
      number: 55 + user.whatsapp,
      message: `
Ola ${user.name},

Sentimos muito que tenha solicitado a exclusâo da sua conta,

Segue abaixo o link para concluir sua solicitação.

https://escolhaCertaDigital.netlify.app/excluir-conta/${deletionToken}
`,
    });
  }

  private async genereteToken(user: FindByIdUserOutputDTO): Promise<RefreshTokenOutputDTO> {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      {
        id: user.id,
      },
      secret,
      { expiresIn: '30m' }
    );

    return token as unknown as RefreshTokenOutputDTO;
  }
}
