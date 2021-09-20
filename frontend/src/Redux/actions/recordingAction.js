import axios from "axios";

export const addVideoRecordingThunk = (formData) => async (dispatch) => {

    return axios.post("http://localhost:8080/api/upload/video", formData, {headers: {'Content-Type': 'multipart/form-data' }})
    .then(response => {
        console.log("response in reecordingAction",response)
    })
    .catch(err => console.log("Error: ", err))
}

export const addAudioRecordingThunk = (recording) => async (dispatch) => {
    return axios.post("http://localhost:8080/api/upload/audio", recording)
    .then(response => {
        console.log(response)
    })
    .catch(err => console.log("Error: ", err))
}