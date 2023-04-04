import { PaginatedDto } from 'src/common/dtos';
import { EventListingDto, GetAllEventListingsDto, GetEventListingsByUserIdDto } from '../dtos';

export interface IEventListingReadRepository {
  getAll(options: GetAllEventListingsDto): Promise<PaginatedDto<EventListingDto>>;
  findByUserId(options: GetEventListingsByUserIdDto): Promise<PaginatedDto<EventListingDto>>;
  findById(id: string): Promise<EventListingDto>;
  findBySlug(slug: string): Promise<EventListingDto>;
  findOne(id:string, userId: string): Promise<EventListingDto>;
}
