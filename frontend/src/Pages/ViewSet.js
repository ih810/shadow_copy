import React from 'react';
import { connect } from 'react-redux'

import { getdataThunk } from '../Redux/actions/action'
import { logoutNowThunk } from '../Redux/actions/loginboxAction'

import { Link } from 'react-router-dom';

import { NavBar } from '../Component/navbar';
import { Account } from './Account';
import { HeadingInput } from '../Component/headinginput';

import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter, Switch } from "react-router-dom";

import { DisplayClassModule } from '../Component/displayclassmodule'
import { DisplayCardModule } from '../Component/displaycardmodule';
// import NavBar from '../Component/navbar';
// import HeadingInput from '../Component/headingInput';

// import Tags from '../Component/tags';
import { NewSharePopUp } from '../Component/sharemodal';
import { NewTagPopUp } from '../Component/newtagmodal';
// import Users from '../Component/users';

import { AddnewPopUp } from '../Component/addnewmodal'

import classes from './ViewSet.module.css'
import { DisplaySetTag} from '../Component/displaysettag'



class ViewSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectModal: false,
            modal: false,
            type: "",
            tagModal: false,
            shareModal: false,
            correctflashCard: [],
            correctquizCard: [],
            correctdictationCard: [],
        }
    }


    async componentDidMount() {
      await this.props.getdata({ email: localStorage.getItem('email') })
        this.getSet()
    }
 
    componentWillReceiveProps(nextProps) {
        console.log('nextProps!!!!!', nextProps)
        const nextflash = this.props.location.state.set[0].bridge_flashcard.map((flashCard) => {
            const newestState = nextProps.cards.flashcard.filter(card => card.id === flashCard.flashcard_id)
            return newestState[0]
        });
        const nextquiz = this.props.location.state.set[0].bridge_quizcard.map((quizCard) => {
            const newestState = nextProps.cards.quizcard.filter(card => card.id === quizCard.quizcard_id)
            return newestState[0]
        });
        const nextdictation = this.props.location.state.set[0].bridge_dictationcard.map((dictationCard) => {
            const newestState = this.props.cards.dictationcard.filter(card => card.id === dictationCard.dictationcard_id)
            return newestState[0]
        });
        console.log("NEXXXTTTTT CARDDD",nextflash,nextquiz, nextdictation);
        this.setState({       
            correctflashCard: nextflash,
            correctquizCard: nextquiz,
            correctdictationCard: nextdictation
         });  
      }
    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    tagToggle() {
        this.setState({
            tagModal: !this.state.tagModal
        })
    }

    shareToggle() {
        console.log('share tog')
        this.setState({
            shareModal: !this.state.shareModal
        })
    }


    selectToggle() {
        this.setState({
            selectModal: !this.state.selectModal,
        });
    }

    changeTypeSet() {
        this.setState({
            type: "set"
        })
    }

    navigateCard(e) {
        if (e.target.attributes["data-type"].value === "flashcard") {
            console.log('nav card func props', this.props.cards.flashcard)
            console.log('nav card func value', e.target.attributes["data-key"].value)
            this.props.history.push({
                pathname: `/viewflashcard`,
                state: {
                    card: this.props.cards.flashcard.filter((flashcard) => {
                        if (flashcard.id === parseInt(e.target.attributes["data-key"].value)) {
                            console.log('in if')
                            return flashcard
                        }
                    }),
                }
            })
        } else if (e.target.attributes["data-type"].value === "quizcard") {
            this.props.history.push({
                pathname: `/viewQuizcard`,
                state: {
                    card: this.props.cards.quizcard.filter((quizcard) => {
                        if (quizcard.id === parseInt(e.target.attributes["data-key"].value)) {
                            console.log('in if')
                            return quizcard
                        }
                    })
                }
            })
        } else if (e.target.attributes["data-type"].value === "dictationcard") {
            this.props.history.push({
                pathname: `/viewDictationcard`,
                state: {
                    card: this.props.cards.dictationcard.filter((dictationcard) => {
                        if (dictationcard.id === parseInt(e.target.attributes["data-key"].value)) {
                            console.log('in if')
                            return dictationcard
                        }
                    })
                }
            })
        }
    }
    navigateNewCard(e) {
        this.props.history.push({
            pathname: `/createflashcard`,
            state: {
                set: this.props.location.state.set
            }
        }
        )
    }
    getSet() {
        console.log("DIU SET", this.props.location.state.set[0]);
        if (this.props.location.state.set[0].bridge_flashcard != null) {
            const flash = this.props.location.state.set[0].bridge_flashcard.map((flashCard) => {
                const newestState = this.props.cards.flashcard.filter(card => card.id === flashCard.flashcard_id)
                return newestState[0]
            });
            console.log("lmaooooooflash", flash);
            this.setState({
                correctflashCard: flash
            })
        } else {
            return null
        }
        if (this.props.location.state.set[0].bridge_quizcard != null) {
            const quiz = this.props.location.state.set[0].bridge_quizcard.map((quizCard) => {
                const newestState = this.props.cards.quizcard.filter(card => card.id === quizCard.quizcard_id)
                return newestState[0]
            });
            console.log("lmaooooooquiz", quiz);
            this.setState({
                correctquizCard: quiz
            })
        } else {
            return null
        }
        if (this.props.location.state.set[0].bridge_dictationcard != null) {
            const dictation = this.props.location.state.set[0].bridge_dictationcard.map((dictationCard) => {
                const newestState = this.props.cards.dictationcard.filter(card => card.id === dictationCard.dictationcard_id)
                return newestState[0]
            });
            console.log("lmaoooooodictation", dictation);
            this.setState({
                correctdictationCard: dictation
            })
        } else {
            return null
        }
    }
    render() {
        console.log("i want to see the props", this.props);
        console.log("i want to see THE STTTTTATE", this.state);

        return (
            <div>
                <NavBar set={() => this.getSet()} user={this.props.user} history={this.props.history} />

                <div className={classes.viewset}>
                    <div classNmae="row d-flex p-4">
                        <div className="col-8">
                            <h1>{this.props.location.state.set[0].title}</h1>
                            <h6>{this.props.location.state.set[0].description}</h6>


                        </div>
                    </div>


                <div className="row d-flex pl-4 pr-4 m-2">
                    {/* <button className={classes.tagbutton}>#sampletag</button> */}
                    
                    <DisplaySetTag tags={this.props.location.state.set[0].tags} />
                    <NewTagPopUp addTag={this.state} location={this.props.location.state.set[0]} toggle={() => this.tagToggle()} />
                    <span className="d-inline-flex ">
                        <button onClick={() => { this.tagToggle(); this.changeTypeSet() }} className={classes.addtagbutton}><i className="fas fa-plus"></i></button>
                    </span>
                </div>

                <div className="row d-flex m-3">
                    <AddnewPopUp location={ this.props.location } create={ this.state } allCard={this.props.cards} navigate={(e) => { this.navigateNewCard(e) }} toggle={() => this.toggle()} />
                    <div onClick={() => { this.changeTypeSet(); this.toggle(); }} className={classes.card}>
                        <div className={classes.addbtn}>
                            <i className="fas fa-plus" />
                        </div>
                        <div className="m-2 p-4 rounded-lg d-flex align-items-center">
                            <span>Add new or exist card</span>
                        </div>
                    </div>

                    <DisplayCardModule view={this.state} navigate={(e) => this.navigateCard(e)} />
                </div>
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log("state in VIEWSET", state);

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
        getdata: (email) => {
            dispatch(getdataThunk(email))
        },
        logout: () => {
            dispatch(logoutNowThunk())
    }
}
}

const connectedViewSet = connect(mapStateToProps, mapDispatchToProps)(ViewSet)
export { connectedViewSet as ViewSet };