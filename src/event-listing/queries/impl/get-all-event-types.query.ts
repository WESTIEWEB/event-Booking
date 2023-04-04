import { GetAllEventTypesQueryDto } from 'src/event-listing/dtos';

export class GetAllEventTypesQuery {
  constructor(public readonly options: GetAllEventTypesQueryDto) {}
}
