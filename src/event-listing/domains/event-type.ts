import { DomainObject } from 'src/common';
import { slugify } from '../utils';

interface EventTypeProps {
  name: string;
  slug?: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class EventType extends DomainObject<EventTypeProps> {
  get name(): string {
    return this.props.name;
  }

  get slug(): string {
    return this.props.slug;
  }

  get active(): boolean {
    return this.props.active;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public static create(props: EventTypeProps, id?: string): EventType {
    const now = new Date();

    const eventType = new EventType({
      ...props,
      slug: props.slug ?? slugify(props.name),
      createdAt: props.createdAt ?? now,
      updatedAt: props.updatedAt ?? now,
    }, id);
    return eventType;
  }
}
