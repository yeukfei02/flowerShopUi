import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

import notFoundImage from '../../images/not-found.png';
import CustomSnackBar from '../customSnackbar/CustomSnackbar';

const ROOT_URL = `https://flower-shop-api.herokuapp.com/api`;

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
      height: 230,
    },
  }),
);

function DisplayResult(props: any) {
  const classes = useStyles();
  const history = useHistory();

  const [snackBarStatus, setSnackBarStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const getShopById = async (id: number) => {
    let result = '';

    const response = await axios.get(`${ROOT_URL}/shop/${id}`);
    if (response && response.status === 200) {
      if (response.data) {
        if (response.data.shop) {
          result = response.data.shop.shopName;
        }
      }
    }

    return result;
  }

  const deleteShopById = async (id: string) => {
    try {
      const response = await axios.delete(`${ROOT_URL}/shop/${id}`);
      if (response && response.status === 200) {
        setSnackBarStatus('success');
        setMessage(`delete shop by id: ${id}`);
        setTimeout(() => {
          props.fetchData();
        }, 1000);
      }
    } catch (e) {
      console.log("error = ", e.message);
      setSnackBarStatus('error');
      setMessage(`delete shop by id error, please delete flower first`);
    }
  }

  const deleteFlowerById = async (id: string) => {
    try {
      const response = await axios.delete(`${ROOT_URL}/flower/${id}`);
      if (response && response.status === 200) {
        setSnackBarStatus('success');
        setMessage(`delete flower by id: ${id}`);
        setTimeout(() => {
          props.fetchData();
        }, 1000);
      }
    } catch (e) {
      console.log("error = ", e.message);
      setSnackBarStatus('error');
      setMessage(`delete flower by id error`);
    }
  }

  const handleShopDeleteById = (shopId: string) => {
    if (shopId) {
      deleteShopById(shopId);
    }
  }

  const handleFlowerDeleteById = (flowerId: string) => {
    if (flowerId) {
      deleteFlowerById(flowerId);
    }
  }

  const handleGoShopDetails = (shopId: string) => {
    history.push(`/shop/${shopId}`);
  }

  const handleGoFlowerDetails = (flowerId: string) => {
    history.push(`/flower/${flowerId}`);
  }

  const renderShopImage = (item: any) => {
    let cardMedia = (
      <CardMedia
        className={classes.media}
        style={{ cursor: 'pointer' }}
        image={notFoundImage}
        onClick={() => handleGoShopDetails(item.shopId)}
      />
    );

    if (!_.isEqual(item.image, "null")) {
      cardMedia = (
        <CardMedia
          className={classes.media}
          style={{ cursor: 'pointer' }}
          image={item.image}
          onClick={() => handleGoShopDetails(item.shopId)}
        />
      );
    }

    return cardMedia;
  }

  const renderFlowerImage = (item: any) => {
    let cardMedia = (
      <CardMedia
        className={classes.media}
        style={{ cursor: 'pointer' }}
        image={notFoundImage}
        onClick={() => handleGoFlowerDetails(item.flowerId)}
      />
    );

    if (!_.isEqual(item.image, "null")) {
      cardMedia = (
        <CardMedia
          className={classes.media}
          style={{ cursor: 'pointer' }}
          image={item.image}
          onClick={() => handleGoFlowerDetails(item.flowerId)}
        />
      );
    }

    return cardMedia;
  }

  const renderItem = () => {
    let results = null;

    if (props.resultList) {
      if (props.searchValue === 'shop') {
        results = props.resultList.map((item: any, i: number) => {
          return (
            <Grid key={i} item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <div className="d-flex justify-content-end my-2" style={{ cursor: 'pointer' }}>
                  <HighlightOffIcon fontSize="large" onClick={() => handleShopDeleteById(item.shopId)} />
                </div>
                {renderShopImage(item)}
                <Typography className="mt-2" variant="h6" gutterBottom>
                  Shop name: {item.shopName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Phone: {item.phone}
                </Typography>
                <Typography variant="h6" gutterBottom>
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
                <div className="d-flex justify-content-end my-2" style={{ cursor: 'pointer' }}>
                  <HighlightOffIcon fontSize="large" onClick={() => handleFlowerDeleteById(item.flowerId)} />
                </div>
                {renderFlowerImage(item)}
                <Typography className="mt-2" variant="h6" gutterBottom>
                  Flower name: {item.flowerName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Color: {item.color}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Flower type: {item.flowerType}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Price: {item.price}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Occasion: {item.occasion}
                </Typography>
                <Typography variant="h6" gutterBottom>
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
      <CustomSnackBar snackBarStatus={snackBarStatus} message={message} />
    </div>
  );
}

export default DisplayResult;
