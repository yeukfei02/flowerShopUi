import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';

import Search from '../components/search/Search';
import Create from '../components/create/Create';
import ShopDetails from '../components/shopDetails/ShopDetails';
import FlowerDetails from '../components/flowerDetails/FlowerDetails';

import CustomAppBar from '../components/customAppBar/CustomAppBar';
import CustomSnackBar from '../components/customSnackBar/CustomSnackBar';
import CreateShopForm from '../components/createShopForm/CreateShopForm';
import CreateFlowerForm from '../components/createFlowerForm/CreateFlowerForm';
import DisplayResult from '../components/displayResult/DisplayResult';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('main.test', () => {
  describe('render test', () => {
    it('Search', () => {
      const wrapper = shallow(<Search />);
      expect(wrapper).toMatchSnapshot();
    });

    it('Create', () => {
      const wrapper = shallow(<Create />);
      expect(wrapper).toMatchSnapshot();
    });

    it('ShopDetails', () => {
      const wrapper = shallow(<ShopDetails />);
      expect(wrapper).toMatchSnapshot();
    });

    it('FlowerDetails', () => {
      const wrapper = shallow(<FlowerDetails />);
      expect(wrapper).toMatchSnapshot();
    });

    it('CustomAppBar', () => {
      const wrapper = shallow(<CustomAppBar />);
      expect(wrapper).toMatchSnapshot();
    });

    it('CustomSnackBar', () => {
      const wrapper = shallow(<CustomSnackBar />);
      expect(wrapper).toMatchSnapshot();
    });

    it('CreateShopForm', () => {
      const wrapper = shallow(<CreateShopForm />);
      expect(wrapper).toMatchSnapshot();
    });

    it('CreateFlowerForm', () => {
      const wrapper = shallow(<CreateFlowerForm />);
      expect(wrapper).toMatchSnapshot();
    });

    it('DisplayResult', () => {
      const wrapper = shallow(<DisplayResult />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
