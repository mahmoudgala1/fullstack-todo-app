import Button from "./ui/Button";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import { ITodo } from "../interfaces";
import { FormEvent, MouseEvent, useState } from "react";
import axiosInstance from "../config/axios.config";

const TodoList = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
  });

  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["TodoList", `${todoToEdit.id}`],
    url: `/users/me?populate=todos`,
    config: {
      headers: {
        Authorization: `Bearer ${userData?.jwt}`,
      },
    },
  });

  const onOpenEditModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setTodoToEdit({
      id: 0,
      title: "",
      description: "",
    });
    setIsEditModalOpen(false);
  };

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const onCloseEditModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeEditModal();
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { status } = await axiosInstance.put(
        `/todos/${todoToEdit.id}`,
        {
          data: {
            title: todoToEdit.title,
            description: todoToEdit.description,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.jwt}`,
          },
        }
      );
      if (status === 200) {
        closeEditModal();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-1">
      {data.todos.length > 0 ? (
        data.todos.map((todo: ITodo, idx: number) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">
              {idx + 1} - {todo.title}
            </p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button size={"sm"} onClick={() => onOpenEditModal(todo)}>
                Edit
              </Button>
              <Button variant={"danger"} size={"sm"} onClick={openDeleteModal}>
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
        closeModal={closeEditModal}
        title="Edit this todo"
      >
        <form className="space-y-3" onSubmit={submitHandler}>
          <Input
            value={todoToEdit.title}
            onChange={(e) => {
              setTodoToEdit({ ...todoToEdit, title: e.target.value });
            }}
          />
          <Textarea
            value={todoToEdit.description}
            onChange={(e) => {
              setTodoToEdit({ ...todoToEdit, description: e.target.value });
            }}
          />
          <div className="flex items-center space-x-3 mt-4">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800"
              isLoading={isUpdating}
            >
              Update
            </Button>
            <Button variant={"cancel"} onClick={onCloseEditModal}>
              Cancle
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        title="Are you sure you want to remove this todo from your store?"
        description="Deleting this todo will remove it from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3 mt-4">
          <Button variant={"danger"} onClick={() => {}}>
            Yes, remove
          </Button>
          <Button variant={"cancel"} onClick={closeDeleteModal}>
            Cancle
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
