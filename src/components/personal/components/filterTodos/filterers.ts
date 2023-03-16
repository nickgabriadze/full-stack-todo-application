import { Todo } from "../showTodos/showTodos";

export const mapCategories = (todos: Todo[]) => {
  return [...new Set(todos.map((todo) => todo.category))];
};

export const filterByCategory = (todos: Todo[], category: string) => {
  return todos.filter((todo) => todo.category === category);
};

export const filterByCompleteness = (todos: Todo[], completed: boolean) => {
  const checked = completed ? 1 : 0;
  return todos.filter((todo) => todo.checked === checked);
};
