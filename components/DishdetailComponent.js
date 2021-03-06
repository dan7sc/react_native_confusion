import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
};

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props) {
    const dish = props.dish;

    handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({moveX, moveY, dx, dy}) => {
        if (dx < -200)
            return true;
        else
            return false;
    };

    const recognizeComment = ({moveX, moveY, dx, dy}) => {
        if (dx > 200)
            return true;
        else
            return false;
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'))
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add to Favorites?',
                    'Are you sure you wish to add ' + dish.name + ' to your favorites?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style:'cancel'
                        },
                        {
                            text: 'OK',
                            onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}
                        }
                    ],
                    { cancelable: false }
                )
            }
            else if (recognizeComment(gestureState)) {
                props.toggleModal();
            }
            return true;
        }
    });

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },
        {
            dialogTitle: 'Share ' + title
        });
    }

    if (dish != null) {
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers} >
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}
                >
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={styles.formRow}>
                        <Icon
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                        <Icon
                            raised
                            reverse
                            name={'pencil'}
                            type='font-awesome'
                            color='#512da8'
                            onPress={() => props.toggleModal()}
                        />
                        <Icon
                            raised
                            reverse
                            name={'share'}
                            type='font-awesome'
                            color='#512da8'
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else {
        return (
            <View></View>
        );
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14, marginTop: 5}}>{item.comment}</Text>
                <Rating
                    style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5}}
                    type='star'
                    fractions={0}
                    count={5}
                    startingValue={item.rating}
                    imageSize={12} />
                <Text style={{fontSize: 12, marginTop: 5}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    };

    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000} >
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

function RenderModal(props) {
    return (
        <Modal
            animationType={'slide'}
            transparent={false}
            visible={props.showModal}
            onDismiss={() => props.toggleModal()} >
            <View style={styles.modal}>
                <Rating
                    type='star'
                    showRating
                    fractions={0}
                    count={5}
                    minValue={1}
                    startingValue={1}
                    imageSize={32}
                    onFinishRating={(rating) => props.values.rating = rating} />
                <Input
                    onChangeText={(value)=> {props.values.author = value}}
                    style={styles.modalText}
                    placeholder='Author'
                    leftIcon={
                        <Icon
                            name='user'
                            type='font-awesome'
                            size={24}
                            color='gray' />
                    } />
                <Input
                    onChangeText={(value) => {props.values.comment = value}}
                    style={styles.modalText}
                    placeholder='Comment'
                    leftIcon={
                        <Icon
                            name='comment'
                            type='font-awesome'
                            size={24}
                            color='gray' />                             
                    } />
                <View style={styles.button}>
                    <Button
                        onPress={() => {
                            props.toggleModal();
                            props.handleComment(props.dishId, props.values.rating, props.values.author, props.values.comment);
                            props.resetForm();
                        }}
                        color='#512da8'
                        title='Submit' />
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={() => {props.toggleModal(); props.resetForm()}}
                        color='gray'
                        title='Cancel' />
                </View>
            </View>
        </Modal>
    );
}

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 1,
            author: '',
            comment: '',
            date: new Date(),
            showModal: false
        }
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    toggleModal() {
        this.setState({ showModal: !this.state.showModal})
    }

    handleComment(dishId, rating, author, comment) {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
        this.props.postComment(dishId, rating, author, comment);
    }

    resetForm() {
        this.setState({
            rating: 1,
            author: '',
            comment: ''
        });
    }

    render() {
        const values = this.state;
        const dishId = this.props.navigation.getParam('dishId', '');
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some((favorite) => favorite === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={() => this.toggleModal()}
                />
                <RenderModal toggleModal={() => this.toggleModal()}
                    showModal={this.state.showModal}
                    resetForm={() => this.resetForm()}
                    dishId={dishId}
                    values={this.state}
                    handleComment={() => this.handleComment(dishId, values.rating, values.author, values.comment)} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
            
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512da8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    },
    button: {
        marginTop: 20,
        marginRight: 30,
        marginLeft: 30
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
