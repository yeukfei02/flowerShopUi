import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CustomSnackBar(props: any) {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (props.snackBarStatus && props.message) {
      setOpen(true);
      if (props.snackBarStatus === 'success') {
        setShowSuccess(true);
      } else if (props.snackBarStatus === 'error') {
        setShowSuccess(false);
      }
    }
  }, [props.snackBarStatus, props.message]);

  const handleClose = () => {
    setOpen(false);
  };

  const renderSnackBar = () => {
    let snackBar = null;

    if (showSuccess) {
      snackBar = (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {props.message}
          </Alert>
        </Snackbar>
      );
    } else {
      snackBar = (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {props.message}
          </Alert>
        </Snackbar>
      );
    }

    return snackBar;
  };

  return <div className={classes.root}>{renderSnackBar()}</div>;
}

export default CustomSnackBar;
