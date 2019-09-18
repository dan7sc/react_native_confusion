import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
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

const HomeNavigator = createStackNavigator(
    {
        Home: {
            screen: Home
        }
    },
    {
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

const AboutNavigator = createStackNavigator(
    {
        About: {
            screen: About
        }
    },
    {
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

const ContactNavigator = createStackNavigator(
    {
        Contact: {
            screen: Contact
        }
    },
    {
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

const MainNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                drawerLabel: 'Home'
            }
        },
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                drawerLabel: 'About Us'
            }
        },
        Menu: {
            screen: MenuNavigator,
            navigationOptions: {
                drawerLabel: 'Menu '
            }
        },
        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                drawerLabel: 'Contact Us'
            }
        }
    },
    {
        drawerBackgroundColor: '#d1c4e9'
    }
);

const AppContainer = createAppContainer(MainNavigator);

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
