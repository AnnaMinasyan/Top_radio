import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import FilterDrawer from './FilterDrawer';

const Navigator: React.FunctionComponent = () => (
  <NavigationContainer>
    <FilterDrawer />
  </NavigationContainer>
);

export default Navigator;
