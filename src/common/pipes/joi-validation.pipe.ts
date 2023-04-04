import {
  PipeTransform,
  ArgumentMetadata,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, _: ArgumentMetadata) {
    const { error, value: transformed } = this.schema.validate(value);
    if (error) {
      throw new UnprocessableEntityException({
        message: error.message,
        data: error.details[0],
      });
    }

    return transformed;
  }
}
