import React from 'react';
import {connect} from 'react-redux'

import { Link } from 'react-router-dom';
import {logoutNowThunk} from '../Redux/loginbox/action'
import {Account} from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";

// import NavBar from '../Component/navbar';
// import HeadingInput from '../Component/headingInput';
// import FormSubmit from '../Component/formSubmit';
// import StartDictation from '../Component/startDictation';

class ViewDictationcard extends React.Component {
    
    constructor(props){
        super(props)
        this.bg = {
            backgroundColor: "#F8DF4F"
        }
    }
    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    render() {
        console.log("i want to see the props",this.props);

        return (
            <div>
            <div className="row" style={this.bg}>
                <div className="col col-8">
                {/* <NavBar/> */}
                <p>Navbar</p>
                </div>
                <div className="col col-4">
                <Link to="/account">Account</Link>
                <Link onClick={this.logout} to="/login">Logout</Link>
                </div>
            </div>
            <div className="row">
                <div className="col col-8">
                {/* <HeadingInput/> */}
                <p>HeadingInput</p>
                </div>
                <div className="col col-4">
                {/* <FormSubmit/> */}
                <p>FormSubmit</p>
                </div>
            </div>
            <div className="row">
                <div className="col col-12 d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                    {/* <StartDictation/> */}
                    <p>StartDictation</p>
                </div>
            </div>
                <BrowserRouter>
                    <Switch>
                <PrivateRoute path="/account" component={Account} />
                </Switch>
                </BrowserRouter>
        </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticatedMSP: state.authStore.isAuthenticated
    }
}
const mapDispatchToProps  = dispatch => {
    return {
        logout: () => {
            dispatch(logoutNowThunk())
        }
    }
}


const connectedViewDictationcard= connect(mapStateToProps, mapDispatchToProps)(ViewDictationcard)
export { connectedViewDictationcard as ViewDictationcard };