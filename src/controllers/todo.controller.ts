import { Controller, Param, Body, Get, Post, Delete, HttpCode, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { CreateTodoDto } from '@dtos/todo.dto';
import { Todo } from '@interfaces/todo.interface';
import TodoService from '@services/todo.service';
import { validationMiddleware } from '@middlewares/validation.middleware';

@Controller()
export class TodosController {
  public todoService = new TodoService();

  @Get('/todos')
  @OpenAPI({ summary: 'Return a list of todos' })
  async getTodos() {
    console.log('entry');
    const findAllTodosData: Todo[] = await this.todoService.findAllTodo();
    console.log('TEST', findAllTodosData);
    return { data: findAllTodosData, message: 'findAll' };
  }

  @Post('/todos')
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateTodoDto, 'body'))
  @OpenAPI({ summary: 'Create a new todo' })
  async createTodo(@Body() todoData: Todo) {
    await this.todoService.createTodo(todoData);
    return { message: 'created' };
  }

  @Delete('/todos/:id')
  @OpenAPI({ summary: 'Delete a todo' })
  async deleteTodo(@Param('id') todoId: number) {
    await this.todoService.deleteTodo(todoId);
    return { message: 'deleted' };
  }
}
