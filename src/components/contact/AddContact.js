import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';

export default class AddContact extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }


    onSubmit = async (dispatch, e) => {
        e.preventDefault();

        const { name, email, phone } = this.state;

        // Validating Input
        if (name === '') {
            this.setState({ errors: { name: 'Name is Required' } });
            return;
        }
        if (email === '') {
            this.setState({ errors: { email: 'Email is Required' } });
            return;
        }
        if (phone === '') {
            this.setState({ errors: { phone: 'Contact is Required' } });
            return;
        }

        const newContact = {
            name,
            email,
            phone
        };

        const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);

        dispatch({ type: 'ADD_CONTACT', payload: res.data });

        // Clearing Inputs
        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        });

        // Redirecting to Home
        this.props.history.push('/');

    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        const { name, email, phone, errors } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-3">
                            <div className="card-header">Add Contact</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                    <TextInputGroup
                                        label="Name"
                                        name="name"
                                        placeholder="Enter Name..."
                                        value={name}
                                        onChange={this.onChange}
                                        error={errors.name}
                                    />
                                    <TextInputGroup
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter Email..."
                                        value={email}
                                        onChange={this.onChange}
                                        error={errors.email}
                                    />
                                    <TextInputGroup
                                        label="Phone"
                                        name="phone"
                                        placeholder="e.g 332-883-1270"
                                        value={phone}
                                        onChange={this.onChange}
                                        error={errors.contact}
                                    />
                                    <input type="submit" value="Add Contact" className="btn btn-light btn-block" />
                                </form>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )


    }
}
