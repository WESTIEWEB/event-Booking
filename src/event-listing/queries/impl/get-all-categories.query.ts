import { GetAllCategoriesDto } from 'src/event-listing/dtos';

export class GetAllCategoriesQuery {
  constructor(public readonly options: GetAllCategoriesDto) {}
}
