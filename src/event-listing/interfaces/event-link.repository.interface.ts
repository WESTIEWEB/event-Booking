import { EventLink } from '../domains';

export interface IEventLinkRepository {
  save(eventLink: EventLink): Promise<void>;
  saveMany(eventLinks: EventLink[]): Promise<void>;
}
