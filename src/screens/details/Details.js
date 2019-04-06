import React, { Component } from 'react';
import './Details.css';
import Header from '../../common/header/Header';

 class Details extends Component {
render() {

     const { classes } = this.props;
    return (
        <div className="details">
            <Header />
            DETAILS PAGE

             console.log({this.props.id}) ;

             </div>
    )
    }
}
export default Details;