import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'

const TextInputGroup = ({
    label,
    name,
    type,
    value,
    placeholder,
    onChange,
    error
}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className={classnames('form-control form-control-lg', { 'is-invalid': error })}
                value={value}
                onChange={onChange}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

export default TextInputGroup;

TextInputGroup.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
}

TextInputGroup.defaultProps = {
    type: 'text',
    placeholder: ''
}