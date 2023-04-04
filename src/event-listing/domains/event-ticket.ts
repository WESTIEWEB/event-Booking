import { UnprocessableEntityException } from '@nestjs/common';
import { DomainObject } from 'src/common';
import { EventTicketCreatedAggregateEvent } from 'src/event-listing/domains/events/impl';
import { TicketType } from '../constants';

export interface EventTicketProps {
  eventListingId: string;
  type: TicketType;
  name: string;
  displayName: string;
  description?: string;
  price?: number;
  availableQuantity?: number;
  saleStartDate?: Date;
  saleEndDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class EventTicket extends DomainObject<EventTicketProps> {
  public get eventListingId(): string {
    return this.props.eventListingId;
  }

  public get type(): TicketType {
    return this.props.type;
  }

  public get name(): string {
    return this.props.name;
  }

  public get displayName(): string {
    return this.props.displayName;
  }

  public get description(): string | undefined {
    return this.props.description;
  }

  public get price(): number {
    return this.props.price;
  }

  public get availableQuantity(): number {
    return this.props.availableQuantity;
  }

  public get saleStartDate(): Date | undefined {
    return this.props.saleStartDate;
  }

  public get saleEndDate(): Date | undefined {
    return this.props.saleEndDate;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private validate(): void {
    const now = new Date();

    if (this.props.saleStartDate && this.props.saleStartDate < now) {
      throw new UnprocessableEntityException('Sale start date must be in the future');
    }

    if (this.props.saleEndDate && this.props.saleEndDate < now) {
      throw new UnprocessableEntityException('Sale end date must be in the future');
    }

    if (this.props.saleStartDate && this.props.saleEndDate && this.props.saleStartDate > this.props.saleEndDate) {
      throw new UnprocessableEntityException('Sale start date must be before sale end date');
    }

    if (this.props.price < 0) {
      throw new UnprocessableEntityException('Price must be greater than or equal to 0');
    }

    if (this.props.availableQuantity < 0) {
      throw new UnprocessableEntityException('Available quantity must be greater than or equal to 0');
    }

    if (this.props.type === TicketType.FREE && this.props.price > 0) {
      throw new UnprocessableEntityException('Price must be 0 for free tickets');
    }
  }

  public static create(props: EventTicketProps, id?: string): EventTicket {
    const now = new Date();
    const isNew = !id;

    const ticket = new EventTicket({
      ...props,
      price: props.price || 0,
      availableQuantity: props.availableQuantity || 0,
      createdAt: props.createdAt || now,
      updatedAt: props.updatedAt || now,
    }, id);

    ticket.validate();

    if (isNew) {
      ticket.apply(new EventTicketCreatedAggregateEvent(ticket));
    }

    return ticket;
  }
}
