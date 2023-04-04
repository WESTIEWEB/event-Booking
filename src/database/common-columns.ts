export const timestampColumns = [
  {
    name: 'created_at',
    type: 'timestamp',
    isNullable: false,
    default: 'now()',
  },
  {
    name: 'updated_at',
    type: 'timestamp',
    isNullable: false,
  },
];
