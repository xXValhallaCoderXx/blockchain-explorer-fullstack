import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent = ({isOpen, onClose, message,severity }) => {
    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={onClose}>
          <Alert onClose={onClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      );
}

export default SnackbarComponent
