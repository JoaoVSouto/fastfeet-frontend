type StringMap<T> = {
  [P in keyof T]: string;
};
