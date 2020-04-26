import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import CustomAppBar from '../customAppBar/CustomAppBar';
import DisplayResult from '../displayResult/DisplayResult';
import CustomPagination from '../customPagination/CustomPagination';

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

  const [searchValue, setSearchValue] = useState<string>('');
  const [resultList, setResultList] = useState<any[]>([]);

  useEffect(() => {
    if (searchValue === 'shop') {
      getAllShop();
    } else if (searchValue === 'flower') {
      getAllFlower();
    }
  }, [searchValue]);

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

  const handleSearchShop = () => {
    setSearchValue('shop');
    setResultList([]);
  }

  const handleSearchFlower = () => {
    setSearchValue('flower');
    setResultList([]);
  }

  const handleShopNameChange = (e: any) => {

  }

  const handlePhoneChange = (e: any) => {

  }

  const handleAddressChange = (e: any) => {

  }

  const handleFilterShop = () => {

  }

  const handleFlowerNameChange = (e: any) => {

  }

  const handleFilterFlower = () => {

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

    if (searchValue && resultList) {
      displayResult = (
        <div>
          <DisplayResult searchValue={searchValue} resultList={resultList} />
          <CustomPagination totalPage={Math.round(resultList.length / 10)} />
        </div>
      );
    }

    return displayResult;
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
