import React, {Component, Fragment} from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import {connect} from 'react-redux';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }


    render() {
        return (
            <Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                {this.props.type === 'middle' ? <div
                    className={this.props.userTheme === 1 ? classes.ModalDarkMiddle : classes.ModalMiddle}
                    style={{
                        pointerEvents: this.props.show ? 'auto' : 'none',
                        transform: this.props.show ? 'translateY(0)' : 'translateY(2vh)',
                        opacity: this.props.show ? '1': '0'
                    }}>
                    {this.props.children}
                </div>
                : <div
                    className={this.props.userTheme === 1 ? classes.ModalDark : classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1': '0'
                    }}>
                    {this.props.children}
                </div>}      
            </Fragment>
        )
    };
};

const mapStateToProps = state => {
    return {
        userTheme: state.auth.userTheme
    }
}

export default connect(mapStateToProps)(Modal);