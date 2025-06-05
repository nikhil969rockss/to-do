import { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { FaSave } from "react-icons/fa";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const inputRef = useRef();
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "pending") return !todo.isCompleted;
    if (filter === "complete") return todo.isCompleted;
  });

  function handleAddTodos(e) {
    e.preventDefault();
    if (inputVal.length < 2) {
      setError("Please Enter a todo first!!");
    } else {
      setError("");
      const newTodo = { id: Math.random(), todo: inputVal, isCompleted: false };
      setTodos([...todos, newTodo]);
      setInputVal("");
    }
  }
  const handleDoneTodos = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo;
      })
    );
  };
  const handleDelete = (id) => {
    const isConfirm = confirm("Are you sure want to delete it?");
    if (isConfirm) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };
  const handleEdit = (id) => {
    if (isEditing) {
      setError("kindly save the todo first");
    } else {
      setIsEditing(true);
      setEditingId(id);
      const todo = todos.find((todo) => todo.id === id);
      setEditingText(todo.todo);
    }
  };
  const handleSave = (id) => {
    if (editingText.length < 2) {
      setError("can't save empty todo");
      inputRef.current.focus();
      return;
    }
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, todo: editingText } : todo;
      })
    );

    setEditingId(null);
    setEditingText("");
    setError("");
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto">
      <Navbar />

      <section className="px-3 py-2 mt-4 rounded-md bg-amber-100 w-1/2 mx-auto h-[85vh] overflow-y-scroll">
        <h1 className=" tracking-tighter text-2xl font-[600] text-center mb-4">
          iTask- One place to set your goals of the day.
        </h1>
        <form
          onSubmit={handleAddTodos}
          className="flex items-center px-3 py-2"
          action=""
        >
          <input
            className="flex-1  border-[1px] border-black/5 rounded-full px-3 py-2 outline-none"
            type="text"
            placeholder="Enter todo"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button className="px-4 py-2 rounded-full bg-cyan-600 flex items-center gap-1 cursor-pointer hover:bg-cyan-700 text-white font-bold">
            <span>
              <IoIosAddCircle />
            </span>
            Add
          </button>
        </form>
        {error && (
          <p className="p-2 bg-red-300 flex items-center rounded-md text-gray-50 ">
            <span>
              <MdOutlineError />
            </span>
            {error}
          </p>
        )}
        <div className="w-full h-[1px] bg-black/12 mt-4"></div>
        <section className=" ">
          <ul className="flex text-lg font-[600] capitalize text-black/70">
            {["all todos", "pending todos", "done todos"].map(
              (option, index) => {
                return (
                  <li
                    onClick={
                      index === 0
                        ? () => setFilter("all")
                        : index === 1
                        ? () => setFilter("pending")
                        : index === 2
                        ? () => setFilter("complete")
                        : null
                    }
                    key={index}
                    className={`flex-1 text-center cursor-pointer hover:scale-105 ${
                      filter === "all" && index === 0
                        ? "bg-blue-500 text-white transition-all duration-300"
                        : filter === "pending" && index === 1
                        ? "bg-yellow-600 text-white transition-all duration-300"
                        : filter === "completed" && index === 2
                        ? "bg-green-600 text-white transition-all duration-300"
                        : ""
                    }`}
                  >
                    {option}
                  </li>
                );
              }
            )}
          </ul>
          {
            <div className="todos ">
              {filteredTodos.length > 0
                ? filteredTodos?.map((item, index) => {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between mt-4 border-b-[1px] border-black/10 pb-2"
                      >
                        {" "}
                        <div className="flex flex-1  items-center gap-3 ">
                          {isEditing && editingId === item.id ? null : (
                            <input
                              className="cursor-pointer"
                              checked={item?.isCompleted}
                              onChange={() => handleDoneTodos(item.id)}
                              type="checkbox"
                              name=""
                              id=""
                            />
                          )}
                          {isEditing && editingId === item.id ? null : (
                            <p
                              type="text"
                              onClick={() => handleDoneTodos(item.id)}
                              className={`text-lg flex-1 cursor-pointer ${
                                item.isCompleted && "line-through"
                              }`}
                            >
                              {" "}
                              {item.todo}
                            </p>
                          )}
                          {isEditing && editingId === item.id && (
                            <input
                              ref={inputRef}
                              autoFocus
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              type="text"
                              className={`text-lg flex-1 px-2 py-1 mr-2 rounded-md  `}
                              onKeyDown={(e) =>
                                e.key === "Enter" && handleSave(item.id)
                              }
                            ></input>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={
                              !isEditing
                                ? () => handleEdit(item.id)
                                : () => handleSave(item.id)
                            }
                            disabled={item.isCompleted}
                            className={`px-4 py-2 rounded-full 0 text-white font-[600]  flex items-center gap-1 ${
                              item.isCompleted
                                ? "cursor-not-allowed bg-gray-400 opacity-50"
                                : "cursor-pointer bg-green-600 hover:bg-green-700 "
                            }`}
                          >
                            <span>
                              {isEditing && editingId === item.id ? (
                                <FaSave />
                              ) : (
                                <FaEdit />
                              )}
                            </span>
                            {isEditing && editingId === item.id
                              ? "save"
                              : "edit"}
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="px-4 py-2 cursor-pointer rounded-full bg-red-600 text-white font-[600] hover:bg-red-700 flex items-center "
                          >
                            delete
                          </button>
                        </div>
                      </div>
                    );
                  })
                : <div className="text-center animate-pulse mt-4 text-sm font-[600] tracking-tighter">No todos available...</div>}
            </div>
          }
        </section>
      </section>
    </div>
  );
};
export default App;
