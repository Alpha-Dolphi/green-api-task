import { useState, useContext } from "react";
import { UserDataContext } from "../../App";

const Authorization = () => {
  const { setApiTokenInstance, setIdInstance } = useContext(UserDataContext);
  const [idInstanceValue, setIdInstanceValue] = useState("");
  const [apiTokenInstanceValue, setApiTokenInstanceValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIdInstance(idInstanceValue);
    setApiTokenInstance(apiTokenInstanceValue);

    setIdInstanceValue("");
    setApiTokenInstanceValue("");
  };

  return (
    <form
      className="h-full py-4 px-4 flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <span className="text-white">idInstance</span>
        <input
          required
          type="text"
          className="authorization-input"
          value={idInstanceValue}
          onChange={(event) => setIdInstanceValue(event.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <span className="text-white">apiTokenInstance</span>
        <input
          required
          type="text"
          className="authorization-input"
          value={apiTokenInstanceValue}
          onChange={(event) => setApiTokenInstanceValue(event.target.value)}
        />
      </div>
      <button className="h-8 w-full px-2 hover:bg-greeny bg-blue-grey-300 mt-4 rounded-md text-white outline-none">
        Login
      </button>
    </form>
  );
};

export default Authorization;
