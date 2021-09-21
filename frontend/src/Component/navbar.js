import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
// Require Action
import { getdataThunk } from '../Redux/actions/action'
import { logoutNowThunk } from '../Redux/actions/loginboxAction'
// Require Component
import { Menu } from '../Component/menu'
// Require Css
import classes from './navbar.module.css'


class PureNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            type: ""
        };
    }
    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    componentDidMount() {
        this.props.getdata({ email: this.props.user.email })
    }

    // navigateAccount(e){
    //     this.props.history.push({
    //         pathname:`/account`,
    //         // state: { user: this.props.user}
    //     })
    // }

    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    
    render() {

        const { modal } = this.state
        return (
            <div className={classes.header}>
                    <ul className={classes.menu}>
                        <li>
                            <button onClick={() => { this.toggle() }}><i className="fas fa-bars"></i></button>
                            {modal ?  this.props.classroom ? <Menu classroom={() => this.props.classroom()} history={this.props.history}/> : this.props.set  ? <Menu set={() => this.props.set()} history={this.props.history}/>: <Menu  history={this.props.history}/> : null}
                        </li>
                        <li>
                            <Link to='/' className={classes.logo}>shadow</Link>
                        </li>
                        <li className={classes.right}>
                            <button><i className="fas fa-search"></i></button>
                        </li>
                        <li className={classes.right}> 
                            <button  className={classes.icon}><Link to="/account"><img src={this.props.user.picture} alt="Avatar"></img></Link></button>
                        </li>
                    </ul>


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