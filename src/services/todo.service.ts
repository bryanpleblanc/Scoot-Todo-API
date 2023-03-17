import { HttpException } from '@exceptions/HttpException';
import { Todo, TodoList } from '@interfaces/todo.interface';
import fs from 'fs';
import path from 'path';

const filePath = '../../data/todos.json';
const pathToFile = path.resolve(__dirname, filePath);
class TodoService {
  public async findAllTodo(): Promise<TodoList> {
    try {
      const data = await fs.promises.readFile(pathToFile);
      const todoData = JSON.parse(data.toString());
      return todoData;
    } catch (e) {
      throw new HttpException(400, 'file not found');
    }
  }

  public async findTodoByQuery(query?: string): Promise<TodoList> {
    try {
      const data = await fs.promises.readFile(pathToFile);
      const todoData = JSON.parse(data.toString());

      console.log(query);
      const filtered: Todo[] = todoData.todos.filter(todo => {
        return todo.title.includes(query) || todo.description.includes(query) || todo.priority.includes(query);
      });

      return { todos: filtered };
    } catch (e) {
      console.log(e);
      throw new HttpException(400, 'file not found');
    }
  }

  public async createTodo(todoData: Todo): Promise<void> {
    const todo = todoData;
    if (!todo.id || !todo.title || !todo.description || !todo.dueDate || !todo.priority) {
      throw new HttpException(400, 'todo is missing fields');
    }
    const data = await fs.promises.readFile(pathToFile);
    const todoFileData = JSON.parse(data.toString());
    console.log(todoFileData);
    todoFileData.todos.push(todo);
    fs.writeFileSync(pathToFile, JSON.stringify(todoFileData));
  }

  public async deleteTodo(todoId: string): Promise<void> {
    const data = await fs.promises.readFile(pathToFile);
    const todoFileData = JSON.parse(data.toString());
    const index = todoFileData.todos.findIndex(todo => todo.id === todoId);

    if (index === -1) {
      throw new HttpException(409, "Todo doesn't exist");
    }
    todoFileData.todos.splice(index, 1);
    fs.writeFileSync(pathToFile, JSON.stringify(todoFileData));
  }
}

export default TodoService;
