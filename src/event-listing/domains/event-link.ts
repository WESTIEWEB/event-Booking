import { DomainObject } from 'src/common';

export interface EventLinkProps {
  eventListingId: string;
  label: string;
  url: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class EventLink extends DomainObject<EventLinkProps> {
  get eventListingId(): string {
    return this.props.eventListingId;
  }

  get label(): string {
    return this.props.label;
  }

  get url(): string {
    return this.props.url;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public static create(props: EventLinkProps, id?: string): EventLink {
    const now = new Date();
    const link = new EventLink({
      ...props,
      createdAt: props.createdAt ?? now,
      updatedAt: props.updatedAt ?? now,
    }, id);

    return link;
  }
}
