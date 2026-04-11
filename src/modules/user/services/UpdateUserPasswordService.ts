import { singleton } from 'tsyringe';
import bcrypt from 'bcryptjs';
import { UpdateUserPasswordInputDTO } from "@modules/user/dto/UpdateUserPasswordInputDTO";
import { UserRepository } from "@modules/user/data/UserRepository";
import { UnauthorizedException } from '@shared/exceptions';

@singleton()
export class UpdateUserPasswordService {
  constructor(private storage: UserRepository) { }

  public async execute(inputDTO: UpdateUserPasswordInputDTO): Promise<void> {
    const user = await this.storage.findByLogin(inputDTO.email);
    if (!user || inputDTO.code !== user.taxId) {
      throw new UnauthorizedException();
    }

    const hash = await bcrypt.hash(inputDTO.newPassword, 10);
    await this.storage.update({ id: user.id, password: hash });
    return;
  }
}
