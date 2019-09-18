import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Text, View, ScrollView, Platform, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';


const MenuNavigator = createStackNavigator(
    {
        Menu: {
            screen: Menu,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon name='menu' size={24}
                    color='white'
                    onPress={() => navigation.toggleDrawer()}
                    />
            })
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
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512da8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name='menu' size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
                />
        })
    }
);

const AboutNavigator = createStackNavigator(
    {
        About: {
            screen: About
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512da8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name='menu' size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
                />
        })
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: {
            screen: Contact
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512da8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name='menu' size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
                />
        })
    }
);

const CustomDrawerContentComponent = (props) => {
    return(
        <ScrollView>
            <SafeAreaView style={styles.container}
                forceInset={{top: 'always', horizontal: 'never'}}>
                    <View style={styles.drawerHeader}>
                        <View style={{flex: 1}}>
                            <Image source={require('./images/logo.png')}
                                style={styles.drawerImage}
                            />
                        </View>
                        <View style={{flex: 2}}>
                            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                        </View>
                    </View>
                    <DrawerNavigatorItems {...props} />
            </SafeAreaView>
        </ScrollView>
    );
};

const MainNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                title: 'Home',
                drawerLabel: 'Home',
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                title: 'About Us',
                drawerLabel: 'About Us',
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Menu: {
            screen: MenuNavigator,
            navigationOptions: {
                title: 'Menu',
                drawerLabel: 'Menu ',
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                title: 'Contact Us',
                drawerLabel: 'Contact Us',
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={22}
                        color={tintColor}
                    />
                )
            }
        }
    },
    {
        drawerBackgroundColor: '#d1c4e9',
        contentComponent: CustomDrawerContentComponent
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512da8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default Main;
