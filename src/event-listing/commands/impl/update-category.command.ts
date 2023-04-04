import { UpdateCategoryDto } from 'src/event-listing/dtos';

export class UpdateCategoryCommand {
  constructor(
    public readonly id: string,
    public readonly input: UpdateCategoryDto,
  ) {}
}
