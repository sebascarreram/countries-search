import styleError from "./errorMessage.module.css";

const Error = () => {
  return (
    <div className="container">
      <h1 className={styleError.error}>Error</h1>
    </div>
  );
};

export default Error;
