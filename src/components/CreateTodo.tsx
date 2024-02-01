import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "./Button";
import { TodoProps } from "./Todo";
import { DatePicker, Input } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import dayjs from "dayjs";

interface FormDataProps {
  title: string;
  day: string;
  desc: string;
}

interface onAddProps {
  onAdd(todo: TodoProps): any;
}

const CreateTodo = ({ onAdd }: onAddProps) => {
  const [formData, setFormData] = useState<FormDataProps>({
    title: "",
    day: "",
    desc: "",
  });

  const navigate = useNavigate();

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

    const newTodo: TodoProps = {
      id: 0,
      title: formData.title,
      day: formData.day,
      description: formData.desc,
      done: false,
    };

    onAdd(newTodo);
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
            // placeholder={editedTask ? defaultDate : ""}
            // defaultValue={editedTask ? defaultDate : currentDate}
            // value={dayjs(formData.day, "MMM DD YYYY hh:mm a ")}
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

        <Button color="#27ae60" text="Done" onClick={onSubmit} />
        <Button color="grey" text="Cancel" onClick={navigateCloseForm} />
      </form>
    </>
  );
};

export default CreateTodo;
