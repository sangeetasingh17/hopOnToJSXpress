import React from "react";

interface ButtonProps {
  color: string;
  text: string;
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
}

const Button: React.FC<ButtonProps> = ({
  color,
  text,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className="btn"
    >
      {text}
    </button>
  );
};

export default Button;
