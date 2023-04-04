import { AbstractPersistedEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'event_types' })
export class EventTypePersistedEntity extends AbstractPersistedEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'slug', nullable: false })
  slug: string;

  @Column({ name: 'active', nullable: false })
  active: boolean;
}
