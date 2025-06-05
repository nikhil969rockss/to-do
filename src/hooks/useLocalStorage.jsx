import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [todos, setTodos] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.log("cannot find stored value", error.message);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
  }, [key, todos]);

  return [todos, setTodos];
};
export default useLocalStorage;
