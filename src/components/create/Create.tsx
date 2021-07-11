import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import CustomAppBar from '../customAppBar/CustomAppBar';
import CreateShopForm from '../createShopForm/CreateShopForm';
import CreateFlowerForm from '../createFlowerForm/CreateFlowerForm';

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

function Create(): JSX.Element {
  const classes = useStyles();

  const [createValue, setCreateValue] = useState<string>('shop');

  const handleCreateShop = (): void => {
    setCreateValue('shop');
  };

  const handleCreateFlower = (): void => {
    setCreateValue('flower');
  };

  const renderCreateForm = (): JSX.Element | null => {
    let createForm = null;

    if (createValue === 'shop') {
      createForm = <CreateShopForm />;
    } else if (createValue === 'flower') {
      createForm = <CreateFlowerForm />;
    }

    return createForm;
  };

  return (
    <div className={classes.root}>
      <CustomAppBar />
      <div className="d-flex justify-content-center my-4">
        <Card className={classes.card}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Button className="w-100" variant="contained" size="large" color="primary" onClick={handleCreateShop}>
                  Create shop
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button className="w-100" variant="contained" size="large" color="primary" onClick={handleCreateFlower}>
                  Create flower
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          {renderCreateForm()}
        </Card>
      </div>
    </div>
  );
}

export default Create;
