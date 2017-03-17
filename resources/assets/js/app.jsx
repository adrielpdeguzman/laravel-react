
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import Datatable from './components/Datatable';

ReactDOM.render(
    <div>
        <Datatable 
            url="/users"
            fields={ ['id', 'name', 'email'] }
            headers={ ['ID', 'Name', 'E-mail Address'] }
        />
    </div>,
    document.getElementById('app')
);
