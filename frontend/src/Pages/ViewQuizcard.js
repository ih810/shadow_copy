import React from 'react';
import { connect } from 'react-redux'



//Component
import { NavBar } from '../Component/navbar';
import { ViewQuizcardQuestionModule } from '../Component/viewquizcardquestion';
import { VideoPlayer } from '../Component/videoplayer';

//Actions
import { getdataThunk } from '../Redux/actions/action'
import { addSubmissionThunk } from '../Redux/actions/submissionAction';


//CSS
import classes from './ViewQuizcard.module.css'

class ViewQuizcard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            type: "quizcard",
            correctQuizcard: [],
            correctQuestion: [],
            quizcardQuestionSubmission: [],
            sub:{}
        }
    }
    componentDidMount() {
        this.props.getdata({ email: localStorage.getItem('email') })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.cards.quizcard.length > 0) {
            this.setState({
                correctQuizcard: this.props.cards.quizcard.filter(quiz => quiz.id === parseInt(this.props.match.params.id))
            })
            const correctProps = nextProps.cards.quizcard.filter(filter => filter.id === parseInt(this.props.match.params.id))
            this.setState({
                correctQuestion: correctProps[0]
            })

        }
    }
    onClickViewQuizcardQuestion() {
        this.setState({
            showQuizcardQuestion: true,
        })
    }
    handleSubmission (questionId ,submission){
        this.setState({
           sub: {
               questionId: questionId,
               submission: submission
        },
        })
    }

    addAnswer(submission) {
        this.props.submitAnswer({
            email: localStorage.getItem('email'),
            type: this.state.type,
            quizcardQuestionSubmission: submission,
            quizcardId: parseInt(this.props.match.params.id)
        })
    }
    submit() {
        this.props.submitAnswer({
            email: localStorage.getItem('email'),
            type: this.state.type,
            quizcardQuestionSubmission: this.state.quizcardQuestionSubmission,
        })
    }

    

    async navigateSubmission(e) {
        e.preventDefault()
        this.props.history.push({
            pathname: `/viewquizcardSubmission/${this.props.match.params.id}`,
        })
    }

    render() {
        console.log("PROPS IN VIEW QUIZCARD", this.props)
        console.log("STATE IN VIEW QUIZCARD", this.state)

        return (
            <div>
                <NavBar user={this.props.user} history={this.props.history} />

                <div className={classes.viewquizcard}>
                    {/* 1st row: Header */}
                    <div className="row d-flex p-4">
                        <div className="col-8">
                            <h1>{this.state.correctQuizcard.length > 0 ? this.state.correctQuizcard[0].quizcardTitle : null}</h1>
                        </div>
                    </div>

                    <div className="row d-flex p-4">
                        {!this.state.showQuizcardQuestion && <div className="col col-12 d-flex justify-content-center align-items-center">
                            <div onClick={() => { this.onClickViewQuizcardQuestion() }} className={classes.startbtncontainer}>
                                <span className={classes.startbtn}> Start Quiz</span>
                            </div>
                        </div>}
                    </div>

                    <div className="row d-flex p-4">
                        <div className="col col-12 justify-content-center align-items-center">
                            <button className="sumbit" cards={this.props.cards} onClick={() => { this.submit() }}>Submit</button>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.showQuizcardQuestion &&
                            <div className="col col-6">
                                <VideoPlayer src={this.state.correctQuestion.quizcardRecording} />
                            </div>
                        }
                        {this.state.showQuizcardQuestion &&
                            <div className="col col-6">
                                <ViewQuizcardQuestionModule question={this.state.correctQuestion} handleSubmission={(questionId ,submission)=>this.handleSubmission(questionId , submission)} addAnswer={()=>this.addAnswer(this.state.sub)}/>
                            </div>
                        }
                    </div>

                </div>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
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
        submitAnswer: (submission) => {
            dispatch(addSubmissionThunk(submission))
        },
    }
}


const connectedViewQuizcard = connect(mapStateToProps, mapDispatchToProps)(ViewQuizcard)
export { connectedViewQuizcard as ViewQuizcard };