import axios from 'axios';

// For fetch todos
export const fetchTodos = (todo) => {
  console.log(todo);
  return (dispatch) => {
    axios
      .get('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list')
      .then(({ data }) => {
        dispatch({ type: "FETCH_POSTS", payload: data });
      })
      .catch((err) => console.log(err));
  };
};

// For add todo
export const addTodo = (todo) => {
  console.log(todo);
  return {
    type: "ADD_TODO",
    payload: todo,
  };
};

// For edit todo
export const editTodo = (todo) => {
  return {
    type: "EDIT_TODO",
    payload: todo,
  };
};

// For update status todo
export const updateStatusTodo = (todo) => {
  return {
    type: "UPDATE_STATUS_TODO",
    payload: todo,
  };
};

// For delete todo
export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    payload: id,
  };
};