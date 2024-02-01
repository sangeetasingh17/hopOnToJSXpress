import { useEffect } from "react";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = "Todo-List",
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location:", location);

  const navigateToCreate = () => {
    navigate("/create");
  };

  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color="green" text="Create" onClick={navigateToCreate} />
    </header>
  );
};

export default Header;
