import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { singleton } from 'tsyringe';
import { AuthInputDTO } from "@modules/auth/dto/AuthInputDTO";
import { UserRepository } from '@modules/user/data/UserRepository';
import { AuthOutputDTO } from "@modules/auth/dto/AuthOutputDTO";
import { FindByEmailUserOutputDTO } from '@modules/user/dto/FindByEmailUserrOutputDTO';
import { AccessDeniedException } from '@shared/exceptions';

@singleton()
export class AuthService {
  constructor(private storage: UserRepository) { }

  public async execute(inputDTO: AuthInputDTO): Promise<AuthOutputDTO> {
    const response = await this.storage.findByLogin(inputDTO.email);
    await this.passwordValidation(inputDTO, response)
    const token = await this.createToken(response)

    return token as unknown as AuthOutputDTO;
  }

  private async passwordValidation(inputDTO: AuthInputDTO, userData: FindByEmailUserOutputDTO): Promise<void> {
    const isMatch = await bcrypt.compare(inputDTO.password, userData.password);
    if(!isMatch){
      throw new AccessDeniedException();
    }
  }

  public async createToken(inputDTO: FindByEmailUserOutputDTO): Promise<AuthOutputDTO> {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      { 
        id: inputDTO.id, 
        companyId: inputDTO.companyId,
        name: inputDTO.name, 
        resource: inputDTO.resource,
        position: inputDTO.position,
      }, 
      secret, 
      { expiresIn: '8h' }
    );
 
    return { token: token } as unknown as AuthOutputDTO;
  }
}


// try {
//   // O jwt.verify faz a mágica: abre o token e CHECA a assinatura ao mesmo tempo
//   const decoded = jwt.verify(tokenRecebido, secret);
  
//   // Se chegou aqui, o token é legítimo!
//   // Agora o 'decoded' tem o { id, resource } que você guardou lá no login.
//   request.user = decoded; 
// } catch (err) {
//   // Se alguém alterou o token ou ele expirou, o verify lança um erro
//   throw new UnauthorizedException('Token inválido ou expirado.');
// }