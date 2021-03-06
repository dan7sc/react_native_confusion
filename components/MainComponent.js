import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { Text, View, ScrollView, Platform, Image, StyleSheet, ToastAndroid } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import { fetchDishes, fetchComments, fetchPromotions, fetchLeaders } from '../redux/ActionCreators';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    }
};

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromotions: () => dispatch(fetchPromotions()),
    fetchLeaders: () => dispatch(fetchLeaders()),
});

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

const ReservationNavigator = createStackNavigator(
    {
        Reservation: {
            screen: Reservation
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

const FavoritesNavigator = createStackNavigator(
    {
        Favorites: {
            screen: Favorites
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

const LoginNavigator = createStackNavigator(
    {
        Login: {
            screen: Login
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
        Login: {
            screen: LoginNavigator,
            navigationOptions: {
                title: 'Login',
                drawerLabel: 'Login',
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='sign-in'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
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
        },
        Favorites: {
            screen: FavoritesNavigator,
            navigationOptions: {
                title: 'My Favorites',
                drawerLabel: 'My Favorites ',
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='heart'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Reservation: {
            screen: ReservationNavigator,
            navigationOptions: {
                title: 'Reserve Table',
                drawerLabel: 'Reserve Table',
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='cutlery'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
    },
    {
        initialRouteName: 'Home',
        drawerBackgroundColor: '#d1c4e9',
        contentComponent: CustomDrawerContentComponent
    }
);

const AppContainer = createAppContainer(MainNavigator);

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prevStateType: ''
        };
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchLeaders();

        NetInfo.fetch()
        .then((connectionInfo) => {
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
                ToastAndroid.LONG);
        });

        NetInfo.addEventListener((state) => {
                this.handleConnectivityChange(state);
        });
    }

    handleConnectivityChange = (connectionInfo) => {
        if (this.state.prevStateType !== connectionInfo.type) {
            this.setState({ prevStateType: connectionInfo.type });
            switch(connectionInfo.type) {
                case 'none':
                    ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
                    break;
                case 'wifi':
                    ToastAndroid.show('You are now connected to wifi!', ToastAndroid.LONG);
                    break;
                case 'cellular':
                    ToastAndroid.show('You are now connected to cellular!', ToastAndroid.LONG);
                    break;
                case 'unknown':
                    ToastAndroid.show('You now have an unknown connection!', ToastAndroid.LONG);
                    break;
                default:
                    break;
            }
        }
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
