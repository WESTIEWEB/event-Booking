import { CreateCategoryInputDto } from 'src/event-listing/dtos';

export class CreateCategoryCommand {
  constructor(public input: CreateCategoryInputDto) {}
}
