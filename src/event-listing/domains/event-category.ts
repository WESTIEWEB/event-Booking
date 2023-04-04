import { DomainObject } from 'src/common';

export interface EventCategoryProps {
  eventListingId: string;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class EventCategory extends DomainObject<EventCategoryProps> {
  get eventListingId(): string {
    return this.props.eventListingId;
  }

  get categoryId(): string {
    return this.props.categoryId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public static create(props: EventCategoryProps, id?: string): EventCategory {
    const now = new Date();
    return new EventCategory({
      ...props,
      createdAt: props.createdAt ?? now,
      updatedAt: props.updatedAt ?? now,
    }, id);
  }
}
