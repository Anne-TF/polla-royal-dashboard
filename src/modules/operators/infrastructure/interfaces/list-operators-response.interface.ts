import { IAPIResponse, IPagination } from '@common/interfaces';
import { IOperator } from './operator.interface';

export interface IListOperatorsResponse extends IAPIResponse<IOperator[]> {
  pagination: IPagination;
}
