import * as Joi from 'joi';
import { TicketType } from '../constants';
import { CreateEventTicketDto } from '../dtos';

export const createEventTicketSchema = Joi.object<CreateEventTicketDto>({
  name: Joi.string().required(),
  displayName: Joi.string().required(),
  type: Joi.string().valid(...Object.values(TicketType)).required(),
  price: Joi.number().default(0).required(),
  availableQuantity: Joi.number().default(0).required(),
  description: Joi.string().optional(),
  saleStartDate: Joi.date().required(),
  saleEndDate: Joi.date().required(),
});
