import { todoSchema } from "../schema";
import { useFormik } from "formik";
import { APiRequest } from "../services/ApiRequest";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialValues = {
  task: "",
  description: "",
};

function AddTodo() {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues,
      validationSchema: todoSchema,
      onSubmit: async (values, action) => {
        try {
          setLoading(true);
          if (isEdit) {
            await APiRequest.updateTodo(id, values);
            toast.success("Todo updated successfully!");
          } else {
            await APiRequest.addTodo(values);
            toast.success("Todo added successfully!");
          }
          action.resetForm();
          navigate("/");
        } catch (error) {
          toast.error("Something went wrong!");
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
    });

  useEffect(() => {
    const fetchTodo = async () => {
      if (id) {
        setIsEdit(true);
        try {
          const res = await APiRequest.getSingleTodo(id);
          const todo = res?.data;
          setValues({
            task: todo.task,
            description: todo.description,
          });
        } catch (error) {
          toast.error("Error fetching todo!");
        }
      }
    };
    fetchTodo();
  }, [id, setValues]);

  return (
    <div className="add-todo">
      <div className="card">
        <h2 className="card__title">{isEdit ? "Edit Todo" : "Add a New Todo"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task</label>
            <input
              type="text"
              name="task"
              value={values.task}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter task title"
            />
            {errors.task && touched.task ? (
              <p className="form-error">{errors.task}</p>
            ) : null}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="3"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter task description"
            ></textarea>
            {errors.description && touched.description ? (
              <p className="form-error">{errors.description}</p>
            ) : null}
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading
              ? isEdit
                ? "Updating..."
                : "Adding..."
              : isEdit
              ? "Update Todo"
              : "Add Todo"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTodo;
