import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import classes from './navbar.module.css'
import { getdataThunk } from '../Redux/actions/action'
import { logoutNowThunk } from '../Redux/actions/loginboxAction'
import { Menu } from '../Component/menu'
import Search from './searchbox'


class PureNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            type: ""
        };
    }
    toggle() {
        console.log('t')
        this.setState({
            modal: !this.state.modal,
        });
    }

    componentDidMount() {
        this.props.getdata({ email: this.props.user.email })
    }

    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    
    render() {

        const { modal } = this.state
        return (
            <div className={classes.header}>
                    <div className={classes.left}>
                        <Link to='/' className={classes.logo}>shadow</Link>
                    </div>

                    <div className={classes.middle}>
                        <button onClick={() => { this.toggle() }}><i className="fas fa-bars"></i></button>
                    </div>

                    <div className={classes.right}>
                        <button><i className="fas fa-search"></i></button>
                        {/* <Search class={this.props.classrooms} set={this.props.sets}/> */}
                        <Link to="/account" className={classes.icon}><img src={this.props.user.picture} alt="Avatar"></img></Link>
                    </div>
                    <div className="d-flex justify-content-center ">
                        {modal ? <Menu history={this.props.history}/> : null}
                    </div>
                </div>

        );
    }
}


const mapStateToProps = (state) => {
                    // console.log("state in dashboard", state);

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
        logout: () => {
                    dispatch(logoutNowThunk())
                }
    }
}



export const NavBar = connect(mapStateToProps, mapDispatchToProps)(PureNavBar)