const initialState = {
  todos: [],
};

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_POSTS": {
      return {
        ...state,
        todos: action.payload,
      };
    };

    case "ADD_TODO": {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    };

    case "EDIT_TODO": {
      const data = [...state.todos, action.payload]
      const newTodos = [...new Map(data.map(item => [item.id, item])).values()]
      return {
        ...state,
        todos: newTodos,
      };
    };

    case "UPDATE_STATUS_TODO": {
      const data = [...state.todos, action.payload]
      const newTodos = [...new Map(data.map(item => [item.id, item])).values()]
      return {
        ...state,
        todos: newTodos,
      };
    };

    case "DELETE_TODO": {
      const filteredData = state.todos.filter((el) => el.id != action.payload)
      return {
        ...state,
        todos: filteredData,
      };
    };

    default:
      return state;
  };
};