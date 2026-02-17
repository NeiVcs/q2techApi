export class FilterQueryDTO<T> {
  readonly page?: number = 1;
  readonly pageSize?: number = 10;
  readonly filters?: T = null;

  constructor(props: { page?: number; pageSize?: number; filters?: T }) {
    this.page = props.page ?? 1;
    this.pageSize = props.pageSize ?? 10;
    this.filters = props.filters ?? null;
  }
}
