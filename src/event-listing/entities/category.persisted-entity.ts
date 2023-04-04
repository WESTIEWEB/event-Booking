import { AbstractPersistedEntity } from 'src/common';
import { Column, Entity, OneToMany } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { EventCategoryPersistedEntity } from './event-category.persisted-entity';

@Entity({ name: 'categories' })
export class CategoryPersistedEntity extends AbstractPersistedEntity {
  @OneToMany(() => EventCategoryPersistedEntity, (item) => item.category)
  eventCategories?: EventCategoryPersistedEntity[];

  @Column({ name: 'parent_category_id', nullable: true })
  parentCategoryId?: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'slug' })
  slug: string;

  @Column({ name: 'description', nullable: true })
  description?: string;

  @Column({ name: 'active', default: true })
  active: boolean;
}
