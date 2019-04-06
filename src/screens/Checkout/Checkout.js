import React, { Component } from 'react';
import './Checkout.css';
import Header from '../../common/header/Header';
import { GridListTile, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CheckCircle from '@material-ui/icons/CheckCircle';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    gridListMain: {
        flexWrap: 'nowrap',
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
    button: {
        margin: '20px'
    }
});

function getSteps() {
  return ['Delivery', 'Payment'];
}

function isNum(val) {
    return /^\d+$/.test(val);
}


class Checkout extends Component {
    constructor() {
        super();
        // Intialized State Variables.
        this.state = {
            id : "",
            value:"",
            tabValue: 0,
            activeStep: 0,
            flat:"",
            city:"",
            locality:"",
            zipcode:"",
            statename:"",
            iconClass:"",
            addressClass:"",
            flatRequired: "dispNone",
            cityRequired: "dispNone",
            stateRequired: "dispNone",
            zipcodeRequired: "dispNone",
            localityRequired: "dispNone",
            incorrectZipcode: "dispNone",
            orderPlaced: "dispNone",
            incorrectDetails:"",
            address : "" ,
            categories : [],
            totalCartItemsValue: "700",
            cartItems: [
                    {
                        "id": 1,
                        "itemName": "Hakka Noodles",
                        "type": "Veg",
                        "quantity": "1",
                        "price": "200"
                    },
                    {
                        "id": 2,
                        "itemName": "Maggi",
                        "type": "Veg",
                        "quantity": "1",
                        "price": "100"
                    },
                    {
                        "id": 3,
                        "itemName": "Paneer Makhani",
                        "type": "Veg",
                        "quantity": "2",
                        "price": "250"
                    }
                    ],
            paymentModes: [
                    {
                        "id": 1,
                        "paymentName": "Cash on Delivery"
                    },
                    {
                        "id": 2,
                        "paymentName": "Wallet"
                    },
                    {
                        "id": 3,
                        "paymentName": "Net Banking"
                    },
                    {
                        "id": 4,
                        "paymentName": "COD"
                    },
                    {
                        "id": 5,
                        "paymentName": "Debit/Credit Card"
                    }
                    ],
            addresses: [
            {
                "id": 1,
                "flatBuilNo": "501/31 Mahalaxmi SRA CHS",
                "locality": "Prabhadevi",
                "city": "Mumbai",
                "zipcode": "400015",
                "state": {
                    "id": 21,
                    "stateName": "Maharashtra"
                }
            },
            {
                "id": 2,
                "flatBuilNo": "#501",
                "locality": "Bellandur",
                "city": "Bangalore",
                "zipcode": "560087",
                "state": {
                    "id": 20,
                    "stateName": "Karnataka"
                }
            },
            {
                "id": 3,
                "flatBuilNo": "1209B",
                "locality": "Amarjyothi Layout",
                "city": "Hyderabad",
                "zipcode": "401003",
                "state": {
                    "id": 18,
                    "stateName": "Andhra Pradesh"
                }
            },
            {
                "id": 4,
                "flatBuilNo": "1209B",
                "locality": "Amarjyothi Layout",
                "city": "Hyderabad",
                "zipcode": "401003",
                "state": {
                    "id": 18,
                    "stateName": "Andhra Pradesh"
                }
            },
            ]
        }
    }
    

    componentWillMount() {

        // get restaurant data
        let data = null;
        let xhr = new XMLHttpRequest();
        let xhr1 = new XMLHttpRequest();
        // store relevant details
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                // that.setState({
                //     addresses : JSON.parse(this.responseText)             
                // });

               // console.log( JSON.parse(this.responseText) ) ;            
             }
        });

        xhr.open("GET", "http://localhost:8085/api/address/user");
        xhr.send(data);

        xhr1.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                // that.setState({
                //     paymentModes : JSON.parse(this.responseText)             
                // });          
             }
        });

        xhr1.open("GET", "http://localhost:8085/api/payment");
        xhr1.send(data);

    }

    tabChangeHandler = (event, tabValue) => {
        this.setState({ tabValue });
    }


  handleNext = () => {
    if (this.state.tabValue === 1) {
    this.state.flat === "" ? this.setState({ incorrectDetails:"true", flatRequired: "dispBlock" }) : this.setState({  incorrectDetails:"false", flatRequired: "dispNone" });
    this.state.city === "" ? this.setState({ incorrectDetails:"true", cityRequired: "dispBlock" }) : this.setState({  incorrectDetails:"false",cityRequired: "dispNone" });
    this.state.locality === "" ? this.setState({ incorrectDetails:"true", localityRequired: "dispBlock" }) : this.setState({  incorrectDetails:"false", localityRequired: "dispNone" });
    this.state.zipcode === "" ? this.setState({ incorrectDetails:"true", zipcodeRequired: "dispBlock" }) : this.setState({  incorrectDetails:"false",zipcodeRequired: "dispNone" });
    if (this.state.zipcode !=="" )
    {
      if (this.state.zipcode.length === 6 && isNum(this.state.zipcode)) {
        this.setState({ incorrectDetails:"false", incorrectZipcode: "dispNone" }) 
      }
      else {
        this.setState({ incorrectDetails:"true", incorrectZipcode: "dispBlock" })
      }
    }
    if (this.state.incorrectDetails === "false") {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
    }
  }
  else if (this.state.tabValue === 0) {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  }

  if (this.state.activeStep === 1) {
    this.setState(state => ({
      orderPlaced: "dispBlock",
    }));     
  }

};

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

    inputFlatChangeHandler = (e) => {
        this.setState({ flat: e.target.value });
    }

    inputCityChangeHandler = (e) => {
        this.setState({ city: e.target.value });
    }

    inputLocalityChangeHandler = (e) => {
        this.setState({ locality: e.target.value });
    }

    inputZipcodeChangeHandler = (e) => {
        this.setState({ zipcode: e.target.value });
    }

    inputStateChangeHandler = (e) => {
        this.setState({ statename: e.target.value });
    }

    changeHandler = () => {
       // ReactDOM.render(<Checkout />);
    }

    iconClickHandler = () => {
        this.setState({ 
            addressClass: "selectionGrid" ,
            iconClass: "green"
        });
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        return (
            <div className="checkout">
                <Header />
                 <div className="main-body-container">
                    <div>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => {
                            return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                {index === 0 &&
                                <div>
                                <Tabs className="tabs" value={this.state.tabValue} onChange={this.tabChangeHandler}>
                                    <Tab label="EXISTING ADDRESS" />
                                    <Tab label="NEW ADDRESS" />
                                </Tabs>

                                {this.state.tabValue === 0 && 
                                <GridList cellHeight={"auto"} className={classes.gridListMain} cols={3}>
                                    {this.state.addresses.map(address => (
                                    <GridListTile style={{padding:'20px'}}>
                                    <div className={this.state.addressClass} style={{ padding:'10px' }}>
                                        <Typography style={{ fontSize:'20px',marginRight:'20px',marginBottom:'5px'}}>{address.flatBuilNo}</Typography>
                                        <Typography style={{ fontSize:'20px',marginRight:'20px',marginBottom:'10px'}}>{address.locality}</Typography>
                                        <Typography style={{ fontSize:'20px',marginRight:'20px',marginBottom:'10px'}}>{address.city}</Typography>
                                        <Typography style={{ fontSize:'20px',marginRight:'20px',marginBottom:'10px'}}>{address.state.stateName}</Typography>
                                        <Typography style={{ fontSize:'20px',marginRight:'20px',marginBottom:'10px'}}>{address.zipcode}</Typography>
                                        <IconButton className={this.state.iconClass} style={{marginLeft:'60%'}} onClick={this.iconClickHandler}>
                                            <CheckCircle/>
                                        </IconButton>
                                    </div>
                                    </GridListTile>
                                    ))}
                                    </GridList>
                                }
                                {this.state.tabValue === 1 && 
                                <div className="dispFlex">
                                <FormControl required>
                                    <InputLabel htmlFor="flat">Flat/Building No.</InputLabel>
                                    <Input id="flat" type="text" flat={this.state.flat}
                                        onChange={this.inputFlatChangeHandler} />
                                    <FormHelperText className={this.state.flatRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="locality">Locality</InputLabel>
                                    <Input id="locality" locality={this.state.locality}
                                        onChange={this.inputLocalityChangeHandler} />
                                    <FormHelperText className={this.state.localityRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="city">City</InputLabel>
                                    <Input id="city" city={this.state.city}
                                        onChange={this.inputCityChangeHandler} />
                                    <FormHelperText className={this.state.cityRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="statename">State</InputLabel>
                                    <Input id="statename" statename={this.state.statename}
                                        onChange={this.inputStatePasswordChangeHandler} />
                                    <FormHelperText className={this.state.stateRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="zipcode">Zipcode</InputLabel>
                                    <Input id="zipcode" zipcode={this.state.zipcode}
                                        onChange={this.inputZipcodeChangeHandler} />
                                    <FormHelperText className={this.state.zipcodeRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                            <FormHelperText className={this.state.incorrectZipcode}>
                                <span className="red">Zipcode must contain only numbers and must be 6 digits long</span>
                            </FormHelperText>
                                </FormControl>
                                <br /><br />
                                </div>
                                }
                                </div>
                                }
                                {
                                    index === 1  && 
                                    <div>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Select Mode of Payment</FormLabel>
                                    <RadioGroup
                                        aria-label="Gender"
                                        name="gender1"
                                        className={classes.group}
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                    >
                                    {this.state.paymentModes.map((payment) => {
                                        return (
                                        <FormControlLabel value={payment.paymentName} control={<Radio />} label={payment.paymentName} />
                                        )
                                    })}
                                    </RadioGroup>
                                    </FormControl>
                                    </div>
                                }
        <div className={classes.actionsContainer}>
                                    <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={this.handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                    </div>
                                </div>
                                </StepContent>
                            </Step>
                            );
                        })}
        </Stepper>
        
        <div className={this.state.orderPlaced}>
        <Typography gutterBottom variant="h5" component="h2">
            View the summary and place your order now!
        </Typography>
        <Button className={classes.button} onClick={this.changeHandler}>Change</Button>
        </div>

        </div>

            <div className="orderSummary">
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Summary
                                    </Typography>
                                    {this.state.cartItems.map(item => (
                                        <div className="order-body-container" key={"item" + item.id}>
                                            <div>{item.type === 'Veg' &&
                                                <i className="fa fa-stop-circle-o veg-item-color" aria-hidden="true"></i>}
                                                {item.type === 'Non-Veg' &&
                                                    <i className="fa fa-stop-circle-o non-veg-item-color" aria-hidden="true"></i>}
                                            </div>
                                            <div className="div-container">{item.itemName}</div>
                                            <div className="div-container">{item.quantity}</div>
                                            <div className="div-container">{item.price}</div>
                                        </div>
                                    ))}
                                    <Divider/>
                                    <div className="body-container">
                                    <span className="div-container">Net Amount </span>
                                    <span className="div-container">{this.state.totalCartItemsValue}</span>
                                    </div>
                                    <br />
                                    <Button variant="contained" color="primary">
                                        Place Order
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
        ) }

}
export default withStyles(styles)(Checkout);