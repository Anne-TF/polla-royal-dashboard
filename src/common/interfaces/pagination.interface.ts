export interface IPagination {
  total: number;
  offset: number;
  limit: number;
  criterias: {
    sort: object | null;
    filter: object | null;
  };
}
