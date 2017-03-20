import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../components/Modal';
import Datatable from '../components/Datatable';

export default class Users extends React.Component {
    render() {
        return(
            <div>
                <Datatable 
                    url="/users"
                    fields={ ['id', 'name', 'email'] }
                    headers={ ['ID', 'Name', 'E-mail Address'] }
                />

                <Modal
                    title="Create a User"
                    callback={ () => console.log('eh') }
                >
                    Modal content
                </Modal>
            </div>
        );
    }
}