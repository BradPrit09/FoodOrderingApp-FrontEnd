import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Modal from 'react-modal';
import logo from '../../assets/fastfood.svg';
import categoryLogo from '../../assets/outlinelist.svg';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
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
import './Header.css';

const styles = theme => ({
  root: {
    width: '100%',
  },
  menuroot: {
    display: 'flex',
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
    color:'#fff',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 250,
      '&:focus': {
        width: 250,
      },
    },
  },
});

const customStyles = {
    content: {
        top: '15%',
        left: '35%',
        right: '35%',
        bottom: 'auto',
        width: '30%'
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
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

/*Header component for all screens */
class Header extends Component {
    
    constructor(){
    super();
    this.state = {
        modalIsOpen: false,
        value: 0,
        usernameRequired: "dispNone",
        username: "",
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
        accessToken: {},
    };
}

inputChangeHandler = (e) => {
    sessionStorage.removeItem("query");
    sessionStorage.setItem("query",e.target.value);
    this.setState({
      query: e.target.value
    });

    this.props.searchClickHandler(e.target.value) ;
  };

loginClickHandler = () => {
    this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
    this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });
}
 inputUsernameChangeHandler = (e) => {
    this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ username: e.target.value });
}

registerClickHandler = () => {
    this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" });
    this.state.lastname === "" ? this.setState({ lastnameRequired: "dispBlock" }) : this.setState({ lastnameRequired: "dispNone" });
    this.state.email === "" ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
    this.state.registerPassword === "" ? this.setState({ registerPasswordRequired: "dispBlock" }) : this.setState({ registerPasswordRequired: "dispNone" });
    this.state.contact === "" ? this.setState({ contactRequired: "dispBlock" }) : this.setState({ contactRequired: "dispNone" });
}

inputLoginPasswordChangeHandler = (e) => {
    this.setState({ loginPassword: e.target.value });
}

inputFirstNameChangeHandler = (e) => {
    this.setState({ firstname: e.target.value });
}

inputLastNameChangeHandler = (e) => {
    this.setState({ lastname: e.target.value });
}

inputEmailChangeHandler = (e) => {
    this.setState({ email: e.target.value });
}

inputRegisterPasswordChangeHandler = (e) => {
    this.setState({ registerPassword: e.target.value });
}

inputContactChangeHandler = (e) => {
    this.setState({ contact: e.target.value });
}

tabChangeHandler = (event, value) => {
    this.setState({ value });
}

openModalHandler = () => {
    this.setState({
        modalIsOpen: true,
        value: 0,
        usernameRequired: "dispNone",
        username: "",
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
closeModalHandler = () =>{
    this.setState({modalIsOpen: false})
}

  render() {
    const { classes } = this.props;

    return (
      <div>
        <header >
          {<div className={classes.root}>
              <MuiThemeProvider theme={theme}>
                <AppBar position="static" color='primary'>
                  <Toolbar>
                  <img src={logo} alt="FoodOrderingApp" />
                  
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      {/**Search Code */}
                      <InputBase
                        placeholder="Search by Restaurant Name"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }} onChange={this.inputChangeHandler} 
                      />
                    </div>
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={this.openModalHandler}>
                            Login
                        </Button>
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
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                                <FormHelperText className={this.state.usernameRequired}>
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
                            <Button variant="contained" color="primary" onClick={this.registerClickHandler}>REGISTER</Button>
                        </TabContainer>
                    }

                </Modal>
      </div>
    )
  }
}

export default withStyles(styles)(Header);