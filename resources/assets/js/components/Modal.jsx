import React from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends React.Component {
    render() {
        return (
            <div>
                <div id={ this.props.id } className="modal fade in" tabIndex="-1" role="dialog" data-backdrop="static">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">{ this.props.title || 'Modal Title' }</h4>
                            </div>

                            <div className="modal-body">
                                { this.props.children }
                            </div>

                            { !this.props.footer ? '' :
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={ this.props.callback }>Save changes</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}