const ErrorMessage = () => {
  return (
    <img
      src={process.env.PUBLIC_URL + "/error.gif"}
      style={{
        display: "block",
        width: "250px",
        height: "250px",
        objectFit: "contain",
        margin: "0 auto",
      }}
      alt="Error Response"
    />
  );
};

export default ErrorMessage;
