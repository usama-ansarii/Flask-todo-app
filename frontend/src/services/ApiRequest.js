import { APIurls } from "../contants";
import { apiServices } from "./ApiServices";

export const APiRequest = {
  signup: async (data) => await apiServices.post(APIurls.signup, data),
  login: async (data) => await apiServices.post(APIurls.login, data),

  getTodo: async () => await apiServices.get(APIurls.getTodo),
  getSingleTodo: async (id) => await apiServices.get(APIurls.getSingleTodo(id)),
  
  addTodo: async (data) => await apiServices.post(APIurls.addTodo, data),
  updateTodo: async (id, data) =>
    await apiServices.put(APIurls.updateTodo(id), data),
  deleteTodo: async (id) =>
    await apiServices.delete(APIurls.deleteTodo(id)),
};
