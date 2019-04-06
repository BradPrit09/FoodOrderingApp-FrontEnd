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

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    gridListMain: {
        transform: 'translateZ(0)',
    },
    card: {
        maxWidth: 560,
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
        // Intialized State Variables.
        this.state = {
            id : "",
            restaurantName : "" ,
            photoUrl : "" ,
            userRating : "" ,
            avgPrice : "" ,
            numberUsersRated : "" ,
            address : "" ,
            categories : [],
            restaurantList : []
        }
    }
    

    componentWillMount() {

        // get restaurant data
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        // store relevant details
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    restaurantList : JSON.parse(this.responseText)             
                });

                console.log( JSON.parse(this.responseText) ) ;            
             }
        });

        xhr.open("GET", "http://localhost:8080/api/restaurant");
        xhr.send(data);
    }

    showRestaurantDetails(restaurantId)
    {
        console.log(restaurantId);
        console.log({restaurantId});
        //console.log({this.restaurantId});

        ReactDOM.render(<Details   id={restaurantId}  />, document.getElementById('root'));
    }


    render() {
        const { classes } = this.props;
        return (
            <div className="home">
                <Header />
                HURRAY
                {this.state.restaurantList.map((pic,index) => ( console.log(pic.restaurantName)  ))}


                 <div className="main-body-container">
                    <GridList cellHeight={"auto"} className={classes.gridListMain} cols={3}>
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
                                                <span className="rating">{restaurant.userRating} ({restaurant.numberUsersRated})</span>
                                                <span>{restaurant.avgPrice * 2} for two</span>
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