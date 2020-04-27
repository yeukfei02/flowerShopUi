import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { DropzoneArea } from 'material-ui-dropzone';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

import notFoundImage from '../../images/not-found.png';
import CustomAppBar from '../customAppBar/CustomAppBar';
import CustomSnackbar from '../customSnackbar/CustomSnackbar';

const ROOT_URL = `https://flower-shop-api.herokuapp.com/api`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    card: {
      width: 600,
      margin: 20,
    },
    media: {
      height: 230,
    },
  }),
);

const getShopById = async (id: number) => {
  let result = null;

  const response = await axios.get(`${ROOT_URL}/shop/${id}`);
  if (response && response.status === 200) {
    if (response.data && response.data.shop) {
      result = response.data.shop;
    }
  }

  return result;
};

function ShopDetails(props: any) {
  const classes = useStyles();
  const history = useHistory();

  const [image, setImage] = useState<string>('');
  const [shopName, setShopName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const [snackBarStatus, setSnackBarStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const id = props.match.params.id;

  useEffect(() => {
    if (id) {
      getShopById(id)
        .then((result: any) => {
          setImage(result.image);
          setShopName(result.shopName);
          setPhone(result.phone);
          setAddress(result.address);
        })
        .catch((e: any) => {
          console.log('error = ', e.message);
        });
    }
  }, [id]);

  const renderShopImage = () => {
    let cardMedia = <CardMedia className={classes.media} style={{ cursor: 'pointer' }} image={notFoundImage} />;

    if (!_.isEqual(image, 'null')) {
      cardMedia = <CardMedia className={classes.media} image={image} />;
    }

    return cardMedia;
  };

  const getBase64 = (file: any, cb: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      cb(reader.result);
    };
    reader.onerror = (error) => {
      console.log('error = ', error);
    };
  };

  const handleFilesUpload = (files: any[]) => {
    if (files && files.length === 1) {
      getBase64(files[0], (imageBase64String: string) => {
        if (imageBase64String) {
          setImage(imageBase64String);
        }
      });
    }
  };

  const handleShopNameChange = (e: any) => {
    setShopName(e.target.value);
  };

  const handlePhoneChange = (e: any) => {
    setPhone(e.target.value);
  };

  const handleAddressChange = (e: any) => {
    setAddress(e.target.value);
  };

  const updateShop = async (id: string, image: string, shopName: string, phone: string, address: string) => {
    const response = await axios.patch(
      `${ROOT_URL}/shop/${id}`,
      {
        image: image,
        shopName: shopName,
        phone: phone,
        address: address,
      },
      {
        headers: {
          'Content-type': 'application/json',
        },
      },
    );
    if (response && response.status === 200) {
      setSnackBarStatus('success');
      setMessage('update shop success');
    } else {
      setSnackBarStatus('error');
      setMessage('update shop error');
    }
  };

  const handleUpdateShop = () => {
    if (image && shopName && phone && address) {
      updateShop(id, image, shopName, phone, address);
      setSnackBarStatus('');
      setMessage('');
    }
  };

  const handleBack = () => {
    history.push(`/`);
  };

  return (
    <div className={classes.root}>
      <CustomAppBar />
      <div className="d-flex justify-content-center">
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Shop details
            </Typography>
            {renderShopImage()}
            <div className="mt-3 mb-2">
              <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={'Drag and drop an image here or click'}
                filesLimit={1}
                maxFileSize={500000}
                onChange={handleFilesUpload}
                alertSnackbarProps={{
                  anchorOrigin: {
                    horizontal: 'center',
                    vertical: 'bottom',
                  },
                }}
              />
            </div>
            <TextField
              className="w-100 my-2"
              value={shopName}
              label="Shop name"
              variant="outlined"
              onChange={(e) => handleShopNameChange(e)}
            />
            <TextField
              className="w-100 my-2"
              value={phone}
              label="Phone"
              variant="outlined"
              onChange={(e) => handlePhoneChange(e)}
            />
            <TextField
              className="w-100 my-2"
              value={address}
              label="Address"
              variant="outlined"
              onChange={(e) => handleAddressChange(e)}
            />
            <Button className="w-100 my-2" variant="contained" size="large" color="primary" onClick={handleUpdateShop}>
              Update shop
            </Button>
            <Button className="w-100 my-2" variant="contained" size="large" color="secondary" onClick={handleBack}>
              Back
            </Button>
          </CardContent>
          <CustomSnackbar snackBarStatus={snackBarStatus} message={message} />
        </Card>
      </div>
    </div>
  );
}

export default withRouter(ShopDetails);
