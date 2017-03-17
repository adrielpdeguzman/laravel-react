import React from 'react';
import ReactDOM from 'react-dom';

export default class Datatable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pagination: [],
            isLoading: false,
            params: {
                q: '',
                page: 1,
                perPage: 5,
                sortBy: 'name',
            },
        };

        this.fetchData = this.fetchData.bind(this);
        this.reloadData = _.debounce(this.fetchData, 100).bind(this);
        this.onParamsChange = this.onParamsChange.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                { this.state.isLoading ? <LoadingOverlay /> : '' }
                <TableParams params={ this.state.params } handleOnChange={ this.onParamsChange } />
                <hr />
                <table className="table table-condensed table-bordered table-striped">
                    <TableHeader
                        fields={ this.props.fields }
                        headers={ this.props.headers }
                        params={ this.state.params }
                        handleOnChange={ this.onParamsChange }
                    />
                    <TableBody data={ this.state.data } fieldsCount={ this.props.fields.length } />
                </table>
                <Pagination pagination={ this.state.pagination } handleOnChange={ this.onParamsChange } />
            </div>
        );
    }

    fetchData() {
        const params = Object.assign({}, this.state.params, { fields: this.props.fields });
        this.setState({ isLoading: true });
        axios.get(this.props.url, { params })
            .then(({ data }) => {
                const pagination = Object.assign({}, data);
                delete(pagination.data);

                this.setState({ 
                    pagination,
                    data: data.data,
                });

                this.setState({ isLoading: false });
            });
    }

    onParamsChange(key, value) {
        const params = Object.assign({}, this.state.params, { [key]: value });

        // Reset page param when changing other params
        if (key !== 'page') {
            params.page = 1;
        }

        this.setState({ params });
        this.reloadData();
    }
}

class TableHeader extends React.Component {
    constructor(props) {
         super(props);

         this.onSortByChange = this.onSortByChange.bind(this);
    }

    onSortByChange(field) {
        if (this.props.params.sortBy === field) {
            this.props.handleOnChange('sortBy', `-${field}`);
        } else {
            this.props.handleOnChange('sortBy', field);
        }
    }

    render() {
        const sortBy = this.props.params.sortBy.replace('-', '');
        const isDesc = sortBy !== this.props.params.sortBy;

        const headers = this.props.headers.map((item, index) => {
            let sortArrow;
            if (this.props.fields[index] === sortBy) {
                if (isDesc) {
                    sortArrow = <span className="glyphicon glyphicon-chevron-down pull-right"></span>;
                } else {
                    sortArrow = <span className="glyphicon glyphicon-chevron-up pull-right"></span>;
                }
            }

            return (
                <th key={ item } onClick={ () => { this.onSortByChange(this.props.fields[index]) } }>
                    { item } { sortArrow }
                </th>
            );
        });
        
        return (
            <thead>
                <tr>
                    { headers }
                </tr>
            </thead>
        );
    }
}

class TableBody extends React.Component {
    render() {
        let rows;

        if (this.props.data.length > 0) {
            rows = this.props.data.map(item => (
                <tr key={ item.id }>
                    <td>{ item.id }</td>
                    <td>{ item.name }</td>
                    <td>{ item.email }</td>
                </tr>
            ));
        } else {
            rows = <tr><td className="text-center" colSpan={ this.props.fieldsCount }>No Results Found!</td></tr>;
        }
        
        
        return (
            <tbody>{ rows }</tbody>
        );
    }
}

class TableParams extends React.Component {
    render() {
        return (
            <form className="row" name="params">
                <div className="col-lg-9">
                    <input
                        type="text"
                        name="q"
                        placeholder="Search"
                        style={ { width: '100%' } }
                        className="form-control"
                        defaultValue={ this.props.params.q }
                        onChange={ (e) => this.props.handleOnChange(e.target.name, e.target.value) }
                    />
                </div>

                <div className="col-lg-3">
                    <select
                        name="perPage"
                        value={ this.props.params.perPage }
                        className="form-control"
                        onChange={ (e) => this.props.handleOnChange(e.target.name, e.target.value) }
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
            </form>
        );
    }
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.onPageChange = this.onPageChange.bind(this);
    }

    onPageChange(page) {
        if (page > 0 && page <= this.props.pagination.last_page) {
            this.props.handleOnChange('page', page);
        }
    }

    render() {
        const hasNextPage = this.props.pagination.next_page_url !== null;
        const hasPreviousPage = this.props.pagination.prev_page_url !== null;

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className={ hasPreviousPage ? '' : 'disabled' }>
                        <a aria-label="First Page" onClick={ () => this.onPageChange(1) }>
                            <span aria-hidden="true">|&laquo;</span>
                        </a>
                    </li>
                    <li className={ hasPreviousPage ? '' : 'disabled' }>
                        <a aria-label="Previous" onClick={ () => this.onPageChange(this.props.pagination.current_page - 1) }>
                            <span aria-hidden="true">Previous</span>
                        </a>
                    </li>
                    <li className={ hasNextPage ? '' : 'disabled' }>
                        <a aria-label="Next" onClick={ () => this.onPageChange(this.props.pagination.current_page + 1) }>
                            <span aria-hidden="true">Next</span>
                        </a>
                    </li>
                    <li className={ hasNextPage ? '' : 'disabled' }>
                        <a aria-label="Last Page" onClick={ () => this.onPageChange(this.props.pagination.last_page) }>
                            <span aria-hidden="true">&raquo;|</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}

class LoadingOverlay extends React.Component {
    render() {
        return(
            <div>Loading</div>
        );
    }
}