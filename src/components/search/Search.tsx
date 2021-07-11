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
      margin: 20,
    },
  }),
);

const getAllShop = async (): Promise<any> => {
  let result = null;

  const response = await axios.get(`${ROOT_URL}/shop`);
  if (response && response.status === 200) {
    if (response.data) {
      result = response.data.shops;
    }
  }

  return result;
};

const getAllShopByFilter = async (shopName: string, phone: string, address: string, page: number): Promise<any> => {
  let data = {};
  if (shopName) {
    const obj = {
      shopName: shopName,
    };
    data = Object.assign(data, obj);
  }
  if (phone) {
    const obj = {
      phone: phone,
    };
    data = Object.assign(data, obj);
  }
  if (address) {
    const obj = {
      address: address,
    };
    data = Object.assign(data, obj);
  }
  if (page) {
    const obj = {
      page: page,
    };
    data = Object.assign(data, obj);
  }

  let result = null;

  const response = await axios.get(`${ROOT_URL}/shop`, {
    params: data,
  });
  if (response && response.status === 200) {
    if (response.data) {
      result = response.data.shops;
    }
  }

  return result;
};

const getAllFlower = async (): Promise<any> => {
  let result = null;

  const response = await axios.get(`${ROOT_URL}/flower`);
  if (response && response.status === 200) {
    if (response.data) {
      result = response.data.flowers;
    }
  }

  return result;
};

const getAllFlowerByFilter = async (
  flowerName: string,
  color: string,
  flowerType: string,
  price: number,
  occasion: string,
  page: number,
): Promise<any> => {
  let data = {};
  if (flowerName) {
    const obj = {
      flowerName: flowerName,
    };
    data = Object.assign(data, obj);
  }
  if (color) {
    const obj = {
      color: color,
    };
    data = Object.assign(data, obj);
  }
  if (flowerType) {
    const obj = {
      flowerType: flowerType,
    };
    data = Object.assign(data, obj);
  }
  if (price) {
    const obj = {
      price: price,
    };
    data = Object.assign(data, obj);
  }
  if (occasion) {
    const obj = {
      occasion: occasion,
    };
    data = Object.assign(data, obj);
  }
  if (page) {
    const obj = {
      page: page,
    };
    data = Object.assign(data, obj);
  }

  let result = null;

  const response = await axios.get(`${ROOT_URL}/flower`, {
    params: data,
  });
  if (response && response.status === 200) {
    if (response.data) {
      result = response.data.flowers;
    }
  }

  return result;
};

function Search(): JSX.Element {
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
    if (searchValue && page) fetchData(searchValue, page);
  }, [searchValue, page]);

  const fetchData = async (searchValue: string, page: number): Promise<void> => {
    if (searchValue === 'shop') {
      await getAllShopRequest();

      await getAllShopFilterRequest(shopName, phone, address, page);
    } else if (searchValue === 'flower') {
      await getAllFlowerRequest();

      await getAllFlowerFilterRequest(flowerName, color, flowerType, price, occasion, page);
    }
  };

  const getAllShopRequest = async (): Promise<void> => {
    const result = await getAllShop();
    if (result) {
      setResultList(result);
    }
  };

  const getAllShopFilterRequest = async (
    shopName: string,
    phone: string,
    address: string,
    page: number,
  ): Promise<void> => {
    const result = await getAllShopByFilter(shopName, phone, address, page);
    if (result) {
      setPageResultList(result);
    }
  };

  const getAllFlowerRequest = async (): Promise<void> => {
    const result = await getAllFlower();
    if (result) {
      setResultList(result);
    }
  };

  const getAllFlowerFilterRequest = async (
    flowerName: string,
    color: string,
    flowerType: string,
    price: number,
    occasion: string,
    page: number,
  ): Promise<void> => {
    const result = await getAllFlowerByFilter(flowerName, color, flowerType, price, occasion, page);
    if (result) {
      setPageResultList(result);
    }
  };

  const handleSearchShop = (): void => {
    setSearchValue('shop');
  };

  const handleSearchFlower = (): void => {
    setSearchValue('flower');
  };

  const handleShopNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setShopName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setPhone(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setAddress(e.target.value);
  };

  const handleFilterShop = async (): Promise<void> => {
    setPage(1);

    await getAllShopFilterRequest(shopName, phone, address, 1);
  };

  const handleFlowerNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setFlowerName(e.target.value);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setColor(e.target.value);
  };

  const handleFlowerTypeChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setFlowerType(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setPrice(parseFloat(e.target.value));
  };

  const handleOccasionChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setOccasion(e.target.value);
  };

  const handleFilterFlower = async (): Promise<void> => {
    setPage(1);

    await getAllFlowerFilterRequest(flowerName, color, flowerType, price, occasion, 1);
  };

  const renderSearchDiv = (): JSX.Element | null => {
    let searchDiv = null;

    if (searchValue === 'shop') {
      searchDiv = (
        <div className="p-3">
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
          <Button className="w-100 my-2" variant="contained" size="large" color="secondary" onClick={handleFilterShop}>
            Filter shop
          </Button>
        </div>
      );
    } else if (searchValue === 'flower') {
      searchDiv = (
        <div className="p-3">
          <TextField
            className="w-100 my-2"
            label="Flower name"
            variant="outlined"
            onChange={(e) => handleFlowerNameChange(e)}
          />
          <TextField className="w-100 my-2" label="Color" variant="outlined" onChange={(e) => handleColorChange(e)} />
          <TextField
            className="w-100 my-2"
            label="Flower type"
            variant="outlined"
            onChange={(e) => handleFlowerTypeChange(e)}
          />
          <TextField
            className="w-100 my-2"
            type="number"
            label="Price"
            variant="outlined"
            onChange={(e) => handlePriceChange(e)}
          />
          <TextField
            className="w-100 my-2"
            label="Occasion"
            variant="outlined"
            onChange={(e) => handleOccasionChange(e)}
          />
          <Button
            className="w-100 my-2"
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleFilterFlower}
          >
            Filter flower
          </Button>
        </div>
      );
    }

    return searchDiv;
  };

  const handlePageChange = (event: object, page: number): void => {
    if (page) {
      setPage(page);
    }
  };

  const renderDisplayResult = (): JSX.Element | null => {
    let displayResult = null;

    if (searchValue && pageResultList) {
      displayResult = (
        <div>
          <DisplayResult
            searchValue={searchValue}
            resultList={pageResultList}
            fetchData={() => fetchData(searchValue, page)}
          />
          <div className={`${classes.root} d-flex justify-content-center mt-3 mb-5`}>
            <Pagination
              count={Math.round(resultList.length / 10)}
              page={page}
              color="secondary"
              showFirstButton
              showLastButton
              onChange={handlePageChange}
            />
          </div>
        </div>
      );
    }

    return displayResult;
  };

  return (
    <div className={classes.root}>
      <CustomAppBar />
      <div className="d-flex justify-content-center my-4">
        <Card className={classes.card}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Button className="w-100" variant="contained" size="large" color="primary" onClick={handleSearchShop}>
                  Search shop
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button className="w-100" variant="contained" size="large" color="primary" onClick={handleSearchFlower}>
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
  );
}

export default Search;
