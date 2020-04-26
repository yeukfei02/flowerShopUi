import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const ROOT_URL = `https://flower-shop-api.herokuapp.com/api`;

const useStyles = makeStyles({
  root: {
    width: 600,
    margin: 20
  },
});

function CreateShopForm() {
  const classes = useStyles();

  const [shopName, setShopName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const handleShopNameChange = (e: any) => {
    if (e.target.value)
      setShopName(e.target.value);
  }

  const handlePhoneChange = (e: any) => {
    if (e.target.value)
      setPhone(e.target.value);
  }

  const handleAddressChange = (e: any) => {
    if (e.target.value)
      setAddress(e.target.value);
  }

  const handleCreateShop = () => {
    if (shopName && phone && address)
      createShop(shopName, phone, address);
  }

  const createShop = async (shopName: string, phone: string, address: string) => {
    const response = await axios.post(`${ROOT_URL}/shop/create-shop`,
      {
        shopName: shopName,
        phone: phone,
        address: address,
      }
    );
    console.log("response = ", response);
  }

  return (
    <div className="d-flex justify-content-center my-4">
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Create shop
          </Typography>
          <TextField className="w-100 my-2" label="Shop name" variant="outlined" onChange={(e) => handleShopNameChange(e)} />
          <TextField className="w-100 my-2" label="Phone" variant="outlined" onChange={(e) => handlePhoneChange(e)} />
          <TextField className="w-100 my-2" label="Address" variant="outlined" onChange={(e) => handleAddressChange(e)} />
          <Button className="w-100 my-2" variant="contained" size="large" color="primary" onClick={handleCreateShop}>Create shop</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateShopForm;
