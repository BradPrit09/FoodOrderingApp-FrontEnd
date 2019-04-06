import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Home.css';
import Header from '../../common/header/Header';
import { GridListTile, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
import Details from '../details/Details';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faStar);
library.add(faRupeeSign);

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    gridListMain: {
        transform: 'translateZ(0)',
    },
    card: {
        maxWidth: 420,
        margin: 10,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    title: {
        fontWeight: 'strong',
        color: 'red',
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});


class Home extends Component {
    constructor() {
        super();
        // Intialized State Variable to store restaurantList
        this.state = {
            restaurantList : []
        }
    }
    
    componentWillMount() {
        // get restaurant data from api
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        // store relevant restraunt Details
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    restaurantList : JSON.parse(this.responseText),
                    restaurants: JSON.parse(this.responseText)
                });
             }
        });
        xhr.open("GET", "http://localhost:8085/api/restaurant");
        xhr.send(data);
    }

    /* This function is called on click of card and it redirects to details page corresponding to the restaurant selected  */
    showRestaurantDetails(restaurantId)
    {
        ReactDOM.render(<Details   id={restaurantId}  />, document.getElementById('root'));
    }

    // Calling in on clicking search
    searchClickHandler = (query) => {
        if (query !== "") {
        let xhr = new XMLHttpRequest();
        let that = this;
        // store relevant restraunt Details
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                
                that.setState({
                    restaurantList : JSON.parse(this.responseText)             
                });
             }
        });
        xhr.open("GET", "http://localhost:8080/api/restaurant/name/"+query);
        xhr.send(null);
        }
        else {
            this.setState({
                restaurantList: this.state.restaurants
            })
        }
    }


    render() {
        const { classes } = this.props;
        return (
            <div className="home">
                <Header searchClickHandler={this.searchClickHandler}/>
                {/* Map over the List and then display all details of all restaurants. */}
                {this.state.restaurantList.map((pic,index) => ( console.log(pic.restaurantName)  ))}

                 <div className="main-body-container">
                    <GridList cellHeight={"auto"} className={classes.gridListMain} cols={4}>
                        {/**Check implementation of onClick for GridListTile. If we directly write method name then it executes immediately*/}
                        {this.state.restaurantList.map(restaurant => (
                            <GridListTile onClick={() => this.showRestaurantDetails(restaurant.id)}>
                                <Card key={restaurant.id} className="image-post">
                                    <CardContent>
                                        <img src={restaurant.photoUrl} alt="RestaurantImage" />
                                        <Typography>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {restaurant.restaurantName}
                                            </Typography>
                                            <p>{restaurant.categories}</p>
                                            <div>
                                                <span className="rating"> <FontAwesomeIcon icon="star" />{restaurant.userRating} ({restaurant.numberUsersRated})</span>
                                                <span className="price">  <FontAwesomeIcon icon="rupee-sign"  /> {restaurant.avgPrice * 2} for two</span>
                                            </div>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
               
            </div>
        ) }

}
export default withStyles(styles)(Home);