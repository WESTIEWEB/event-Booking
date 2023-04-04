import { EventPublisher } from '@nestjs/cqrs';
import { IEventListingReadRepository, IEventTicketRepository } from 'src/event-listing';
import { TicketType } from 'src/event-listing/constants';
import { EventTicket } from 'src/event-listing/domains';
import { CreateEventTicketDto, EventListingDto, EventTicketDto } from 'src/event-listing/dtos';
import { CreateEventTicketCommand } from '../impl';
import { CreateEventTicketHandler } from './create-event-ticket.handler';

const ticketRepository = {
  save: jest.fn(),
} as any as IEventTicketRepository;

const listingRepository = {
  findById: jest.fn(),
} as any as IEventListingReadRepository;

const publisher = {
  mergeObjectContext: jest.fn(),
} as any as EventPublisher;

const eventListing = {
  userId: 'userId',
} as any as EventListingDto;

const eventListingId = 'eventListingId';

const userId = 'userId';

const dto: CreateEventTicketDto = {
  type: TicketType.PAID,
  name: 'vip_ticket_4353',
  displayName: 'Golden Ticket',
  description: 'The best ticket in the house',
  price: 100,
  availableQuantity: 50,
};

const eventTicket = {
  commit: jest.fn(),
} as any as EventTicket;

const eventTicketDto = {} as any as EventTicketDto;

const handler = new CreateEventTicketHandler(
  ticketRepository,
  listingRepository,
  publisher,
);

describe('CreateEventTicketHandler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(EventTicket, 'create').mockReturnValue(eventTicket);
    (<jest.Mock>publisher.mergeObjectContext).mockReturnValue(eventTicket);
    (<jest.Mock>listingRepository.findById).mockResolvedValue(eventListing);
    (<jest.Mock>ticketRepository.save).mockResolvedValue(eventTicketDto);
  });

  it('should throw an error if listing does not exist', async () => {
    (<jest.Mock>listingRepository.findById).mockResolvedValue(null);

    const command = new CreateEventTicketCommand(eventListingId, userId, dto);

    await expect(handler.execute(command)).rejects.toThrowError(new Error(`Event listing with id ${eventListingId} not found`));
  });

  it('shoiuld throw an error if user is not authorized to create ticket', async () => {
    eventListing.userId = 'otherUserId';

    const command = new CreateEventTicketCommand(eventListingId, userId, dto);

    await expect(handler.execute(command)).rejects.toThrowError(new Error('You are not authorized to create a ticket for this event listing'));
  });

  it('should create a new event ticket', async () => {
    eventListing.userId = userId;

    const command = new CreateEventTicketCommand(eventListingId, userId, dto);
    const result = await handler.execute(command);

    expect(listingRepository.findById).toHaveBeenCalledWith(eventListingId);
    expect(EventTicket.create).toHaveBeenCalledWith({
      ...dto,
      eventListingId,
    });
    expect(ticketRepository.save).toHaveBeenCalledWith(eventTicket);
    expect(result).toEqual(eventTicketDto);
  });
});
