import {
  Body,
  Controller, Get, Inject, Post, Query,
} from '@nestjs/common';
import { BaseController } from 'src/common/controllers';
import { CreateEventTypeDto } from '../dtos';
import { EventListingProviders } from '../event-listing.providers';
import { IEventTypeService } from '../interfaces';

@Controller('event-types')
export class EventTypeController extends BaseController {
  constructor(
    @Inject(EventListingProviders.EventTypeService)
    private readonly service: IEventTypeService,
  ) {
    super();
  }

  @Get()
  async getAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('active') active: boolean,
  ) {
    const eventTypes = await this.service.getAll({
      limit,
      offset,
      active,
    });

    return this.success({ ...eventTypes });
  }

  @Post()
  async create(
    @Body() input: CreateEventTypeDto,
  ) {
    const eventType = await this.service.create(input);

    return this.success({
      eventType,
    });
  }
}
