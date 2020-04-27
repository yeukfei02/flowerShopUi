import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';

import CustomAppBar from '../customAppBar/CustomAppBar';
import DisplayResult from '../displayResult/DisplayResult';

const ROOT_URL = `https://flower-shop-api.herokuapp.com/api`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    card: {
      width: 600,
      margin: 20
    },
  }),
);

function Search() {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState<string>('shop');

  const [shopName, setShopName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const [flowerName, setFlowerName] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [flowerType, setFlowerType] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [occasion, setOccasion] = useState<string>('');

  const [resultList, setResultList] = useState<any[]>([]);
  const [pageResultList, setPageResultList] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchData(searchValue, page);
  }, []);

  const fetchData = (searchValue: string, page: number) => {
    if (searchValue === 'shop') {
      getAllShop();
      getAllShopByFilter(page);
    } else if (searchValue === 'flower') {
      getAllFlower();
      getAllFlowerByFilter(page);
    }
  }

  const getAllShop = async () => {
    const response = await axios.get(`${ROOT_URL}/shop`);
    if (response && response.status === 200) {
      if (response.data) {
        const shopResultList = response.data.shops.map((item: any, i: number) => {
          return item;
        });
        if (shopResultList)
          setResultList(shopResultList);
      }
    }
  }

  const getAllShopByFilter = async (page: number) => {
    setPageResultList([]);

    let data = {};
    if (shopName) {
      let obj = {
        shopName: shopName
      };
      data = Object.assign(data, obj);
    }
    if (phone) {
      let obj = {
        phone: phone
      };
      data = Object.assign(data, obj);
    }
    if (address) {
      let obj = {
        address: address
      };
      data = Object.assign(data, obj);
    }
    if (page) {
      let obj = {
        page: page
      };
      data = Object.assign(data, obj);
    }

    const response = await axios.get(`${ROOT_URL}/shop`,
      {
        params: data
      }
    );
    if (response && response.status === 200) {
      if (response.data) {
        const shopResultList = response.data.shops.map((item: any, i: number) => {
          return item;
        });
        if (shopResultList) {
          setPageResultList(shopResultList);
        }
      }
    }
  }

  const getAllFlower = async () => {
    const response = await axios.get(`${ROOT_URL}/flower`);
    if (response && response.status === 200) {
      if (response.data) {
        const flowerResultList = response.data.flowers.map((item: any, i: number) => {
          return item;
        });
        if (flowerResultList)
          setResultList(flowerResultList);
      }
    }
  }

  const getAllFlowerByFilter = async (page: number) => {
    setPageResultList([]);

    let data = {};
    if (flowerName) {
      let obj = {
        flowerName: flowerName
      };
      data = Object.assign(data, obj);
    }
    if (color) {
      let obj = {
        color: color
      };
      data = Object.assign(data, obj);
    }
    if (flowerType) {
      let obj = {
        flowerType: flowerType
      };
      data = Object.assign(data, obj);
    }
    if (price) {
      let obj = {
        price: price
      };
      data = Object.assign(data, obj);
    }
    if (occasion) {
      let obj = {
        occasion: occasion
      };
      data = Object.assign(data, obj);
    }
    if (page) {
      let obj = {
        page: page
      };
      data = Object.assign(data, obj);
    }

    const response = await axios.get(`${ROOT_URL}/flower`,
      {
        params: data
      }
    );
    if (response && response.status === 200) {
      if (response.data) {
        const flowerResultList = response.data.flowers.map((item: any, i: number) => {
          return item;
        });
        if (flowerResultList) {
          setPageResultList(flowerResultList);
        }
      }
    }
  }

  const handleSearchShop = () => {
    setSearchValue('shop');
  }

  const handleSearchFlower = () => {
    setSearchValue('flower');
  }

  const handleShopNameChange = (e: any) => {
    setShopName(e.target.value);
  }

  const handlePhoneChange = (e: any) => {
    setPhone(e.target.value);
  }

  const handleAddressChange = (e: any) => {
    setAddress(e.target.value);
  }

  const handleFilterShop = () => {
    setPage(1);
    getAllShopByFilter(1);
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

  const handleFilterFlower = () => {
    setPage(1);
    getAllFlowerByFilter(1);
  }

  const renderSearchDiv = () => {
    let searchDiv = null;

    if (searchValue === 'shop') {
      searchDiv = (
        <div className="p-3">
          <TextField className="w-100 my-2" label="Shop name" variant="outlined" onChange={(e) => handleShopNameChange(e)} />
          <TextField className="w-100 my-2" label="Phone" variant="outlined" onChange={(e) => handlePhoneChange(e)} />
          <TextField className="w-100 my-2" label="Address" variant="outlined" onChange={(e) => handleAddressChange(e)} />
          <Button
            className="w-100 my-2"
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleFilterShop}>
            Filter shop
          </Button>
        </div>
      );
    } else if (searchValue === 'flower') {
      searchDiv = (
        <div className="p-3">
          <TextField className="w-100 my-2" label="Flower name" variant="outlined" onChange={(e) => handleFlowerNameChange(e)} />
          <TextField className="w-100 my-2" label="Color" variant="outlined" onChange={(e) => handleColorChange(e)} />
          <TextField className="w-100 my-2" label="Flower type" variant="outlined" onChange={(e) => handleFlowerTypeChange(e)} />
          <TextField className="w-100 my-2" type="number" label="Price" variant="outlined" onChange={(e) => handlePriceChange(e)} />
          <TextField className="w-100 my-2" label="Occasion" variant="outlined" onChange={(e) => handleOccasionChange(e)} />
          <Button
            className="w-100 my-2"
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleFilterFlower}>
            Filter flower
          </Button>
        </div>
      );
    }

    return searchDiv;
  }

  const renderDisplayResult = () => {
    let displayResult = null;

    if (searchValue && pageResultList) {
      displayResult = (
        <div>
          <DisplayResult searchValue={searchValue} resultList={pageResultList} fetchData={() => fetchData(searchValue, page)} />
          <div className={`${classes.root} d-flex justify-content-center mt-3 mb-5`}>
            <Pagination count={Math.round(resultList.length / 10)} page={page} color="secondary" showFirstButton showLastButton onChange={handlePageChange} />
          </div>
        </div>
      );
    }

    return displayResult;
  }

  const handlePageChange = (event: object, page: number) => {
    if (page) {
      setPage(page);
    }
  }

  return (
    <div className={classes.root}>
      <CustomAppBar />
      <div className="d-flex justify-content-center my-4">
        <Card className={classes.card}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Button
                  className="w-100"
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={handleSearchShop}>
                  Search shop
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  className="w-100"
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={handleSearchFlower}>
                  Search flower
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          {renderSearchDiv()}
        </Card>
      </div>
      {renderDisplayResult()}
    </div>
  )
}

export default Search;
