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

function CreateFlowerForm() {
  const classes = useStyles();

  const [flowerName, setFlowerName] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [flowerType, setFlowerType] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [occasion, setOccasion] = useState<string>('');

  const handleFlowerNameChange = (e: any) => {
    if (e.target.value)
      setFlowerName(e.target.value);
  }

  const handleColorChange = (e: any) => {
    if (e.target.value)
      setColor(e.target.value);
  }

  const handleFlowerTypeChange = (e: any) => {
    if (e.target.value)
      setFlowerType(e.target.value);
  }

  const handlePriceChange = (e: any) => {
    if (e.target.value)
      setPrice(e.target.value);
  }

  const handleOccasionChange = (e: any) => {
    if (e.target.value)
      setOccasion(e.target.value);
  }

  const handleCreateFlower = () => {
    if (flowerName && color && flowerType && price && occasion)
      createFlower(flowerName, color, flowerType, price, occasion);
  }

  const createFlower = async (flowerName: string, color: string, flowerType: string, price: number, occasion: string) => {
    const response = await axios.post(`${ROOT_URL}/shop/create-flower`,
      {
        flowerName: flowerName,
        color: color,
        flowerType: flowerType,
        price: price,
        occasion: occasion
      }
    );
    console.log("response = ", response);
  }

  return (
    <div className="d-flex justify-content-center my-4">
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
          <Button className="w-100 my-2" variant="contained" size="large" color="primary" onClick={handleCreateFlower}>Create flower</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateFlowerForm;
