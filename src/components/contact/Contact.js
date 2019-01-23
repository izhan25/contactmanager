import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Consumer } from '../../context';


class Contact extends Component {

    state = {
        showContactInfo: false
    };

    onDelete = async (id, dispatch) => {

        // NOTE : Dont use try catch like this in real application
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            dispatch({ type: 'DELETE_CONTACT', payload: id });
        } catch (e) {
            dispatch({ type: 'DELETE_CONTACT', payload: id });
        }

    }

    render() {

        const { id, name, email, phone } = this.props.contact
        return (

            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-3">
                            <h4 className="text-capitalize">
                                {name}
                                <i
                                    onClick={
                                        () => this.setState({ showContactInfo: !this.state.showContactInfo })
                                    }
                                    className="fas fa-sort-down"
                                    style={{ cursor: 'pointer' }}
                                />
                                <i className="fas fa-times"
                                    style={{ color: 'red', float: 'right', cursor: 'pointer' }}
                                    onClick={this.onDelete.bind(this, id, dispatch)}
                                />
                                <Link to={`/contact/edit/${id}`}>
                                    <i className="fas fa-pencil-alt mr-1"
                                        style={{ color: 'black', float: 'right', cursor: 'pointer' }}
                                    />
                                </Link>
                            </h4>
                            {
                                this.state.showContactInfo ?
                                    <ul className="list-group">
                                        <li className="list-group-item">Email: {email}</li>
                                        <li className="list-group-item">Phone: {phone}</li>
                                    </ul> :
                                    null
                            }

                        </div>
                    )
                }}
            </Consumer>



        )
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default Contact;
