import React, { Component } from './node_modules/react';
import './Checkout.css';
import Header from '../../common/header/Header';
import { GridListTile, Typography } from '../../../node_modules/@material-ui/core';
import Card from './node_modules/@material-ui/core/Card';
import CardContent from './node_modules/@material-ui/core/CardContent';
import GridList from './node_modules/@material-ui/core/GridList';
import Stepper from './node_modules/@material-ui/core/Stepper';
import StepLabel from './node_modules/@material-ui/core/StepLabel';
import Step from './node_modules/@material-ui/core/Step';
import StepContent from './node_modules/@material-ui/core/StepContent';
import Button from './node_modules/@material-ui/core/Button';
import { withStyles } from './node_modules/@material-ui/core/styles';
import Divider from './node_modules/@material-ui/core/Divider';
import Tabs from './node_modules/@material-ui/core/Tabs';
import Tab from './node_modules/@material-ui/core/Tab';
import FormControl from './node_modules/@material-ui/core/FormControl';
import Input from './node_modules/@material-ui/core/Input';
import InputLabel from './node_modules/@material-ui/core/InputLabel';
import FormHelperText from './node_modules/@material-ui/core/FormHelperText';
import Radio from './node_modules/@material-ui/core/Radio';
import RadioGroup from './node_modules/@material-ui/core/RadioGroup';
import FormLabel from './node_modules/@material-ui/core/FormLabel';
import FormControlLabel from './node_modules/@material-ui/core/FormControlLabel';
import Snackbar from './node_modules/@material-ui/core/Snackbar';
import IconButton from './node_modules/@material-ui/core/IconButton';
import CheckCircle from './node_modules/@material-ui/icons/CheckCircle';
import CloseIcon from './node_modules/@material-ui/icons/Close';
import ReactDOM from './node_modules/react-dom';
import Select from './node_modules/@material-ui/core/Select';
import MenuItem from './node_modules/@material-ui/core/MenuItem';
import { FontAwesomeIcon } from './node_modules/@fortawesome/react-fontawesome';
import { library } from './node_modules/@fortawesome/fontawesome-svg-core';
import { faCircle } from './node_modules/@fortawesome/free-solid-svg-icons';

library.add(faCircle);
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
            location:"",
            tabValue: 0,
            activeStep: 0,
            flat:"",
            city:"",
            open: false,
            locality:"",
            zipcode:"",
            statename:"",
            iconClass:"",
            addressClass:"",
            selectedIndex:"",
            flatRequired: "dispNone",
            cityRequired: "dispNone",
            stateRequired: "dispNone",
            zipcodeRequired: "dispNone",
            localityRequired: "dispNone",
            incorrectZipcode: "dispNone",
            orderPlaced: "dispNone",
            incorrectDetails:"false",
            address : "" ,
            categories : [],
            totalCartItemsValue: "",
            orderNotificationMessage:"",
            states:[],
            selectedAddress:[],
            cartItems: [],
            paymentModes: [],
            addresses: []
        }
    }
    

    componentWillMount() {

        if (sessionStorage.getItem("access-token") == null) {
            this.props.history.push('/');
        }
        else {
        // get address data
        let data = null;
        let xhr = new XMLHttpRequest();
        let xhr1 = new XMLHttpRequest();
        let xhr2 = new XMLHttpRequest();
        let that = this;
        // store relevant details
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    addresses : JSON.parse(this.responseText)             
                });         
             }
        });

        xhr.open("GET", "http://localhost:8085/api/address/user");
        xhr.setRequestHeader("accessToken", sessionStorage.getItem("access-token"));
        xhr.send(data);

        xhr1.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    paymentModes : JSON.parse(this.responseText)             
                });         
             }
        });

        xhr1.open("GET", "http://localhost:8085/api/payment");
        xhr1.setRequestHeader("accessToken", sessionStorage.getItem("access-token"));
        xhr1.send(data);

        xhr2.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    states : JSON.parse(this.responseText)             
                });
             }
        });

        xhr2.open("GET", "http://localhost:8085/api/states");
        xhr2.send(data);
        }

    }

    tabChangeHandler = (event, tabValue) => {
        this.setState({ tabValue });
    }

    locationChangeHandler = event => {
        this.setState({ location: event.target.value });
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
        var savedAddress = {
                "id": "",
                "flatBuilNo": this.state.flatBuilNo,
                "locality": this.state.locality,
                "city": this.state.city,
                "zipcode": this.state.zipcode,
                "state": {
                    "id": "",
                    "stateName": this.state.location
                }
        }
    this.setState(state => ({
      selectedAddress: savedAddress,
    }));
    }
  }

  if (this.state.activeStep === 1 && this.state.value!=="") {
    this.setState(state => ({
      orderPlaced: "dispBlock",
      activeStep: state.activeStep + 1
    }));     
  }

  if (this.state.activeStep !== 1 && this.state.incorrectDetails === "false" && this.state.selectedAddress.length !== 0) {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
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
        this.setState({ 
            flat: e.target.value,
        });
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
      ReactDOM.render(<Checkout />, document.getElementById('root'));
    }

    iconClickHandler = (address,index) => {
        this.state.addresses.map(obj => (
           obj.id === address.id ?
            this.setState({
                selectedAddress: address,
                selectedIndex: index,
                addressClass: "selectionGrid" ,
                iconClass: "green"
           })
           :
           console.log("dint match "+obj.id)
         ));
    }

    snackBarCloseHandler = () => {
         this.setState({ 
             open: false 
        });
    }

    confirmOrderHandler = () => {
        let xhr = new XMLHttpRequest();
        let that = this;
        var address = this.state.selectedAddress;
        var parameters="adrressId="+address.id+"&flatBuilNo="+address.flatBuilNo+"&locality="+address.locality+"&city="+address.city
        +"&zipcode="+address.zipcode+"&stateId="+address.state.id+"&bill="+this.state.totalCartItemsValue;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    open:true,
                    orderNotificationMessage : "Your order has been placed successfully!"            
                });        
             }
             else {
                that.setState({
                    open: true,
                    orderNotificationMessage : "Unable to place your order! Please try again!"            
                });  
             }
        });

        xhr.open("GET", "http://localhost:8085/api/order");
        xhr.send(parameters);

    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        return (
            <div className="checkout">
                <Header  showSearch="false" />
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
                                <Tabs className="addTabs" value={this.state.tabValue} onChange={this.tabChangeHandler}>
                                    <Tab label="EXISTING ADDRESS" />
                                    <Tab label="NEW ADDRESS" />
                                </Tabs>

                                {this.state.tabValue === 0 && 
                                (this.state.addresses.length !==0 ?
                                <GridList cellHeight={"auto"} className={classes.gridListMain} cols={3}>
                                    {this.state.addresses.map((address, i) => (
                                    <GridListTile key={i} style={{padding:'20px'}}>
                                    <div id ={i} key={i} className={this.state.selectedIndex === i ? 'selectionGrid' : 'grid'} 
                                    style={{ padding:'10px' }}>
                                        <Typography style={{ fontSize:'20px',marginRight:'20px',marginBottom:'5px'}}>{address.flatBuilNo}</Typography>
                                        <Typography style={{ fontSize:'20px',marginRight:'20px',marginBottom:'10px'}}>{address.locality}</Typography>
                                        <Typography style={{ fontSize:'20px',marginRight:'20px',marginBottom:'10px'}}>{address.city}</Typography>
                                        <Typography style={{ fontSize:'20px',marginRight:'20px',marginBottom:'10px'}}>{address.state.stateName}</Typography>
                                        <Typography style={{ fontSize:'20px',marginRight:'20px',marginBottom:'10px'}}>{address.zipcode}</Typography>
                                        <IconButton id={i} key={i} 
                                        style={{marginLeft:'60%'}} 
                                        onClick={() => this.iconClickHandler(address,i)}>
                                            <CheckCircle className={this.state.selectedIndex === i ? 'green' : 'grid'} />
                                        </IconButton>
                                    </div>
                                    </GridListTile>
                                    ))}
                                    </GridList>
                                    :
                                    <div style={{marginBottom:'100px'}}>
                                        <Typography style={{color:'grey',fontSize:'18px'}}>There are no saved addresses! You can save an address using your ‘Profile’ menu option.</Typography>
                                    </div>
                                )}
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
                                <InputLabel htmlFor="location">State</InputLabel>
                                <Select
                                    value={this.state.location}
                                    onChange={this.locationChangeHandler}
                                >
                                    {this.state.states.map(loc => (
                                        <MenuItem key={"loc" + loc.id} value={loc.stateName}>
                                            {loc.stateName}
                                        </MenuItem>
                                    ))}
                                </Select>
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
                                        <FormControlLabel key={payment.id} value={payment.paymentName} control={<Radio />} label={payment.paymentName} />
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
                            <Card style={{height:'70%'}}>
                                <CardContent>
                                    <Typography style={{marginLeft:'40px',fontWeight:'bold',marginBottom:'30px'}} gutterBottom variant="h5" component="h2">
                                        Summary
                                    </Typography>
                                    {this.props.location.state.cartItems.map(item => (
                                        <div className="order-body-container" key={"item" + item.id}>
                                            <div className="div-container div-items">{item.type === 'Veg' &&
                                                <FontAwesomeIcon icon="circle" className="veg-item-color"/>}
                                                {item.type === 'Non-Veg' &&
                                                    <FontAwesomeIcon icon="circle" className="non-veg-color"/>}   {item.itemName}
                                            </div>
                                            <div className="div-container"> {item.quantity}</div>
                                            <div className="div-container"><FontAwesomeIcon icon="rupee-sign" /> {item.price}</div>
                                        </div>
                                    ))}
                                    <Divider/>
                                    <div className="body-container">
                                    <span style={{fontWeight:'bold'}} className="div-container div-items">Net Amount </span>
                                    <span className="rupee-container"><FontAwesomeIcon icon="rupee-sign" /> {this.props.location.state.totalCartItemsValue}</span>
                                    </div>
                                    <br />
                                    <Button className="button-container" style={{marginLeft:'55px'}} variant="contained" onClick={this.confirmOrderHandler} color="primary">
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
                                        message={<span id="message-id">{this.state.orderNotificationMessage}</span>}
                                        action={[
                                            <IconButton
                                            key="close"
                                            aria-label="Close"
                                            color="inherit"
                                            className={classes.close}
                                            onClick={this.snackBarCloseHandler}
                                            >
                                            <CloseIcon />
                                            </IconButton>,
                                        ]}
                                    />
                                </CardContent>
                            </Card>
            </div>

          </div>
        </div>
        ) }

}
export default withStyles(styles)(Checkout);