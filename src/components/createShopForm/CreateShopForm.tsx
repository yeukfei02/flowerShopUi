import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';

import CustomSnackbar from '../customSnackbar/CustomSnackbar';

const ROOT_URL = `https://flower-shop-api.herokuapp.com/api`;

const useStyles = makeStyles({
  root: {
    width: 600,
    margin: 20,
  },
});

function CreateShopForm() {
  const classes = useStyles();

  const [image, setImage] = useState<string>('');
  const [shopName, setShopName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const [snackBarStatus, setSnackBarStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');

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

  const createShop = async (image: string, shopName: string, phone: string, address: string) => {
    const response = await axios.post(
      `${ROOT_URL}/shop/create-shop`,
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
    if (response && response.status === 201) {
      setSnackBarStatus('success');
      setMessage('create shop success');
    } else {
      setSnackBarStatus('error');
      setMessage('create shop error');
    }
  };

  const handleCreateShop = () => {
    if (image && shopName && phone && address) {
      createShop(image, shopName, phone, address);
      setSnackBarStatus('');
      setMessage('');
    } else {
      setSnackBarStatus('error');
      setMessage('please enter all fields');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Create shop
          </Typography>
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
            label="Shop name"
            variant="outlined"
            onChange={(e) => handleShopNameChange(e)}
          />
          <TextField className="w-100 my-2" label="Phone" variant="outlined" onChange={(e) => handlePhoneChange(e)} />
          <TextField
            className="w-100 my-2"
            label="Address"
            variant="outlined"
            onChange={(e) => handleAddressChange(e)}
          />
          <Button className="w-100 my-2" variant="contained" size="large" color="primary" onClick={handleCreateShop}>
            Create shop
          </Button>
        </CardContent>
        <CustomSnackbar snackBarStatus={snackBarStatus} message={message} />
      </Card>
    </div>
  );
}

export default CreateShopForm;
