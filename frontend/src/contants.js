export const basePath = process.env.REACT_APP_API_BASE_PATH;

export const APIurls = {
  signup: "/auth/signup",
  login: "/auth/login",

  getTodo: "/todos/",
  addTodo: "/todos/",
  getSingleTodo: (id) => `/todos/${id}`,
  updateTodo: (id) => `/todos/${id}`,
  deleteTodo: (id) => `/todos/${id}`,
};