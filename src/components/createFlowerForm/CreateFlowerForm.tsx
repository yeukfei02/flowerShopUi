import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import axios from 'axios';

import CustomSnackBar from '../customSnackbar/CustomSnackbar';

const ROOT_URL = `https://flower-shop-api.herokuapp.com/api`;

const useStyles = makeStyles({
  root: {
    width: 600,
    margin: 20
  },
});

const selectStyles = {
  container: (base: any, state: any) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "transparent",
    zIndex: "999"
  })
};

function CreateFlowerForm() {
  const classes = useStyles();

  const [shopList, setShopList] = useState<any[]>([]);

  const [image, setImage] = useState<string>('');
  const [flowerName, setFlowerName] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [flowerType, setFlowerType] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [occasion, setOccasion] = useState<string>('');
  const [shop, setShop] = useState<any>({ value: 0, label: 'Select shop' });

  const [snackBarStatus, setSnackBarStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    getShopList();
  }, []);

  const getShopList = async () => {
    const response = await axios.get(`${ROOT_URL}/shop`);
    if (response && response.status === 200) {
      if (response.data) {
        const shopList = response.data.shops.map((item: any, i: number) => {
          let obj = {
            value: item.shopId,
            label: item.shopName
          };
          return obj;
        });
        setShopList(shopList);
      }
    }
  }

  const handleFlowerNameChange = (e: any) => {
    setFlowerName(e.target.value);
  }

  const handleColorChange = (e: any) => {
    setColor(e.target.value);
  }

  const handleFlowerTypeChange = (e: any) => {
    setFlowerType(e.target.value);
  }

  const handlePriceChange = (e: any) => {
    setPrice(parseFloat(e.target.value));
  }

  const handleOccasionChange = (e: any) => {
    setOccasion(e.target.value);
  }

  const handleShopChange = (selectedShop: any) => {
    if (selectedShop) {
      setShop(selectedShop);
    }
  }

  const handleCreateFlower = () => {
    if (flowerName && color && flowerType && price && occasion && shop) {
      createFlower(flowerName, color, flowerType, price, occasion, shop);
      setSnackBarStatus('');
      setMessage('');
    }
  }

  const createFlower = async (flowerName: string, color: string, flowerType: string, price: number, occasion: string, shop: any) => {
    const response = await axios.post(`${ROOT_URL}/flower/create-flower`,
      {
        image: '',
        flowerName: flowerName,
        color: color,
        flowerType: flowerType,
        price: price,
        occasion: occasion,
        shopId: shop.value
      },
      {
        headers: {
          'Content-type': 'application/json'
        }
      }
    );
    if (response && response.status === 201) {
      setSnackBarStatus('success');
      setMessage('create flower success');
    } else {
      setSnackBarStatus('error');
      setMessage('create flower error');
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Create flower
          </Typography>
          <TextField className="w-100 my-2" label="Flower name" variant="outlined" onChange={(e) => handleFlowerNameChange(e)} />
          <TextField className="w-100 my-2" label="Color" variant="outlined" onChange={(e) => handleColorChange(e)} />
          <TextField className="w-100 my-2" label="Flower type" variant="outlined" onChange={(e) => handleFlowerTypeChange(e)} />
          <TextField className="w-100 my-2" type="number" label="Price" variant="outlined" onChange={(e) => handlePriceChange(e)} />
          <TextField className="w-100 my-2" label="Occasion" variant="outlined" onChange={(e) => handleOccasionChange(e)} />
          <Select
            className="w-100 my-2"
            styles={selectStyles}
            placeholder={'Select shop'}
            value={shop}
            onChange={handleShopChange}
            options={shopList}
            isClearable={true}
          />
          <Button className="w-100 my-2" variant="contained" size="large" color="primary" onClick={handleCreateFlower}>Create flower</Button>
        </CardContent>
        <CustomSnackBar snackBarStatus={snackBarStatus} message={message} />
      </Card>
    </div>
  );
}

export default CreateFlowerForm;
