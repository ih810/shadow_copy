import axios from "axios";

export const ADD_SUBMISSION_DICTATIONCARD = "ADD_SUBMISSION_DICTATIONCARD";
export const ADD_SUBMISSION_FLASHCARD = "ADD_SUBMISSION_FLASHCARD";
export const ADD_SUBMISSION_QUIZCARD = "ADD_SUBMISSION_QUIZCARD";
export const ADD_SUBMISSION_TRUEFALSE = "ADD_SUBMISSION_TRUEFALSE";

export const DELETE_SUBMISSION_DICTATIONCARD = "DELETE_SUBMISSION_DICTATIONCARD";
export const DELETE_SUBMISSION_FLASHCARD = "DELETE_SUBMISSION_FLASHCARD";
export const DELETE_SUBMISSION_MULTIPLECHOICE = "DELETE_SUBMISSION_MULTIPLECHOICE";
export const DELETE_SUBMISSION_TRUEFALSE = "DELETE_SUBMISSION_TRUEFALSE";

export const addSubmissionThunk = (submission) => async (dispatch) => {
    console.log(submission,"submission in submission");
    return axios.post("http://localhost:8080/api/card/submission", submission)
        .then((data) => {
            console.log(data,"data in submission");
            if (submission.type === "dictation") {
                dispatch({
                    type: ADD_SUBMISSION_DICTATIONCARD,
                    payload: { user_id: submission.userId, displayName: data.data.displayName, picture: data.data.picture, dictationcard_id: submission.dictationcardId, id: data.data.dictationSubmissionId, dictationcardSubmissionPath: submission.dictationcardSubmissionPath, dictationcardSubmissionStatus: true }
                })
            } else if (submission.type === "flashcard") {
                dispatch({
                    type: ADD_SUBMISSION_FLASHCARD,
                    payload: { id: data.data.flashcardSubmissionId, user_id: data.data.userId, displayName: data.data.displayName, picture: data.data.picture, flashcard_id: submission.flashcardId, flashcardSubmissionRecording: submission.flashcardSubmissionRecording, flashcardSubmissionStatus: true }
                })
            } else if (submission.type === "quizcard") {
                console.log("submission in MC action", submission);
                console.log("data in MC action", data);

                dispatch({
                    type: ADD_SUBMISSION_QUIZCARD,
                    payload: { user_id: data.data.user_id, displayName: data.data.displayName, picture: data.data.picture, quizcardQuestionSubmission: data.data.quizcardSubmission, quizcard_id: submission.quizcardId, question_id: submission.quizcardQuestionSubmission.questionId }
                })
            }
        })
        .catch(err => console.log("Error: ", err))
}

export const deleteSubmissionThunk = (submission) => async (dispatch) => {
    return axios.delete("http://localhost:8080/api/card/submission", submission)
        .then((response) => {
            console.log(response)
            if (submission.type === "dictation") {
                dispatch({
                    type: DELETE_SUBMISSION_DICTATIONCARD,
                    payload: { dictationcard_id: submission.dictationcardId, dictationcardSubmission_id: submission.dictationcardSubmissionId }
                })
            } else if (submission.type === "flashcard") {
                dispatch({
                    type: DELETE_SUBMISSION_FLASHCARD,
                    payload: { flashcard_id: submission.flashcardId, flashcardSubmission_id: submission.flashcardSubmissionId }
                })
            } else if (submission.type === "multipleChoice") {
                dispatch({
                    type: DELETE_SUBMISSION_MULTIPLECHOICE,
                    payload: { multipleChoice_id: submission.multipleChoiceId, multiplechoiceSubmission_id: submission.multiplechoiceSubmissionId }
                })
            } else if (submission.type === "trueFalse") {
                dispatch({
                    type: DELETE_SUBMISSION_TRUEFALSE,
                    payload: { trueFalse_id: submission.trueFalseId, truefalseSubmission_id: submission.truefalseSubmissionId }
                })
            }
        })
        .catch(err => console.log("Error: ", err))
}