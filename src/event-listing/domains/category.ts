import { DomainObject } from 'src/common';
import { slugify } from '../utils';

export interface CategoryProps {
  name: string;
  parentCategoryId?: string;
  slug?: string;
  description?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category extends DomainObject<CategoryProps> {
  get name(): string {
    return this.props.name;
  }

  get parentCategoryId(): string | undefined {
    return this.props.parentCategoryId;
  }

  get slug(): string {
    return this.props.slug;
  }

  get description(): string {
    return this.props.description;
  }

  get active(): boolean {
    return this.props.active;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public static create(props: CategoryProps, id?: string): Category {
    const now = new Date();
    const category = new Category({
      ...props,
      slug: props.slug ?? slugify(props.name),
      createdAt: props.createdAt ?? now,
      updatedAt: props.updatedAt ?? now,
    }, id);
    return category;
  }

  public update(props: Partial<CategoryProps>): void {
    const now = new Date();
    this.props.name = props.name ?? this.props.name;
    this.props.parentCategoryId = props.parentCategoryId ?? this.props.parentCategoryId;
    this.props.slug = props.slug ?? this.props.slug;
    this.props.description = props.description ?? this.props.description;
    this.props.active = props.active ?? this.props.active;
    this.props.updatedAt = now;
  }
}
