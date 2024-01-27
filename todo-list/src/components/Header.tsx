import Button from "./Button";

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
  return (
    <header className="header">
      <h1>{title}</h1>
      {!showForm ? (
        <Button color="green" text="Create" onClick={toggleShowForm} />
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
