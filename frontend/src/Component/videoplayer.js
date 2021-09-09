import React from 'react';
import {connect} from 'react-redux'

import {loginUserThunk} from '../Redux/loginbox/action'

class PureVideoPlayer extends React.Component {
    
    render() {
        return (

            <div className="col  d-flex justify-content-center">
                        <iframe title="youtubethingy" width="560" height="315" src="https://www.youtube.com/embed/DDApeoSE9Bc" frameBorder="0" allowFullScreen></iframe>
            </div>
                   
        );
    }
}

const mapStateToProps = (state) => {
    console.log("this is state;", state);
    return {
        isAuthenticatedMSP: state.authStore.isAuthenticated
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loginMDP: (email, password) => {
            dispatch(loginUserThunk(email, password))
        }
     
    }
}
export const VideoPlayer = connect(mapStateToProps, mapDispatchToProps)(PureVideoPlayer)