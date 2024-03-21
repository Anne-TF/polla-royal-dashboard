export interface IAPIResponse<D = any> {
  folio: string;
  isArray: boolean;
  isCached: boolean;
  data: D
}
