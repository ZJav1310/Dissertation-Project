type result<T> = {
  status: boolean;
  message: string;
  data?: T[] | T;
};

export default result;
