import React from 'react';

// navigation tools
import { createStackNavigator } from '@react-navigation/stack';
import * as Types from '../utils/types/NavigationTypes';

// screens
import SearchScreen from '../screens/main/Search/SearchScreen';
import {
  ProfileDetailStackNavigator,
  PostStackNavigator,
  WritingStackNavigator,
} from './CommonNavigator';

// search
const SearchStack = createStackNavigator<Types.SearchStackParam>();
export default function SearchStackNavigator(): React.ReactElement {
  return (
    <SearchStack.Navigator initialRouteName="Search">
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="ProfileDetailStack"
        component={ProfileDetailStackNavigator}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="PostStack"
        component={PostStackNavigator}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="WritingStack"
        component={WritingStackNavigator}
        options={{ headerShown: false }}
      />
    </SearchStack.Navigator>
  );
}