import React from 'react';
import {connect} from 'react-redux'

import { Link } from 'react-router-dom';
import { getdataThunk } from '../Redux/getdata/action'
import {logoutNowThunk} from '../Redux/loginbox/action'
import {Account} from './Account';

import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";
import { NavBar } from '../Component/navbar';
import { HeadingInput } from '../Component/headinginput';
// import FormSubmit from '../Component/formSubmit';
import { VideoRecorder } from '../Component/videorecorder';
import { VideoPlayer } from '../Component/videoplayer';
import { Transcript } from '../Component/transcript';
// import FlashcardSubmissions from '../Component/flashcardSubmission';
// import FlashcardFeedbacks from '../Component/flashcardFeedbacks';


import classes from './ViewFlashcard.module.css'


class ViewFlashCard extends React.Component {
    constructor(props){
        super(props)
        // this.bg = {
        //     backgroundColor: '#F8DF4F'
        // }
        this.state = {
            title: "classroomTitle",
            read: "readonly"
        }
    }

    componentDidMount() {
        this.props.getdata({ email: "test@test.com" })
    }

    // logout = (e) => {
    //     e.preventDefault();
    //     this.props.logout()
    // }
    render() {
        console.log("i want to see the props",this.props);

        return (
            <div>
                <NavBar/>

                <div className={classes.viewflashcard}>
                    <div classNmae="row d-flex p-4">
                        <div className="col-8">
                        <HeadingInput title={this.state}/>
                        </div>
                    </div>

                    <div className="row d-flex p-4">
                        <div className="col">
                            <VideoPlayer/>
                        </div>
                        <div className="col">
                            <Transcript title={this.state}/>
                        </div>
                    </div>

                    <div className="row d-flex p-4">
                        <div className="col-6">
                            <VideoRecorder/>
                        </div>

                        <div className="col-6">
                            {/* <FlashcardSubmissions/> */}
                            {/* <div className="flex-col d-flex"> */}
                            <div className={classes.submissions}>
                                <h6>Submissions</h6>
                                <div className={classes.scrollsubmission}>
                                    <button className={classes.scrollplusicon}> 
                                    <i className="fas fa-plus"></i>
                                    </button>
                                    
                                    <button className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </button>

                                    <button className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </button>

                                    <button className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </button>

                                    <button className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </button>

                                    <button className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </button>

                                    <button className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </button>


                                </div>
                            </div>

                            <div className={classes.feedback}>
                                <h6>Feedback</h6>
                                <div className={classes.scrollfeedback}>
                                    <div className={classes.scrollfeedbackcard}> 
                                        <table> 
                                            <th>Timestamp</th>
                                            <td>Comment</td>
                                        </table>
                                    </div>

                                    <div className={classes.scrollfeedbackcard}> 
                                        <table> 
                                            <th>Timestamp</th>
                                            <td>Comment</td>
                                        </table>
                                    </div>

                                    <div className={classes.scrollfeedbackcard}> 
                                        <table> 
                                            <th>Timestamp</th>
                                            <td>Comment</td>
                                        </table>
                                    </div>

                                    <div className={classes.scrollfeedbackcard}> 
                                        <table> 
                                            <th>Timestamp</th>
                                            <td>Comment</td>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
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
        isAuthenticatedMSP: state.authStore.isAuthenticated,
        loading: state.dataStore.loading,
        error: state.dataStore.error,
        user: state.dataStore.user,
        classrooms: state.dataStore.classrooms,
        sets: state.dataStore.sets,
        cards: state.dataStore.cards,
        tags: state.dataStore.tags,
    }
}
const mapDispatchToProps  = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        },
    }
}


const connectedViewFlashCard= connect(mapStateToProps, mapDispatchToProps)(ViewFlashCard)
export { connectedViewFlashCard as ViewFlashCard };