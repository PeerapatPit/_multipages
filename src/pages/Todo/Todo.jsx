import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

import { fetchTodos } from "../../data/todos";

import "./Todo.css";

const initItemsPerPage = 10;
const initOnlyWaiting = false;

function Todo() {
  const [todosRaw, setTodosRaw] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [todos, setTodos] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [curPage, setCurPage] = useState(0);

  const itemsPerPageRef = useRef();
  const onlyWaitingRef = useRef();

  useEffect(() => {
    setTodosRaw(fetchTodos());
    setOnlyWaiting(initOnlyWaiting);
    itemsPerPageRef.current.value = initItemsPerPage;
    setItemsPerPage(initItemsPerPage);
    onlyWaitingRef.current.checked = initOnlyWaiting;
  }, []);

  useEffect(() => {
    if (onlyWaiting) {
      setTodos(todosRaw.filter((todo) => !todo.completed));
    } else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting]);

  useEffect(() => {
    setNumPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]);

  useEffect(() => {
    if (numPages <= 0) setCurPage(0);
    else if (curPage === 0) setCurPage(1);
    else if (curPage > numPages) setCurPage(numPages);
  }, [numPages]);

  // event handlers
  function deleteClick(id) {
    const todoRemain = todosRaw.filter((todo) => todo.id !== id);
    setTodosRaw(todoRemain);
  }

  function waitingClick(id) {
    const todoSelected = todosRaw.find((todo) => todo.id === id);
    todoSelected.completed = true;
    setTodosRaw([...todosRaw]); // force state change
  }

  function addClick(id, title) {
    const newItem = {
      id,
      title,
      completed: false,
      userId: 1,
    };
    setTodosRaw([...todosRaw, newItem]); // work
  }

  // modal handlers
  const [show, setShow] = useState(false);

  const newIdRef = useRef();
  const newTitleRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="todo-container">
      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="bi bi-plus-lg"> &nbsp;Add Todo </span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={
                  Number(
                    todosRaw.reduce(
                      (prev, todo) => (todo.id > prev ? todo.id : prev),
                      0
                    )
                  ) + 1
                }
                autoFocus
                ref={newIdRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Title:</Form.Label>
              <Form.Control type="text" autoFocus ref={newTitleRef} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <span className="bi bi-x-lg"> &nbsp;Cancel</span>
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const id = newIdRef.current.value;
              const title = newTitleRef.current.value.trim();
              if (title === "") {
                alert("Title cannot be empty");
                newTitleRef.current.value = "";
                newTitleRef.current.focus();
              } else {
                addClick(id, title);
                handleClose();
              }
            }}
          >
            <span className="bi bi-plus-lg"> &nbsp;Add</span>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* filters */}
      <div className="todo-filters-container">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            // checked
            onChange={(e) => setOnlyWaiting(e.target.checked)}
            ref={onlyWaitingRef}
            
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Show only &nbsp;
            <button className="btn btn-warning">
              waiting&nbsp;<span className="bi bi-clock"></span>
            </button>
          </label>
        </div>
        <select
          className="form-select"
          aria-label="Items per page"
          style={{ width: "200px" }}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          ref={itemsPerPageRef}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </select>
      </div>

      {/* table */}
      <table className="table table-striped todo-table">
        <thead className="table-dark">
          <tr>
            <th style={{ width: "5%" }} valign="middle">
              ID
            </th>
            <th valign="middle">TITLE</th>
            <th style={{ textAlign: "right", width: "20%" }} valign="middle">
              Completed &nbsp;
              <button className="btn btn-primary" onClick={() => handleShow()}>
                <span className="bi bi-plus-lg"></span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            // itemsPerPage = 5
            // curPage =  1, 2, 3, 4, 5
            // item (human) = [1...5], [6...10], [11...15] // สำหรับมนุษย์จะเริ่มนับที่ 1
            // item (js*) = [0...4], [5...9], [10...14] // สำหรับ JavaScript จะเริ่มนับที่ 0
            // item (js*) = [min...max]
            // min = (curPage - 1) * itemsPerPage
            // max = curPage * itemsPerPage - 1

            todos
              .filter((todo, index) => {
                const min = (curPage - 1) * itemsPerPage;
                const max = curPage * itemsPerPage - 1;
                return index >= min && index <= max;
              })
              .map((todo) => (
                <tr key={todo.id}>
                  <td valign="middle">
                    <span
                      className="badge bg-secondary"
                      style={{ width: "3rem" }}
                    >
                      {todo.id}
                    </span>
                  </td>
                  <td style={{ textAlign: "left" }} valign="middle">
                    {todo.title}
                  </td>
                  <td style={{ textAlign: "right" }} valign="middle">
                    {todo.completed ? (
                      <span className="badge bg-success">
                        done&nbsp;<span className="bi bi-check"></span>
                      </span>
                    ) : (
                      <button
                        className="btn btn-warning"
                        onClick={() => waitingClick(todo.id)}
                      >
                        waiting&nbsp;<span className="bi bi-clock"></span>
                      </button>
                    )}
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteClick(todo.id)}
                    >
                      <span className="bi bi-trash"></span>
                    </button>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>

      {/* page control */}
      <div>
        <button
          className={`todo-space btn ${
            curPage <= 1 ? "btn-outline-secondary" : "btn-outline-primary"
          }`}
          onClick={() => setCurPage(1)}
          disabled={curPage <= 1}
        >
          First
        </button>
        <button
          className={`todo-space btn ${
            curPage <= 1 ? "btn-outline-secondary" : "btn-outline-primary"
          }`}
          onClick={() => curPage > 1 && setCurPage(curPage - 1)}
          disabled={curPage <= 1}
        >
          Previous
        </button>
        <span className="todo-space">
          {curPage}&nbsp;/&nbsp;{numPages}
        </span>
        <button
          className={`todo-space btn ${
            curPage >= numPages
              ? "btn-outline-secondary"
              : "btn-outline-primary"
          }`}
          onClick={() => curPage < numPages && setCurPage(curPage + 1)}
          disabled={curPage >= numPages}
        >
          Next
        </button>
        <button
          className={`todo-space btn ${
            curPage >= numPages
              ? "btn-outline-secondary"
              : "btn-outline-primary"
          }`}
          onClick={() => setCurPage(numPages)}
          disabled={curPage >= numPages}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Todo;