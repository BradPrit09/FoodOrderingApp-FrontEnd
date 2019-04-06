import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Modal from 'react-modal';
import logo from '../../assets/fastfood.svg';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import Home from '../../screens/home/Home';
import Snackbar from '@material-ui/core/Snackbar';
import ReactDOM from 'react-dom';
import './Header.css';

const styles = theme => ({
    root: {
        width: '100%',
    },
    menuroot: {
        display: 'flex',
    },

    profileicon: {
        marginRight: theme.spacing.unit,
        fontSize: 20,

    },
    search: {
        position: 'relative',
        borderRadius: '4px',
        backgroundColor: '#263238',
        width: '300px',
        left: '36%',
    },
    searchIcon: {
        width: theme.spacing.unit * 6,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
    },
    inputRoot: {
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 5,
        color: '#fff',
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 250,
            '&:focus': {
                width: 250,
            },
        },
    },
    iconbtn: {
        marginRight: 2,
        marginLeft: 10,
    },
    profileiconbtn: {
        //marginLeft: '66%',
    },
    avatar: {
        width: 24,
        height: 24,
    },
    menuList: {
        backgroundColor: '#c0c0c0',
    },
    menuitem: {
        padding: '8px',
    },
});

const customStyles = {
    content: {
        top: '15%',
        left: '40%',
        right: '40%',
        bottom: 'auto',
        width: '20%',
    }
};

const theme = createMuiTheme({
    palette: {
        primary: { main: '#263238' }, // For header background.
        secondary: { main: '#fff' }, // For text on header. 
    },
});

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ paddingLeft: '10%', textAlign: 'left' }}>
            {props.children}
        </Typography>
    )
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

/*Header component for all screens */
class Header extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            contactNoRequired: "dispNone",
            contactNo: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
            query: "",
            loggedIn: false,
            registrationSuccess: false,
            message: "",
            accessToken: {},
            open: false,
            snackbarOpen: false,
        };
    }

    inputChangeHandler = (e) => {
        sessionStorage.removeItem("query");
        sessionStorage.setItem("query", e.target.value);
        this.setState({
            query: e.target.value
        });
        this.props.searchClickHandler(e.target.value);
    };

    loginClickHandler = () => {
        this.state.contactNo === "" ? this.setState({ contactNoRequired: "dispBlock" }) : this.setState({ contactNoRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });
        // If Username & Password not null then only send the request
        if (this.state.contactNoRequired === "dispNone" && this.state.loginPasswordRequired === "dispNone") {
            let xhr = new XMLHttpRequest();
            let that = this;
            var accessToken = "";

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4 && this.status === 200 ) {

                    sessionStorage.setItem('access-token', xhr.getResponseHeader("access-token"));
                    console.log(JSON.parse(xhr.responseText));
                    console.log(xhr.getResponseHeader("access-token"));
                    that.setState({
                        loggedIn: true,
                        snackbarOpen: true,
                        message:"Logged in successfully!",
                    });
                    that.closeModalHandler();
                    ReactDOM.render(<Home />, document.getElementById('root'));
                }
            });


            xhr.open("POST", "http://localhost:8080/api/user/login?contactNumber=" + this.state.contactNo + "&password=" + this.state.loginPassword);
            xhr.setRequestHeader("Content-Type", "application/jason;CharSet=UTF-8");
            xhr.send();
        }
    }
    inputcontactNoChangeHandler = (e) => {
        this.state.contactNo === "" ? this.setState({ contactNoRequired: "dispBlock" }) : this.setState({ contactNoRequired: "dispNone" });
        this.setState({ contactNo: e.target.value })
    }

    registerClickHandler = () => {

        this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" });
        this.state.lastname === "" ? this.setState({ lastnameRequired: "dispBlock" }) : this.setState({ lastnameRequired: "dispNone" });
        this.state.email === "" ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
        this.state.registerPassword === "" ? this.setState({ registerPasswordRequired: "dispBlock" }) : this.setState({ registerPasswordRequired: "dispNone" });
        this.state.contact === "" ? this.setState({ contactRequired: "dispBlock" }) : this.setState({ contactRequired: "dispNone" });

        if (this.state.contactRequired === "dispNone" && this.state.registerPasswordRequired === "dispNone"
            && this.state.emailRequired === "dispNone" && this.state.firstnameRequired === "dispNone"
            && this.state.lastnameRequired === "dispNone") {

        
            let xhrSignup = new XMLHttpRequest();
            let that = this;
            xhrSignup.addEventListener("readystatechange", function () {
                if (this.readyState === 4 && this.status === 200 ) {
                    that.setState({
                        registrationSuccess: true,
                        snackbarOpen: true,
                        message:"Registered successfully! Please login now!",
                    });
                    that.openModalHandler();
                    ReactDOM.render(<Home />, document.getElementById('root'));
                }
            });

            xhrSignup.open("POST", "http://localhost:8080/api/user/signup?firstName="
            +this.state.firstname+"&lastName="+this.state.lastname+"&email="+this.state.email
            +"&contactNumber="+this.state.contact+"&password="+this.state.registerPassword);
            xhrSignup.setRequestHeader("Content-Type", "application/jason;CharSet=UTF-8");
            xhrSignup.send();
        }
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });
        this.setState({ loginPassword: e.target.value })
    }

    inputFirstNameChangeHandler = (e) => {
        this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" });
        this.setState({ firstname: e.target.value });
    }

    inputLastNameChangeHandler = (e) => {
        this.state.lastname === "" ? this.setState({ lastnameRequired: "dispBlock" }) : this.setState({ lastnameRequired: "dispNone" });
        this.setState({ lastname: e.target.value });
    }

    inputEmailChangeHandler = (e) => {
        this.state.email === "" ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
        this.setState({ email: e.target.value });
    }

    inputRegisterPasswordChangeHandler = (e) => {
        this.state.registerPassword === "" ? this.setState({ registerPasswordRequired: "dispBlock" }) : this.setState({ registerPasswordRequired: "dispNone" });
        this.setState({ registerPassword: e.target.value });
    }

    inputContactChangeHandler = (e) => {
        this.state.contact === "" ? this.setState({ contactRequired: "dispBlock" }) : this.setState({ contactRequired: "dispNone" });
        this.setState({ contact: e.target.value });
    }

    tabChangeHandler = (event, value) => {
        this.state = {
            contactNoRequired: "dispNone",
            contactNo: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
        };
        this.setState({ value });
    }

    /**
 * Toggle Handler
 */
    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    /**
     * Handler for Closing Snackbar
     */
    snackbarHandleClose = event => {

        this.setState({ snackbarOpen: false });

    };

    logoutHandler = event => {
        // Removing accesstoken in session storage on clicking logout 
        sessionStorage.removeItem("access-token");

        this.setState({
            loggedIn: false
        });

    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            contactNoRequired: "dispNone",
            contactNo: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: ""
        });
    }
    closeModalHandler = () => {
        this.setState({
            modalIsOpen: false,
        })
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <div>
                <header >
                    <div className={classes.root}>
                        <MuiThemeProvider theme={theme}>
                            <AppBar position="static" color='primary'>
                                <Toolbar>
                                    <img src={logo} alt="FoodOrderingApp" />

                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        {/**Search Code */}
                                        <Input
                                            placeholder="Search by Restaurant Name"
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }} onChange={this.inputChangeHandler}
                                        />
                                    </div>
                                    <div className="login-button">
                                        <Button className={classes.prfileicon} variant="contained" size="medium" color="default" onClick={this.openModalHandler}>
                                            <ProfileIcon className={classes.prfileicon} />
                                            Login
                                        </Button>
                                    </div>
                                </Toolbar>
                            </AppBar>
                        </MuiThemeProvider>
                    </div>
                </header>
                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel='Login'
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}>
                    <Tabs value={this.state.value} onChange={this.tabChangeHandler} className="tabs">
                        <Tab label="LOGIN" />
                        <Tab label="SIGNUP" />
                    </Tabs>
                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="contactNo">Contact No.</InputLabel>
                                <Input id="contactNo" type="text" contact={this.state.contactNo} onChange={this.inputcontactNoChangeHandler} />
                                <FormHelperText className={this.state.contactNoRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                                <FormHelperText className={this.state.loginPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </TabContainer>
                    }
                    {this.state.value === 1 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFirstNameChangeHandler} />
                                <FormHelperText className={this.state.firstnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.inputLastNameChangeHandler} />
                                <FormHelperText className={this.state.lastnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" type="text" email={this.state.email} onChange={this.inputEmailChangeHandler} />
                                <FormHelperText className={this.state.emailRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                <Input id="registerPassword" type="password" registerpassword={this.state.registerPassword} onChange={this.inputRegisterPasswordChangeHandler} />
                                <FormHelperText className={this.state.registerPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                <Input id="contact" type="text" contact={this.state.contact} onChange={this.inputContactChangeHandler} />
                                <FormHelperText className={this.state.contactRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.registerClickHandler}>SIGNUP</Button>
                        </TabContainer>
                    }
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.snackbarOpen}
                        onClose={this.snackbarHandleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.message}</span>}
                    />
                </Modal>
            </div>
        )
    }
}

export default withStyles(styles)(Header);