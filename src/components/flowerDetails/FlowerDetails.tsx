import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
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

const selectStyles = {
  container: (base: any, state: any) => ({
    ...base,
    opacity: state.isDisabled ? '.5' : '1',
    backgroundColor: 'transparent',
    zIndex: '999',
  }),
};

const getShopList = async () => {
  let result = null;

  const response = await axios.get(`${ROOT_URL}/shop`);
  if (response && response.status === 200) {
    if (response.data) {
      const shopList = response.data.shops.map((item: any, i: number) => {
        const obj = {
          value: item.shopId,
          label: item.shopName,
        };
        return obj;
      });
      result = shopList;
    }
  }

  return result;
};

const getFlowerById = async (id: number) => {
  let result = null;

  const response = await axios.get(`${ROOT_URL}/flower/${id}`);
  if (response && response.status === 200) {
    if (response.data && response.data.flower) {
      result = response.data.flower;
    }
  }

  return result;
};

function FlowerDetails(props: any) {
  const classes = useStyles();
  const history = useHistory();

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

  const id = props.match.params.id;

  useEffect(() => {
    getShopList()
      .then((result: any) => {
        setShopList(result);
      })
      .catch((e: any) => {
        console.log('error = ', e.message);
      });
  }, []);

  useEffect(() => {
    if (id) {
      getFlowerById(id)
        .then((result: any) => {
          setImage(result.image);
          setFlowerName(result.flowerName);
          setColor(result.color);
          setFlowerType(result.flowerType);
          setPrice(result.price);
          setOccasion(result.occasion);

          const shopObj = {
            value: result.shopId,
            label: result.shop.shopName,
          };
          setShop(shopObj);
        })
        .catch((e: any) => {
          console.log('error = ', e.message);
        });
    }
  }, [id]);

  const renderFlowerImage = () => {
    let cardMedia = <CardMedia className={classes.media} image={notFoundImage} />;

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

  const handleFlowerNameChange = (e: any) => {
    setFlowerName(e.target.value);
  };

  const handleColorChange = (e: any) => {
    setColor(e.target.value);
  };

  const handleFlowerTypeChange = (e: any) => {
    setFlowerType(e.target.value);
  };

  const handlePriceChange = (e: any) => {
    setPrice(parseFloat(e.target.value));
  };

  const handleOccasionChange = (e: any) => {
    setOccasion(e.target.value);
  };

  const handleShopChange = (selectedShop: any) => {
    if (selectedShop) {
      setShop(selectedShop);
    }
  };

  const updateFlower = async (
    id: string,
    image: string,
    flowerName: string,
    color: string,
    flowerType: string,
    price: number,
    occasion: string,
    shop: any,
  ) => {
    const response = await axios.patch(
      `${ROOT_URL}/flower/${id}`,
      {
        image: image,
        flowerName: flowerName,
        color: color,
        flowerType: flowerType,
        price: price,
        occasion: occasion,
        shopId: shop.value,
      },
      {
        headers: {
          'Content-type': 'application/json',
        },
      },
    );
    if (response && response.status === 200) {
      setSnackBarStatus('success');
      setMessage('update flower success');
    } else {
      setSnackBarStatus('error');
      setMessage('update flower error');
    }
  };

  const handleUpdateFlower = () => {
    if (image && flowerName && color && flowerType && price && occasion && shop) {
      updateFlower(id, image, flowerName, color, flowerType, price, occasion, shop);
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
              Flower details
            </Typography>
            {renderFlowerImage()}
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
              value={flowerName}
              label="Flower name"
              variant="outlined"
              onChange={(e) => handleFlowerNameChange(e)}
            />
            <TextField
              className="w-100 my-2"
              value={color}
              label="Color"
              variant="outlined"
              onChange={(e) => handleColorChange(e)}
            />
            <TextField
              className="w-100 my-2"
              value={flowerType}
              label="Flower type"
              variant="outlined"
              onChange={(e) => handleFlowerTypeChange(e)}
            />
            <TextField
              className="w-100 my-2"
              value={price}
              type="number"
              label="Price"
              variant="outlined"
              onChange={(e) => handlePriceChange(e)}
            />
            <TextField
              className="w-100 my-2"
              value={occasion}
              label="Occasion"
              variant="outlined"
              onChange={(e) => handleOccasionChange(e)}
            />
            <Select
              className="w-100 my-2"
              styles={selectStyles}
              placeholder={'Select shop'}
              value={shop}
              onChange={handleShopChange}
              options={shopList}
              isClearable={true}
            />
            <Button
              className="w-100 my-2"
              variant="contained"
              size="large"
              color="primary"
              onClick={handleUpdateFlower}
            >
              Update flower
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

export default withRouter(FlowerDetails);
