import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "./Button";
import { TodoProps } from "./Todo";

interface FormDataProps {
  title: string;
  day: string;
  desc: string;
}

interface onAddProps {
  onAdd(todo: TodoProps): void;
  onEdit(todo: TodoProps): void;
  closeForm(): void;
  editedTask: TodoProps | undefined;
  isCreateView: boolean;
  isEditView: boolean;
}

const CreateTodo = ({
  onAdd,
  onEdit,
  closeForm,
  editedTask,
  isCreateView,
  isEditView,
}: onAddProps) => {
  const [formData, setFormData] = useState<FormDataProps>({
    title: "",
    day: "",
    desc: "",
  });
  console.log("isCreateView:", isCreateView);
  console.log("isEditView:", isEditView);

  useEffect(() => {
    if (isCreateView) {
      setFormData({
        title: "",
        day: "",
        desc: "",
      });
    } else if (isEditView) {
      setFormData({
        title: editedTask ? editedTask.title : "",
        day: editedTask ? editedTask.day : "",
        desc: editedTask ? editedTask.description : "",
      });
    }
  }, [editedTask, isCreateView]);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.title || !formData.day || !formData.desc) {
      alert("wrong input");
      return;
    }

    const newTodo: TodoProps = {
      id: 0,
      title: formData.title,
      day: formData.day,
      description: formData.desc,
      done: false,
    };

    const editedTodo: TodoProps = {
      id: editedTask ? editedTask.id : 0,
      title: formData.title,
      day: formData.day,
      description: formData.desc,
      done: editedTask ? editedTask.done : false,
    };

    if (!editedTask) {
      onAdd(newTodo);
    } else {
      onEdit(editedTodo);
    }

    setFormData({
      title: "",
      day: "",
      desc: "",
    });

    // setFormData((prevData) => ({
    //   ...prevData,
    //   title: "",
    //   day: "",
    //   desc: "",
    // }));

    closeForm();
  };
  console.warn(formData);

  return (
    <>
      <form className="add-form">
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Add Title"
            onChange={handleTextChange}
            value={formData.title}
          />
        </div>

        <div className="form-control">
          <label>Day & Time</label>
          <input
            type="text"
            name="day"
            placeholder="Add Day & Time"
            onChange={handleTextChange}
            value={formData.day}
          />
        </div>

        <div className="form-control">
          <label>Description</label>
          <input
            type="text"
            name="desc"
            placeholder="Add Description"
            onChange={handleTextChange}
            value={formData.desc}
          />
        </div>

        <Button
          color={isEditView ? "black" : "#27ae60"}
          text={isEditView ? "Edit" : "Done"}
          onClick={onSubmit}
        />
        <Button color="grey" text="Cancel" onClick={closeForm} />
      </form>
    </>
  );
};

export default CreateTodo;
