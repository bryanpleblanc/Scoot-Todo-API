import { HttpException } from '@exceptions/HttpException';
import { Todo } from '@interfaces/todo.interface';
import fs from 'fs';

class TodoService {
  public async findAllTodo(): Promise<Todo[]> {
    const todos: Todo[] = JSON.parse(fs.readFileSync('./todos.json', 'utf8'));
    return todos;
  }

  public async createTodo(todoData: Todo): Promise<void> {
    const todo = todoData;
    if (!todo.id || !todo.title || !todo.description || !todo.dueDate || !todo.priority) {
      throw new HttpException(400, 'todo is missing fields');
    }
    const data = JSON.parse(fs.readFileSync('./todos.json', 'utf8'));
    data.todos.push(todo);
    fs.writeFileSync('./todos.json', JSON.stringify(data, null, 2));
  }

  public async deleteTodo(todoId: number): Promise<void> {
    const id = todoId;
    const data = JSON.parse(fs.readFileSync('./todos.json', 'utf8'));
    const index = data.todos.findIndex((t: Todo) => t.id === id);
    if (index === -1) {
      throw new HttpException(409, "Todo doesn't exist");
    }
    data.todos.splice(index, 1);
    fs.writeFileSync('./todos.json', JSON.stringify(data, null, 2));
  }
}

export default TodoService;
