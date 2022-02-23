import ITaskList from './task-list';

interface IQueryResponse {
  rowCount?: number;
  data: ITaskList | ITaskList[]
}

export default IQueryResponse;
