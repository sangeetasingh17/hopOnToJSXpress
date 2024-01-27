import React, { CSSProperties } from "react";

interface ButtonProps {
  color: string;
  text: string;
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  customStyle?: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  color,
  text,
  onClick,
  customStyle,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color, ...customStyle }}
      className="btn"
    >
      {text}
    </button>
  );
};

export default Button;
