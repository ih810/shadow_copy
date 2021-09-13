import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { Account } from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter, Switch } from "react-router-dom";
import { NavBar } from '../Component/navbar';
import { HeadingInput } from '../Component/headinginput';
// import FormSubmit from '../Component/formSubmit';
import { VideoRecorder } from '../Component/videorecorder';
import { Transcript } from '../Component/transcript';
// import { Button } from "reactstrap";
import { addCard } from '../Redux/actions/cardAction'
import { getdataThunk } from '../Redux/actions/action'

import classes from './CreateFlashcard.module.css'

class CreateFlashcard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type:"flashcard",
            flashcardTitle: "",
            flashcardBody:"",
            flashcardRecording:"",
            setId:""
        }
        this.handleHeading = this.handleHeading.bind(this);
        this.handleTranscript = this.handleTranscript.bind(this);
        this.handleRecording = this.handleRecording.bind(this);
    }
    componentDidMount() {
        this.props.getdata({ email: localStorage.getItem('email')})
    }


    handleHeading(title){
        this.setState({
            flashcardTitle: title
        })
    }

    handleTranscript(body){
        this.setState({
            flashcardBody: body
        })
    }

    handleRecording(record){
        this.setState({
            flashcardRecording: record
        })
    }
    
    addFlashCard(){
      this.props.addCard({
                email: localStorage.getItem('email'),
                type : this.state.type,
                flashcardTitle: this.state.flashcardTitle,
                flashcardBody: this.state.flashcardBody,
                flashcardRecording: this.state.flashcardRecording,
                setId: this.props.location.state.set[0].id
            })
       
    }

    async navigateSet(e){
        e.preventDefault()
        this.props.history.push({
            pathname:`/viewset`,
            state: { set: this.props.location.state.set
            }
        })
    }
    render() {
        console.log("this.props in create flash card",this.props);
        console.log("this.state in create flash card",this.state);

        return (
            <div>
                <NavBar history={this.props.history}/>
                {/* Page Container */}
                <div className={classes.createflashcard}>
                    {/* Header Row */}
                    <div className="row d-flex p-4">
                        <div className="col-8">
                            <HeadingInput card={this.state} handleHeading={this.handleHeading} heading={this.state}/>
                        </div>
                        <div className="col-4">
                            {/* <FormSubmit/> */}
                            <button cards={this.props.cards} onClick={()=>{this.addFlashCard()}}>Create Card</button>
                        </div>
                    </div>

                    {/* Video & Transcript row */}
                    <div className="row d-flex p-4">
                        <VideoRecorder handleRecording={this.handleRecording}/>
                        <Transcript title={this.state} handleTranscript={this.handleTranscript} />
                    </div>

                    <BrowserRouter>
                        <Switch>
                            <PrivateRoute path="/account" component={Account} />
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log("state in dashboard", state);

    return {
        email: state.authStore.email,
        user: state.userStore.user,
        classrooms: state.classroomStore.classrooms,
        sets: state.setStore.sets,
        cards: state.cardStore.card,
        tags: state.tagStore.tags,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCard: (card) => {
            dispatch(addCard(card))
        },
        getdata: (email) => {
            dispatch(getdataThunk(email))
        }
    }
}


const connectedCreateFlashcard = connect(mapStateToProps, mapDispatchToProps)(CreateFlashcard)
export { connectedCreateFlashcard as CreateFlashcard };