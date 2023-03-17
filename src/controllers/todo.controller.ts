import { Controller, Param, Body, Get, Post, Delete, HttpCode } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Todo, TodoList } from '@interfaces/todo.interface';
import TodoService from '@services/todo.service';

@Controller()
export class TodosController {
  public todoService = new TodoService();

  @Get('/todos')
  @OpenAPI({ summary: 'Return a list of todos' })
  async getTodos() {
    const findAllTodosData: TodoList = await this.todoService.findAllTodo();
    return { data: findAllTodosData, message: 'findAll' };
  }

  @Get('/todos/query/:query')
  @OpenAPI({ summary: 'Return a list of todos' })
  async getTodosByQuery(@Param('query') query: string) {
    const todosData: TodoList = await this.todoService.findTodoByQuery(query);
    return { data: todosData, message: 'findAll' };
  }

  @Post('/todos')
  @HttpCode(201)
  @OpenAPI({ summary: 'Create a new todo' })
  async createTodo(@Body() todoData: Todo) {
    await this.todoService.createTodo(todoData);
    return { message: 'created' };
  }

  @Delete('/todos/:id')
  @OpenAPI({ summary: 'Delete a todo' })
  async deleteTodo(@Param('id') id: string) {
    await this.todoService.deleteTodo(id);
    return { message: 'deleted' };
  }
}
