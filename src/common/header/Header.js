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
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import './Header.css';

const styles = theme => ({
    root: {
        width: '100%',
    },
    menuroot: {
        display: 'flex',
    },

    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: '4px',
        backgroundColor: '#263238',
        width: '300px',
        left: '36%',
    },
    searchLoggedIn: {
        position: 'relative',
        borderRadius: '4px',
        backgroundColor: '#263238',
        width: '300px',
        marginRight: '29%',
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
   
    avatar: {
        width: 32,
        height: 32,
        color: '#fff',
    },
    logo: {
        width: 40,
        height: 40,
    },
    text: {
        width:50,
        marginRight:2,
    },
    menuList: {
        backgroundColor: '#fff',
    },
    menuitem: {
        padding: '8px',
    },
});

const customStyles = {
    content: {
        top: '10%',
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
            lastname: "",
            emailRequired: "dispNone",
            emailValid: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
            query: "",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
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
        console.log("query "+e.target.value);
        this.props.searchClickHandler(e.target.value);
    };

    loginClickHandler = () => {
        this.state.contactNo === "" ? this.setState({ contactNoRequired: "dispBlock" }) : this.setState({ contactNoRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });
        // If Username & Password not null then only send the request
        if (this.state.contactNoRequired === "dispNone" && this.state.loginPasswordRequired === "dispNone") {
            let xhr = new XMLHttpRequest();
            let that = this;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4 && this.status === 200) {

                    sessionStorage.setItem('access-token', xhr.getResponseHeader("access-token"));
                    var userDetails = JSON.parse(xhr.responseText);
                    that.setState({
                        loggedIn: true,
                        snackbarOpen: true,
                        firstname: userDetails.firstName,
                        message: "Logged in successfully!",
                    });
                    that.closeModalHandler();
                    ReactDOM.render(<Home />, document.getElementById('root'));
                }
                else {
                    that.setState({
                        loggedIn: false,
                        snackbarOpen: true,
                        message: "Logged in successfully!",
                    });
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
        this.state.email === "" ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
        this.state.registerPassword === "" ? this.setState({ registerPasswordRequired: "dispBlock" }) : this.setState({ registerPasswordRequired: "dispNone" });
        this.state.contact === "" ? this.setState({ contactRequired: "dispBlock" }) : this.setState({ contactRequired: "dispNone" });

        if (this.state.contactRequired === "dispNone" && this.state.registerPasswordRequired === "dispNone"
            && this.state.emailRequired === "dispNone" && this.state.firstnameRequired === "dispNone") {

            // if (this.state.contact.match(number_pattern) && this.state.contact.length === 10) {


            let xhrSignup = new XMLHttpRequest();
            let that = this;
            xhrSignup.addEventListener("readystatechange", function () {
                if (this.readyState === 4 && this.status === 201) {
                    that.setState({
                        registrationSuccess: true,
                        snackbarOpen: true,
                        message: "Registered successfully! Please login now!",
                    });
                    that.openModalHandler();
                    //ReactDOM.render(<Home />, document.getElementById('root'));
                }
            });

            xhrSignup.open("POST", "http://localhost:8080/api/user/signup?firstName="
                + this.state.firstname + "&lastName=" + this.state.lastname + "&email=" + this.state.email
                + "&contactNumber=" + this.state.contact + "&password=" + this.state.registerPassword);
            xhrSignup.setRequestHeader("Content-Type", "application/jason;CharSet=UTF-8");
            xhrSignup.send();
            /* }
             else {
                 console.log("invalid number");
             }*/
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
        this.setState({
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
        });
        this.setState({ value });
    }

    /**
 * Toggle Handler
 */
    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    /**
 * Handler for Closing Menu
 */
    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });

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
            loggedIn: false,
            open: false
        });

        // Redirecting to Login page
        ReactDOM.render(<Home />, document.getElementById('root'));
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
                    {!this.state.loggedIn &&
                        <div className={classes.root}>
                            <MuiThemeProvider theme={theme}>
                                <AppBar position="static" color='primary'>
                                    <Toolbar>
                                        <img src={logo} className={classes.logo} alt="FoodOrderingApp" />

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
                        </div>}
                    {this.state.loggedIn &&
                        <div className={classes.root}>
                            <MuiThemeProvider theme={theme}>
                                <AppBar position="static" color='primary'>
                                    <Toolbar>
                                        <img src={logo} className={classes.logo} alt="FoodOrderingApp" />
                                        <div className={classes.grow} />
                                        <div className={classes.searchLoggedIn}>
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
                                        {/**Menu Button Code */}
                                        <IconButton buttonRef={node => {
                                            this.anchorEl = node;
                                        }}
                                            aria-owns={open ? 'menu-list-grow' : undefined}
                                            aria-haspopup="true"
                                            onClick={this.handleToggle} className={classes.iconbtn}>
                                            {/**View profile */}
                                            {/*<Avatar src={this.state.profile_pic} className={classes.avatar} alt="profile" />*/}
                                            <AccountCircle className={classes.avatar} />
                                        </IconButton>
                                        <div className={classes.menuroot}>
                                            <Popper open={open} anchorEl={this.anchorEl} transition>
                                                {({ TransitionProps, placement }) => (

                                                    <Grow
                                                        {...TransitionProps}
                                                        id="menu-list-grow"
                                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                                    >
                                                        <ClickAwayListener onClickAway={this.handleClose}>
                                                            <MenuList className={classes.menuList}>

                                                                {/* On clicking login , calling my account handler */}
                                                                <MenuItem className={classes.menuitem} onClick={this.myAccountHandler}>
                                                                    My Profile
                                {/*<Link style={{ textDecoration: 'none', color: 'black' }} to="/profile">My Account</Link>
                                */}
                                                                </MenuItem>

                                                                {/* On clicking logout, calling logout handler */}
                                                                <MenuItem className={classes.menuitem} onClick={this.logoutHandler}>
                                                                    Logout
                                {/*<Link style={{ textDecoration: 'none', color: 'black' }} onClick={this.logoutHandler} to="/">Logout</Link>
                                */}
                                                                </MenuItem>

                                                            </MenuList>
                                                        </ClickAwayListener>
                                                    </Grow>

                                                )}
                                            </Popper>
                                        </div>
                                        <div className={classes.text}>
                                        <p>{this.state.firstname}</p>
                                        </div>
                                    </Toolbar>
                                </AppBar>
                            </MuiThemeProvider>
                        </div>}
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
                            <FormControl>
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