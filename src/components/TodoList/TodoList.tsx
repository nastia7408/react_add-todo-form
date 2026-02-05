import React from 'react';
import { Todoes } from '../../types/Todos';
import { TodoInfo } from '../TodoInfo';
import { User } from '../../types/User';

interface Props {
  todos: Todoes[];
  users: User[];
}

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} users={users} />
      ))}
    </section>
  );
};
