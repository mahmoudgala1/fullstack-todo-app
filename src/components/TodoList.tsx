import { useEffect, useState } from "react";
import Button from "./ui/Button";
import axiosInstance from "../config/axios.config";
import { useQuery } from "@tanstack/react-query";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import Input from "./ui/Input";

const TodoList = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { isLoading, data, error } = useAuthenticatedQuery({
    queryKey: ["todos"],
    url: `/users/me?populate=todos`,
    config: {
      headers: {
        Authorization: `Bearer ${userData?.jwt}`,
      },
    },
  });

  const onToggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-1">
      {data.todos.length > 0 ? (
        data.todos.map((todo, idx) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">
              {idx + 1} - {todo.title}
            </p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button size={"sm"} onClick={onToggleEditModal}>
                Edit
              </Button>
              <Button variant={"danger"} size={"sm"}>
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No todos yet</h3>
      )}
      <Modal
        isOpen={isEditModalOpen}
        closeModal={onToggleEditModal}
        title="Edit this todo"
      >
        <Input value={"Edit Todo"} />
        <div className="flex items-center space-x-3 mt-4">
          <Button className="bg-indigo-700 hover:bg-indigo-800">Update</Button>
          <Button variant={"cancel"} onClick={onToggleEditModal}>
            Cancle
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
