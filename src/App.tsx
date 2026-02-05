import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todoes } from './types/Todos';

function getTodoId(todos: Todoes[]) {
  if (todos.length === 0) {
    return 1;
  }

  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todoes[]>(todosFromServer);
  const [users] = useState(usersFromServer);

  const [text, setText] = useState('');
  const [selectUser, setSelectUser] = useState(0);
  const [isErrorTitle, setIsErrorTitle] = useState(false);
  const [isErrorSelect, setIsErrorSelect] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsErrorTitle(!text.trim());
    setIsErrorSelect(selectUser === 0);

    if (!text.trim() || selectUser === 0) {
      return;
    }

    const newTodo: Todoes = {
      id: getTodoId(todos),
      title: text.trim(),
      userId: selectUser,
      completed: false,
    };

    setTodos(current => [...current, newTodo]);

    setText('');
    setSelectUser(0);
    setIsErrorTitle(false);
    setIsErrorSelect(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={text}
            onChange={event => {
              const newValue = event.target.value;

              const filteredValue = newValue.replace(
                /[^a-zA-Zа-яА-ЯіієїґҐ0-9\s]/g,
                '',
              );

              setText(filteredValue);
              setIsErrorTitle(false);
            }}
          />
          {isErrorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectUser}
            onChange={event => {
              setSelectUser(Number(event.target.value));
              setIsErrorSelect(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isErrorSelect && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={users} />
    </div>
  );
};
