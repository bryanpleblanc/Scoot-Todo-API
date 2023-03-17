export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
}

export interface TodoList {
  todos: Todo[];
}
