import { Button } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import React, { Component } from 'react';
import Header from '../../common/header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import './Details.css';
library.add(faStar);
library.add(faRupeeSign);
library.add(faCircle);

const styles = theme => ({
    snackbar: {
        margin: theme.spacing.unit,
    },
    margin: {
        margin: theme.spacing.unit * -0.25,
    },
});

class Details extends Component {

    constructor() {
        super();
        this.state = {
            //Snackbar Message Item
            open: false,
            vertical: 'top',
            horizontal: 'center',
            cartNotificationMessage: '',
            cartItems: [],
            totalCartItemsValue: 0,
            restaurantDetails: '',
            address: '',
            categories: []
        }
    }

    componentWillMount() {
        /**API to fetch restaurant Details*/
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
            
                that.setState({
                    restaurantDetails: JSON.parse(this.responseText),
                    address: JSON.parse(this.responseText).address,
                    categories: JSON.parse(this.responseText).categories,
                });
            }
        });


        /**Extracted Dynamically passed restaurantId from params */
        xhr.open("GET", "http://localhost:8080/api/restaurant/" + this.props.match.params.restaurantID);
        xhr.send();
    }

    addMenuItemClickHandler = (item) => {
        //set new attribute quantity for the cart
        let newCartItems = this.state.cartItems;
        let itemAlreadyAdded = false;
        if (newCartItems != null) {
            for (var i = 0; i < newCartItems.length; i++) {
                if (newCartItems[i].id === item.id) {
                    item.quantity = item.quantity + 1;
                    item.totalPrice = item.quantity * item.price;
                    itemAlreadyAdded = true;
                    break;
                }
            }
        }
        if (!itemAlreadyAdded) {
            item.quantity = 1;
            item.totalPrice = item.quantity * item.price;
            newCartItems.push(item);
        }
        this.setState({ cartItems: newCartItems, open: true, cartNotificationMessage: 'Item added to cart!' });
        this.updateTotalCartItemsValue(true, item.price);
    };

    addCartItemClickHandler = (item) => {
        item.quantity = item.quantity + 1;
        this.setState({ open: true, cartNotificationMessage: 'Item quantity increased by 1!' });
        this.updateTotalCartItemsValue(true, item.price);
    };

    removeCartItemClickHandler = (item) => {
        let removeCartItems = this.state.cartItems;
        for (var i = 0; i < removeCartItems.length; i++) {
            if (removeCartItems[i].id === item.id) {
                if (item.quantity > 1) {
                    item.quantity = item.quantity - 1;
                    item.totalPrice = item.quantity * item.price;
                } else {
                    removeCartItems.splice(i, 1);
                    item.totalPrice = 0;
                }
            }
        }
        this.setState({ cartItems: removeCartItems, open: true, cartNotificationMessage: 'Item quantity decreased by 1!' });
        this.updateTotalCartItemsValue(false, item.price);
    };

    updateTotalCartItemsValue(isAdded, price) {
        let newTotalCartItemsValue = this.state.totalCartItemsValue;
        if (isAdded) {
            newTotalCartItemsValue = newTotalCartItemsValue + price;
        } else {
            newTotalCartItemsValue = newTotalCartItemsValue - price;
        }
        this.setState({ totalCartItemsValue: newTotalCartItemsValue });
    }

    onClickCheckoutButton = state => () => {
        this.props.history.push({
            pathname: '/checkout',
            state: { cartItems: this.state.cartItems, totalCartItemsValue: this.state.totalCartItemsValue }
        })
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        let restaurantDetails = this.state.restaurantDetails

        return (
            <div>
                <Header showSearch="false" />
                <div>
                    <div className="details-header-bg">
                        <div className="details-restImage">
                            <span>
                                <img className="restaurant-image" src={this.state.restaurantDetails.photoUrl} alt="RestaurantImage" />
                            </span>
                        </div>
                        <div className="details-restDetails">
                            <span>
                                {/**For adjacent state fields need to wrap them in some parent component */}
                                <Typography gutterBottom variant="h4" component="h2">
                                    {restaurantDetails.restaurantName}
                                </Typography>
                                <Typography variant="h6">{this.state.address.locality}</Typography>
                                <br />
                                <Typography variant="subtitle1" gutterBottom>
                                    {this.state.categories.map(category => (
                                        <span key={"category" + category.id}>{category.categoryName}, </span>
                                    ))}
                                </Typography>
                            </span>
                            <div className="details-rating-price">
                                <div className="details-users">
                                    <div>
                                        <FontAwesomeIcon icon="star" />
                                        <span className="details-rating">{restaurantDetails.userRating}</span>
                                    </div>
                                    <div>
                                        <Typography variant="caption">
                                            <span>AVERAGERATINGBY </span>
                                            <br />
                                            <span className="details-usersRated">{restaurantDetails.numberUsersRated} </span>
                                            <span>USERS</span>
                                        </Typography>
                                    </div>
                                </div>
                                <div className="details-pricing">
                                    <div className="details-price">
                                        <FontAwesomeIcon icon="rupee-sign" />
                                        <span className="details-rating">{restaurantDetails.avgPrice * 2}</span>
                                    </div>
                                    <div className="details-price">
                                        <Typography variant="caption">AVERAGECOSTFOR TWO PEOPLE</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="menu-cart-items">
                        <div className="menu-items">
                            {this.state.categories.map(category => (
                                <div key={"categoryItems" + category.id}>
                                    <h3 className="category-name">{category.categoryName} </h3>
                                    <Divider />
                                    <br />
                                    {category.items.map(item => (
                                        <div className="itemContainer" key={"item" + item.id}>
                                            <div className="div-container div-items">{item.type === 'Veg' &&
                                                <FontAwesomeIcon icon="circle" className="veg-item-color" />}
                                                {item.type === 'Non-Veg' &&
                                                    <FontAwesomeIcon icon="circle" className="non-veg-item-color" />} {item.itemName}
                                            </div>
                                            {/*<div className="div-container"> {item.itemName}</div>*/}

                                            <div className="div-container price-container"> <FontAwesomeIcon icon="rupee-sign" />
                                                {item.price}</div>
                                            <div className="plus-container">
                                                <IconButton
                                                    key="close"
                                                    aria-label="Close"
                                                    color="inherit"
                                                    onClick={() => this.addMenuItemClickHandler(item)}>
                                                    <Add />
                                                </IconButton></div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="my-cart">
                            <Card>
                                <CardContent>
                                    <div>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <Badge badgeContent={this.state.cartItems.length} color="primary" classes={{ badge: classes.margin }}>
                                            <ShoppingCart />
                                        </Badge>
                                         <span style={{marginLeft:'20px'}}>My Cart</span>
                                    </Typography>
                                    </div>
                                    {this.state.cartItems.map(item => (
                                        <div className="order-body-container" key={"item" + item.id}>
                                            <div className="div-container div-items">{item.type === 'Veg' &&
                                                <FontAwesomeIcon icon="circle" className="veg-item-color" />}
                                                {item.type === 'Non-Veg' &&
                                                    <FontAwesomeIcon icon="circle" className="non-veg-item-color" />}    {item.itemName}
                                            </div>
                                            <div>
                                                <IconButton
                                                    key="close"
                                                    aria-label="Close"
                                                    color="inherit"
                                                    onClick={() => this.removeCartItemClickHandler(item)}>
                                                    <Remove />
                                                </IconButton>
                                            </div>
                                            <div className="div-container"> {item.quantity}</div>
                                            <div>
                                                <IconButton
                                                    key="close"
                                                    aria-label="Close"
                                                    color="inherit"
                                                    onClick={() => this.addCartItemClickHandler(item)}>
                                                    <Add />
                                                </IconButton>
                                            </div>
                                            <div className="div-container"><FontAwesomeIcon icon="rupee-sign" /> {item.totalPrice * item.quantity}</div>
                                        </div>

                                    ))}
                                    <div className="body-container">
                                    <span style={{fontWeight:'bold'}} className="div-container div-items">TOTAL AMOUNT </span>   
                                    <span className="rupee-container"><FontAwesomeIcon icon="rupee-sign" /> {this.state.totalCartItemsValue}</span>
                                    </div>
                                    <br/>
                                    <Button  className="button-container" style={{marginLeft:'55px'}} variant="contained" color="primary"
                                        onClick={this.onClickCheckoutButton({ vertical: 'bottom', horizontal: 'left' })}
                                    >
                                        CHECKOUT
                                    </Button>
                                    <Snackbar
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                        ContentProps={{
                                            'aria-describedby': 'message-id',
                                        }}
                                        message={<span id="message-id">{this.state.cartNotificationMessage}</span>}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default withStyles(styles)(Details);
