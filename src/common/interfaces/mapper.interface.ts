import { DomainObject } from '../domain-object';
import { AbstractPersistedEntity } from '../entities';

export interface IMapper<D extends DomainObject<any>, E extends AbstractPersistedEntity, T = any> {
  toDto(domain: D): T;
  toDtoFromPersistence(entity: E): T;
  toDomain?(entity: E): D;
  toDomainFromDto?(dto: T): D;
  toEntity?(domain: D): E;
}
