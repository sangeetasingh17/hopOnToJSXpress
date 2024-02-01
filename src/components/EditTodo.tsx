import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "./Button";
import { TodoProps } from "./Todo";
import { DatePicker, Input } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

interface FormDataProps {
  title: string;
  day: string;
  desc: string;
}

interface EditTodoProps {
  prevTasks: TodoProps[];
  editTask: (todo: any) => void;
}

const EditTodo = ({ prevTasks, editTask }: EditTodoProps) => {
  const [formData, setFormData] = useState<FormDataProps>({
    title: "",
    day: "",
    desc: "",
  });

  const navigate = useNavigate();
  const pathParam = useParams();
  const location = useLocation();
  console.log("location:", location);

  useEffect(() => {
    const taskToBeEdited = prevTasks.find(
      (task) => task.id === Number(pathParam.id)
    );

    setFormData({
      title: taskToBeEdited ? taskToBeEdited.title : "",
      day: taskToBeEdited ? taskToBeEdited.day : "",
      desc: taskToBeEdited ? taskToBeEdited.description : "",
    });
  }, [prevTasks, pathParam]);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: any, dateString: string) => {
    setFormData((prevData) => ({ ...prevData, day: dateString }));
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.title || !formData.day || !formData.desc) {
      alert("wrong input");
      return;
    }

    const editedTodo: any = {
      id: Number(pathParam.id),
      title: formData.title,
      day: formData.day,
      description: formData.desc,
      done: false,
    };
    editTask(editedTodo);
    navigate("/");
  };
  console.warn(formData);

  const navigateCloseForm = () => {
    navigate("/");
  };

  return (
    <>
      <form className="add-form">
        <div className="form-control">
          <label>Title</label>
          <Input
            style={{ fontSize: "14px", padding: "4px 11px" }}
            name="title"
            placeholder="Add Title"
            onChange={handleTextChange}
            value={formData.title}
          />
        </div>

        <div className="form-control">
          <label>Day & Time</label>
          <DatePicker
            style={{ width: "100%" }}
            onChange={handleDateChange}
            showTime={true}
            format={"MMM DD YYYY hh:mm a "}
            value={dayjs(formData.day, "MMM DD YYYY hh:mm a ")}
          />
        </div>

        <div className="form-control">
          <label>Description</label>
          <Input
            style={{ fontSize: "14px", padding: "4px 11px" }}
            name="desc"
            placeholder="Add Description"
            onChange={handleTextChange}
            value={formData.desc}
          />
        </div>

        <Button color="black" text="Update" onClick={onSubmit} />
        <Button color="grey" text="Cancel" onClick={navigateCloseForm} />
      </form>
    </>
  );
};

export default EditTodo;
