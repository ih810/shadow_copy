import React from 'react';
import {connect} from 'react-redux';
import { addAudioRecordingThunk } from '../Redux/actions/recordingAction';
import { v4 as uuidv4 } from 'uuid';

class PureAudioRecorder extends React.Component {
    stream
    constructor(props){
        super(props)
        this.state = {
            show: Boolean(),
            recording: false,
            preview: ""
        };
        this.handleshow = this.handleshow.bind(this);
    }

    handleshow() {
        this.setState((prevState) => {
            return {
                show: !prevState.show
            }
        });
    }

    handlePreview(audioURL){
        this.setState({
            preview: audioURL
        })
    }

    async start() {
        console.log("ready for record..");
        this.stream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true
        })

        this.audio.srcObject = this.stream;
        this.audio.play()
        .catch((err) => {
            console.log(err);
        });

        // init recording
        this.mediaRecorder = new MediaRecorder(this.stream, {
            mimeType: 'audio/webm'
        });
        // init data storage for audio chunks
        this.chunks = [];
        // listen for data from media recorder
        this.mediaRecorder.ondataavailable = e => {
            if (e.data && e.data.size > 0) {
                this.chunks.push(e.data);
            }
        };
    }

    startRecording(e) {
        console.log('startiung')
        e.preventDefault();
        // wipe old data chunks
        this.chunks = [];
        // start recorder with 10ms buffer
        this.mediaRecorder.start(10);
        // say that we're recording
        this.setState({ recording: true });
    }

    stopRecording(e) {
        console.log('stoppiung')
        e.preventDefault();
        // stop the recorder
        this.mediaRecorder.stop();
        // say that we're not recording
        this.setState({ recording: false });
        // save the audio to memory
        this.upload()
        this.stream.getTracks().forEach(function (track) {
            if ((track.readyState === 'live' && track.kind === 'audio') || (track.readyState === 'live' && track.kind === 'audio')) {
                track.stop()
            }
        })
    }

    async upload() {
        await this.handleshow()
        const blob = new Blob(this.chunks, {
            type: 'audio/webm'
        });
        let time = new Date()
        let dt = time.getTime()
        let fileName = uuidv4()

        let formData = new FormData();
        formData.append("file", blob, fileName)
        console.log("PLS TELL ME WT IS FORMDATA",formData);

        const audioURL = window.URL.createObjectURL(blob);
        //this.props.handleRecording(fileName)

        // append audioURL to list of saved audios for rendering
        const preview = document.getElementById('preview');
        preview.setAttribute("src", audioURL)

        // Upload to S3
        this.props.audiorecordingMDP(formData)
    }

    render() {
        const { show } = this.state;
        return (
            <div>
            <div className="flex-col d-flex justify-content-center" id="audioSubmission">
                {show ? <audio ref={a => { this.audio = a }} className="bg-dark" id="audio" autoPlay={true}  muted ></audio> : null}

                {!show ? <audio ref={b => { this.player = b }} controls id="preview" src="" autoPlay={true}   ></audio> : null}
            </div>
            <div className="row flex-row flex-nowrap">
                <div className="p-3 ml-auto mr-auto ">
                    {!show ? <span className="rounded-pill border border-warning bg-transparent p-2" id="start" title="Start Feed" onClick={() => { this.start(); this.handleshow() }}><i
                        className="fas fa-power-off"></i></span> : null}
                    {show ? <span className="rounded-pill border border-warning bg-transparent p-2" id="startRecording"
                        title="Start Recording" onClick={e => this.startRecording(e)}><i className="fas fa-circle"></i></span> : null}
                    {show ? <span className="rounded-pill border border-warning bg-transparent p-2" id="stopRecording"
                        title="Stop Recording" onClick={e => this.stopRecording(e)}><i className="fas fa-stop"></i></span> : null}
                </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.authStore.email,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        audiorecordingMDP: (formData) => {
                   
            dispatch(addAudioRecordingThunk(formData))
        }
    }
}

export const AudioRecorder = connect(mapStateToProps, mapDispatchToProps)(PureAudioRecorder)