import { GetEventListingsByUserIdDto } from '../../dtos';

export class FindEventListingsByUserIdQuery {
  constructor(public readonly options: GetEventListingsByUserIdDto) {}
}
