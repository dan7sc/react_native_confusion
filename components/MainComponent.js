import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, SafeAreaView } from 'react-navigation';


const MenuNavigator = createStackNavigator(
    {
        Menu: {
            screen: Menu
        },
        DishDetail: {
            screen: DishDetail
        }
    },
    {
        initialRouteName: 'Menu',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#512da8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const AppContainer = createAppContainer(MenuNavigator);

class Main extends Component {

    render() {
        return (
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : SafeAreaView.setStatusBarHeight(14)}} >
                <AppContainer />
            </View>
        );
    }
}

export default Main;
