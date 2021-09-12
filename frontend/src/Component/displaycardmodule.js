import React from 'react';
import { connect } from 'react-redux'


class PureDisplayCardModule extends React.Component {
  
    render() {
        console.log("this.......",this.props)

        return (
            <>
                    <div  className="col  m-1 p-3 border border-4 rounded-lg highlight ">
                            <h4 className="p-3"><strong> Sample Flashcard Title</strong></h4>
                            <p className="p-3">Sample Flashcard description </p>
                        </div>

                {this.props.cards.flashcard.map((card, i) => {
                    return (
                        <div key={i} className="col  m-1 p-3 border border-4 rounded-lg highlight ">
                            <h4 className="p-3"><strong>{card.flashcardTitle}</strong></h4>
                            <p className="p-3">{card.flashcardBody}</p>
                        </div>
                    )
                })}

                {this.props.cards.quizcard.map((card, i) => {
                    return (
                        <div key={i} className="col  m-1 p-3 border border-4 rounded-lg highlight ">
                            <h4 className="p-3"><strong>{card.quizcardTitle}</strong></h4>
                            <p className="p-3">{card.quizcardRecording}</p>
                        </div>
                    )
                })}

                {this.props.cards.dictationcard.map((card, i) => {
                    return (
                        <div key={i} className="col  m-1 p-3 border border-4 rounded-lg highlight ">
                            <h4 className="p-3"><strong>{card.dictationcardTitle}</strong></h4>
                            <p className="p-3">{card.dictationBody}</p>
                        </div>
                    )
                })}
            </>

        );
    }
}
const mapStateToProps = (state) => {
    console.log("state in dashboard", state);

    return {
        cards: state.cardStore.card,
    }
}

export const DisplayCardModule = connect(mapStateToProps, null)(PureDisplayCardModule)
