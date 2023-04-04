import {
  Body, Controller, Get, Inject, Param, Post, Req, UseGuards, Put, Query, Delete,
} from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';
import { AuthenticatedGuard, UserGuard } from 'src/authentication/guards';
import { JoiValidationPipe } from 'src/common';
import { BaseController } from 'src/common/controllers';
import { EventListingStatus } from '../constants';
import { CreateEventListingDto, CreateEventTicketDto, UpdateEventDto } from '../dtos';
import { EventListingProviders } from '../event-listing.providers';
import { IEventListingService, IEventTicketService } from '../interfaces';
import { createEventTicketSchema } from '../request-schemas';

@Controller('event-listings')
export class EventListingController extends BaseController {
  constructor(
    @Inject(EventListingProviders.EventListingService)
    private readonly service: IEventListingService,
    @Inject(EventListingProviders.EventTicketService)
    private readonly ticketService: IEventTicketService,
  ) {
    super();
  }

  @Get()
  async getAllEventListings(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('userId') userId: string,
    @Query('eventTypeId') eventTypeId: string,
    @Query('status') status: EventListingStatus = EventListingStatus.PUBLISHED,
  ) {
    const listings = await this.service.getAll({
      limit,
      offset,
      userId,
      eventTypeId,
      status,
    });
    return this.success({ ...listings });
  }

  @Get(':id')
  async getEventListing(
    @Param('id') id: string,
  ) {
    const listing = await this.service.findById(id);
    return this.success({ listing });
  }

  @Get('slugs/:slug')
  async getEventListingBySlug(
    @Param('slug') slug: string,
  ) {
    const listing = await this.service.findBySlug(slug);
    return this.success({ listing });
  }

  @Post()
  @UseGuards(AuthenticatedGuard, UserGuard)
  async createEventListing(
    @Req() request: Request,
    @Body() input: CreateEventListingDto,
  ) {
    const listing = await this.service.create({
      ...input,
      userId: request.user.id,
    });
    return this.success({ listing });
  }

  @Post(':id/event-tickets')
  @UseGuards(AuthenticatedGuard, UserGuard)
  async createEventTicket(
    @Req() req: Request,
    @Param('id') eventListingId: string,
    @Body(new JoiValidationPipe(createEventTicketSchema)) ticket: CreateEventTicketDto,
  ) {
    const eventTicket = await this.ticketService.create(eventListingId, req.user.id, ticket);
    return this.success({ eventTicket });
  }

  @Get(':id/event-tickets')
  async getEventTickets(
    @Param('id') eventListingId: string,
  ) {
    const eventTickets = await this.ticketService.findByEventListingId(eventListingId);
    return this.success({ eventTickets });
  }

  @Put(':id')
  @UseGuards(AuthenticatedGuard, UserGuard)
  async updateEventListing(
    @Param('id') id: string,
    @Body() event: UpdateEventDto,
  ) {
    const listing = await this.service.update(id, event);
    return this.success({ listing });
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard, UserGuard)
  async deleteEventListing(
    @Req() request: Request,
    @Param('id') id: string,
  ) {
    const userId = request.user.id;
    await this.service.delete(id, userId);
    return this.success({
      message: 'Event listing deleted successfully',
    });
  }
}
