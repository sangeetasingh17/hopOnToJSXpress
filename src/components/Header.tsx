import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title?: string;
  toggleShowForm?(): void;
  showForm?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title = "Todo-List",
  toggleShowForm,
  showForm,
}: HeaderProps) => {
  const navigate = useNavigate();

  const navigateToCreate = () => {
    navigate("/create");
    toggleShowForm?.();
  };

  return (
    <header className="header">
      <h1>{title}</h1>
      {!showForm ? (
        <Button color="green" text="Create" onClick={navigateToCreate} />
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
