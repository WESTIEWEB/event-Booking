import { PaginatedDto } from 'src/common/dtos';
import {
  CreateEventListingDto,
  EventListingDto,
  GetAllEventListingsDto,
  GetEventListingsByUserIdDto,
  UpdateEventDto,
} from '../dtos';

export interface IEventListingService {
  getAll(options: GetAllEventListingsDto): Promise<PaginatedDto<EventListingDto>>;
  findById(id: string): Promise<EventListingDto>;
  findByUserId(options: GetEventListingsByUserIdDto): Promise<PaginatedDto<EventListingDto>>;
  create(input: CreateEventListingDto): Promise<EventListingDto>;
  findBySlug(slug: string): Promise<EventListingDto>;
  update(id: string, input: UpdateEventDto): Promise<EventListingDto>;
  delete(id: string, userId: string): Promise<void>;
}
