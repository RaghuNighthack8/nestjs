import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ){}

    async getAllTodos(): Promise<Todo[]> {
        return this.todoRepository.find();
    }

    async getTodoById(id: number): Promise<Todo> {
        const todo = await this.todoRepository.findOne({ where: { id } }); //passing { where: { id } } to the findOne method, we explicitly specify that we're looking for a Todo where the id matches the provided value. 
        if (!todo) {
          throw new NotFoundException(`Todo with id ${id} not found.`);
        }
        return todo;
      }

    async createTodo(todo: Todo): Promise<Todo> {
        this.todoRepository.save(todo);
        return todo;
    }

    async updateTodoById(id: number, updatedTodo: Todo): Promise<Todo> {
        await this.todoRepository.update(id, updatedTodo);
        return updatedTodo;
    }

    async deleteTodoById(id: number): Promise<Todo> {
        const todo = await this.getTodoById(id);
        if(todo) {
            await this.todoRepository.delete(id);
        }
        return todo;
    }
}
