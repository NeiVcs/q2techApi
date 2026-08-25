import { container } from 'tsyringe';
import bcrypt from 'bcryptjs';
import { AuthInputDTO } from "@modules/auth/dto/AuthInputDTO";
import { UserRepository } from '@modules/user/data/UserRepository';
import { AccessDeniedException } from '@shared/exceptions';

export const passwordValidation = async (userData: AuthInputDTO) => {
  const userRepository = container.resolve(UserRepository);

  const user = await userRepository.findByLogin(userData.email);

  const isMatch = await bcrypt.compare(userData.password, user.password);
  if (!isMatch) {
    throw new AccessDeniedException();
  }
}
