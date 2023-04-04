import { TicketType } from '../constants';
import { EventTicket } from './event-ticket';

describe('EventTicket', () => {
  it('should throw an error if sale start date is in the past', () => {
    expect(() => {
      EventTicket.create({
        eventListingId: 'eventListingId',
        type: TicketType.PAID,
        name: 'name',
        displayName: 'displayName',
        description: 'description',
        price: 1,
        availableQuantity: 1,
        saleStartDate: new Date('2020-01-01'),
        saleEndDate: new Date('2020-01-02'),
      });
    }).toThrowError('Sale start date must be in the future');
  });

  it('should throw an error if sale end date is in the past', () => {
    expect(() => {
      EventTicket.create({
        eventListingId: 'eventListingId',
        type: TicketType.PAID,
        name: 'name',
        displayName: 'displayName',
        description: 'description',
        price: 1,
        availableQuantity: 1,
        saleStartDate: new Date(),
        saleEndDate: new Date('2020-01-02'),
      });
    }).toThrowError('Sale end date must be in the future');
  });

  it('should throw an error if sale start date is after sale end date', () => {
    expect(() => {
      EventTicket.create({
        eventListingId: 'eventListingId',
        type: TicketType.PAID,
        name: 'name',
        displayName: 'displayName',
        description: 'description',
        price: 1,
        availableQuantity: 1,
        saleStartDate: new Date('2030-11-02'),
        saleEndDate: new Date(),
      });
    }).toThrowError('Sale start date must be before sale end date');
  });

  it('should throw an error if price is negative', () => {
    expect(() => {
      EventTicket.create({
        eventListingId: 'eventListingId',
        type: TicketType.PAID,
        name: 'name',
        displayName: 'displayName',
        description: 'description',
        price: -1,
        availableQuantity: 1,
        saleStartDate: new Date(),
        saleEndDate: new Date('2030-11-02'),
      });
    }).toThrowError('Price must be greater than or equal to 0');
  });

  it('should throw an error if available quantity is negative', () => {
    expect(() => {
      EventTicket.create({
        eventListingId: 'eventListingId',
        type: TicketType.PAID,
        name: 'name',
        displayName: 'displayName',
        description: 'description',
        price: 1,
        availableQuantity: -1,
        saleStartDate: new Date(),
        saleEndDate: new Date('2030-11-02'),
      });
    }).toThrowError('Available quantity must be greater than or equal to 0');
  });

  it('should throw an error if type is free and price is greater than 0', () => {
    expect(() => {
      EventTicket.create({
        eventListingId: 'eventListingId',
        type: TicketType.FREE,
        name: 'name',
        displayName: 'displayName',
        description: 'description',
        price: 1,
        availableQuantity: 1,
        saleStartDate: new Date(),
        saleEndDate: new Date('2030-11-02'),
      });
    }).toThrowError('Price must be 0 for free tickets');
  });

  it('should create a new event ticket', () => {
    const eventTicket = EventTicket.create({
      eventListingId: 'eventListingId',
      type: TicketType.PAID,
      name: 'name',
      displayName: 'displayName',
      description: 'description',
      price: 1,
      availableQuantity: 1,
      saleStartDate: new Date(),
      saleEndDate: new Date('2030-11-02'),
    });

    expect(eventTicket).toBeDefined();
  });
});
