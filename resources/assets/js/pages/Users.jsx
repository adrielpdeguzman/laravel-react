import React from 'react';
import ReactDOM from 'react-dom';
import Form from '../components/Form';
import Modal from '../components/Modal';
import Datatable from '../components/Datatable';

export default class Users extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    }

    onSubmitSuccess() {
        $('#addFormModal').modal('hide');
        this.datatable.reloadData();
    }

    render() {
        return(
            <div>
                <Datatable
                    ref={ (table) => this.datatable = table }
                    url="/users"
                    fields={ ['id', 'name', 'email'] }
                    headers={ ['ID', 'Name', 'E-mail Address'] }
                />

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={ () => $('#addFormModal').modal('show') }
                >
                    Create a User
                </button>

                <Modal
                    id="addFormModal"
                    title="Create a User"
                    footer={ false }
                >
                    <Form
                        uri="/users/"
                        method="post"
                        success={ this.onSubmitSuccess }
                        fields={[
                            {
                                name: 'name',
                                type: 'text',
                                label: 'Full Name',
                                required: true,
                            },
                            {
                                name: 'email',
                                type: 'email',
                                label: 'E-mail Address',
                                required: true,
                            },
                            { 
                                name: 'password',
                                type: 'password',
                                label: 'Password',
                                required: true,
                            },
                            {
                                name: 'password_confirmation',
                                type: 'password',
                                label: 'Confirm Password',
                                required: true,
                            },
                        ]}
                    />
                </Modal>
            </div>
        );
    }
}