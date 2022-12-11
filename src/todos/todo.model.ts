export interface Todo {
  id: string;
  name: string;
  done: boolean;
}
export interface TodoAdd extends Omit<Todo, 'id'>{}