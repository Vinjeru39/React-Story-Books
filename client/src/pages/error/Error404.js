import Typography from "@material-ui/core/Typography";

const Error404 = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: 150,
      }}
    >
      <Typography variant="h1" paragraph>
        404
      </Typography>
      <Typography variant="subtitle1">Resource not found</Typography>
    </div>
  );
};

export default Error404;
