import { GetAllEventListingsDto } from 'src/event-listing/dtos';

export class GetAllEventListingsQuery {
  constructor(public readonly options: GetAllEventListingsDto) {}
}
