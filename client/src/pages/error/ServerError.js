import Typography from "@material-ui/core/Typography";

const ServerError = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: 150,
      }}
    >
      <Typography variant="h1" paragraph>
        500
      </Typography>
      <Typography variant="subtitle1">Server Error</Typography>
    </div>
  );
};

export default ServerError;
