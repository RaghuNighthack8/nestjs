import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos(): Promise<Todo[]> {
    return this.todoService.getAllTodos();
  }

  @Get(':id')
  async getTodoById(@Param('id') id: number): Promise<Todo> {
    const todo = await this.todoService.getTodoById(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  @Post()
  async createTodo(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.createTodo(todo);
  }

  @Put(':id')
  async updateTodoById(@Param('id') id: number, @Body() updatedTodo: Todo): Promise<Todo> {
    const todo = await this.todoService.updateTodoById(id, updatedTodo);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  @Delete(':id')
  async deleteTodoById(@Param('id') id: number): Promise<Todo> {
    const todo = await this.todoService.deleteTodoById(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }
}
