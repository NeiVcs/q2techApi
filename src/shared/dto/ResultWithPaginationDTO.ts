import { PaginationDTO } from '@shared/dto/PaginationDTO';

export interface ResultWithPaginationDTO<T> {
  pagination: PaginationDTO;
  items: T[];
}
