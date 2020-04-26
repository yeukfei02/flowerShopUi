import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 20
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.primary,
    },
    media: {
      height: 200,
    },
  }),
);

function DisplayResult(props: any) {
  const classes = useStyles();

  const renderItem = () => {
    let results = null;

    if (props.resultList) {
      if (props.searchValue === 'shop') {
        results = props.resultList.map((item: any, i: number) => {
          return (
            <Grid key={i} item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                  Shop name: {item.shopName}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Phone: {item.phone}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Address: {item.address}
                </Typography>
              </Paper>
            </Grid>
          );
        });
      } else if (props.searchValue === 'flower') {
        results = props.resultList.map((item: any, i: number) => {
          return (
            <Grid key={i} item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <CardMedia
                  className={classes.media}
                  image={item.image}
                />
                <Typography variant="h5" gutterBottom>
                  Flower name: {item.flowerName}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Color: {item.color}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Flower type: {item.flowerType}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Price: {item.price}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  occasion: {item.occasion}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Shop: {item.shopId}
                </Typography>
              </Paper>
            </Grid>
          );
        });
      }
    }

    return results;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {renderItem()}
      </Grid>
    </div>
  );
}

export default DisplayResult;
