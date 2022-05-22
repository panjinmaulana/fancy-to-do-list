import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo, fetchTodos, updateStatusTodo } from '../redux/action';

function Home() {
  const dispatch = useDispatch();
  let todos = useSelector((state) => state.todosReducer.todos);

  const [data, setData] = useState(todos);

  const [input, setInput] = useState({
    id: Math.floor(Math.random() * 100),
    title: "",
    description: "",
    status: 0,
    createdAt: `${new Date().toISOString().slice(0, 10)} ${new Date().toLocaleTimeString().slice(0, 5)}`,
  });

  const [dataEdit, setDataEdit] = useState({});

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  function handleOnChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  function handleOnSubmit(e, action) {
    e.preventDefault();
    if (action == 'Add') {
      dispatch(addTodo(input));
      setInput({
        id: Math.floor(Math.random() * 100),
        title: "",
        description: "",
        status: 0,
        createdAt: `${new Date().toISOString().slice(0, 10)} ${new Date().toLocaleTimeString().slice(0, 5)}`,
      });
    } else {
      const payload = {
        id: dataEdit.id,
        title: input.title || dataEdit.title,
        description: input.description || dataEdit.description,
        status: 0,
        createdAt: dataEdit.createdAt,
      };
      dispatch(editTodo(payload));
    };
  };

  function handleOnClick(data) {
    setDataEdit(data);
  };

  function handleOnUpdateStatus(data) {
    const payload = {
      id: data.id,
      title: data.title,
      description: data.description,
      status: data.status == 0 ? 1 : 0,
      createdAt: data.createdAt,
    };
    dispatch(updateStatusTodo(payload));
  };

  function handleOnDelete(id) {
    dispatch(deleteTodo(id));
  };

  function handleOnCancel() {
    setInput({
      id: Math.floor(Math.random() * 100),
      title: "",
      description: "",
      status: 0,
      createdAt: `${new Date().toISOString().slice(0, 10)} ${new Date().toLocaleTimeString().slice(0, 5)}`,
    });
  };

  function filterData(status) {
    if (status == 'all') {
      setData(todos);
    } else {
      const updatedListData = todos.filter((el) => el.status == status)
        .sort((a, b) => status == 0 ? a.createdAt - b.createdAt : b.createdAt - a.createdAt);
      setData(updatedListData);
    };
  };

  return (
    <div className='container mt-5'>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        {/* Button trigger modal */}
      </div>

      <div className='text-center'>
        <button type="button" className="btn btn-outline-dark me-2" onClick={() => filterData('all')}>All</button>
        <button type="button" className="btn btn-outline-dark me-2" onClick={() => filterData(0)}>Pending</button>
        <button type="button" className="btn btn-outline-dark me-2" onClick={() => filterData(1)}>Done</button>
      </div>

      <div className='text-end'>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => handleOnClick('', 'Add')}
        >
          Add Todo
        </button>
      </div>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={(e) => handleOnSubmit(e, 'add')}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Todo List</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleOnCancel()}
                >
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">Title</label>
                  <input
                    onChange={(e) => handleOnChange(e)}
                    name="title"
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Title"
                    defaultValue={dataEdit.title}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">Description</label>
                  <input
                    onChange={(e) => handleOnChange(e)}
                    name="description"
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Description"
                    defaultValue={dataEdit.description}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleOnCancel()}>Cancel</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        {data.length ? data.map((el) => {
          return (
            <div key={el.id} className="col-sm-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{el.title}</h5>
                  <p className="card-text">{el.description} </p>
                  <p className="card-text">Status: {el.status ? 'Done' : 'Pending'}</p>
                  <p className="card-text">Date: {el.createdAt}</p>
                  <div className='text-center'>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => handleOnClick(el, 'Edit')}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleOnUpdateStatus(el)}
                    >
                      Update Status
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleOnDelete(el.id)}
                      hidden={el.status == 1}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }) : todos.map((el) => {
          return (
            <div key={el.id} className="col-sm-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{el.title}</h5>
                  <p className="card-text">{el.description} </p>
                  <p className="card-text">Status: {el.status ? 'Done' : 'Pending'}</p>
                  <p className="card-text">Date: {el.createdAt}</p>
                  <div className='text-center'>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => handleOnClick(el, 'Edit')}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleOnUpdateStatus(el)}
                    >
                      Update Status
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleOnDelete(el.id)}
                      hidden={el.status == 1}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default Home;