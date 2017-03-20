import React from 'react';
import ReactDOM from 'react-dom';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        
        const fields = new Object;
        this.props.fields.map(field => fields[field.name] = '');

        this.state = {
            fields,
            isLoading: false,
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    onChange(e) {
        const fields = Object.assign({}, this.state.fields, { [e.target.name]: e.target.value });
        this.setState({ fields });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ isLoading: true });

        axios[this.props.method](this.props.uri, this.state.fields)
            .then(({ data }) => {
                this.resetForm();
                this.props.success();
            })
            .catch(({ response }) => {
                this.setState({
                    errors: response.data,
                    isLoading: false,
                });
            });
    }

    resetForm() {
        const fields = new Object;
        this.props.fields.map(field => fields[field.name] = '');

        this.setState({
            fields,
            isLoading: false,
            errors: {},
        });
    }

    render() {
        const fields = this.props.fields.map(field => {
            switch (field.type) {
                case 'text':
                case 'email':
                case 'password':
                    return (
                        <div
                            key={ field.name }
                            className={ `form-group ${this.state.errors[field.name] ? 'has-error': ''}`}
                        >
                            <label htmlFor={ field.name }>{ field.label }</label>
                            <input 
                                type={ field.type }
                                id={ field.name }
                                name={ field.name }
                                value={ this.state.fields[field.name] }
                                required={ field.required }
                                disabled={ this.state.isLoading }
                                onChange={ (e) => this.onChange(e) }
                                className="form-control"
                            />
                            { this.state.errors[field.name] === null ? '' :
                                <span className="help-block">{ this.state.errors[field.name] }</span>
                            }
                        </div>
                    );
            }
        });

        return(
            <form onSubmit={ this.onSubmit }>
                { fields }
                <button type="submit" className="btn btn-primary" disabled={ this.state.isLoading }>Submit</button>
            </form>
        );
    }
}