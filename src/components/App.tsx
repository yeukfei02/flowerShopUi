import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route } from 'react-router-dom';

import Search from './search/Search';
import Create from './create/Create';
import ShopDetails from './shopDetails/ShopDetails';
import FlowerDetails from './flowerDetails/FlowerDetails';

// use default theme
// const theme = createMuiTheme();

// create own theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#cce6ff',
    },
    secondary: {
      main: '#d8d2ee',
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Righteous, sans-serif',
  },
});

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <Switch>
        <Route exact path="/">
          <Search />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/create">
          <Create />
        </Route>
        <Route exact path="/shop/:id">
          <ShopDetails />
        </Route>
        <Route exact path="/flower/:id">
          <FlowerDetails />
        </Route>
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
