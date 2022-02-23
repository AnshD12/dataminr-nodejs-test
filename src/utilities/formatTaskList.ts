import ITaskList from '../interfaces/task-list';

interface IData {
  [key: string]: string;
}

const formatTaskList = (data: IData[]): ITaskList => {
  const title: string = data[0].task_list;
  const temp = data.map((item) => item.task);
  return {
    title,
    tasks: temp,
  };
};

export default formatTaskList;
