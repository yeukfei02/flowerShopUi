import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

function CustomPagination(props: any) {
  const classes = useStyles();

  return (
    <div className={`${classes.root} d-flex justify-content-center mt-3 mb-5`}>
      <Pagination count={props.totalPage} color="secondary" showFirstButton showLastButton />
    </div>
  );
}

export default CustomPagination;
