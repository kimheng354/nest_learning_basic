import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(data: any) {
    const newUser = { id: Date.now(), ...data };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, data: any) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return { message: 'User not found' };
    this.users[index] = { ...this.users[index], ...data };
    return this.users[index];
  }

  remove(id: number) {
    this.users = this.users.filter((u) => u.id !== id);
    return { message: 'Deleted successfully' };
  }
}
