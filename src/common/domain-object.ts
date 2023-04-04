import { InternalServerErrorException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { v4 } from 'uuid';

export class DomainObject<T> extends AggregateRoot {
  public readonly id: string;

  protected readonly props: T;

  constructor(props: T, id?: string) {
    super();
    if (!props) {
      throw new InternalServerErrorException(`Invalid parameters while creating ${this.constructor.name}`);
    }

    this.id = id || v4();
    this.props = props;
  }
}
