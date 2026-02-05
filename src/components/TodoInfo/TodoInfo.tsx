import React from 'react';
import { Todoes } from '../../types/Todos';
import { UserInfo } from '../UserInfo';
import { User } from '../../types/User';

interface Props {
  todo: Todoes & { user?: User };
  users?: User[];
}

export const TodoInfo: React.FC<Props> = ({ todo, users }) => {
  const user =
    todo.user || users?.find(u => Number(u.id) === Number(todo.userId));

  return (
    <article
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
