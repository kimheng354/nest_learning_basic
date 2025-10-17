import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'database/constants';
import { Pool } from 'pg';

@Injectable()
export class UsersService {
  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) { }

  async findAll() {
    try {
      const result = await this.pool.query('SELECT * FROM customers');
      return result.rows;
    } catch (error) {
      console.error('Error querying customers:', error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      const { name, status } = data;
      const result = await this.pool.query(
        'INSERT INTO customers (name, status) VALUES ($1, $2) RETURNING *',
        [name, status],
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }


  // private users = [
  //   { id: 1, name: 'John', age: 25 },
  //   { id: 2, name: 'Jane', age: 30 },
  // ];

  // findAll() {
  //   return this.users;
  // }

  // findOne(id: number) {
  //   return this.users.find((user) => user.id === id);
  // }

  // create(data: any) {
  //   const newUser = { id: Date.now(), ...data };
  //   this.users.push(newUser);
  //   return newUser;
  // }

  // update(id: number, data: any) {
  //   const index = this.users.findIndex((u) => u.id === id);
  //   if (index === -1) return { message: 'User not found' };
  //   this.users[index] = { ...this.users[index], ...data };
  //   return this.users[index];
  // }

  // remove(id: number) {
  //   this.users = this.users.filter((u) => u.id !== id);
  //   return { message: 'Deleted successfully' };
  // }
}
