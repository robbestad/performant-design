/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

//var sweetAlert = require("./alert");
//sweetAlert("Oops...", "Something went wrong!", "error");
//var Metagrid = require ("./components/metagrid");
var Metagrid = require ("react-grid");

var Routes = Router.Routes;
var Link = Router.Link;
var NotFoundRoute = Router.NotFoundRoute;
var $ = require('jquery')(window);
var jQuery = require('jquery');
var appr = require('./app-ready');
var moment = require ('moment');
var StickyDiv = require ('react-stickydiv');
var Spinner = require ('./components/spinner.react');

var api = 'http://api.robbestad.com/robbestad';
var _blogData = {};
var _changeListeners = [];
var _initCalled = false;



React.initializeTouchEvents(true);

var menuBreakpoint=3068;

var SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
        this.intervals.map(clearInterval);
    }
};


var App = React.createClass({
    getInitialState: function() {
        return {
            loading: true
        };
    },
   
    componentWillMount: function () {
        window.app=this;
    },

    componentDidMount: function() {
        if(undefined !== window.spinner) window.spinner.showSpinner();
    },

    componentWillUnmount: function () {
    },

    updateContacts: function (blogitems) {
        if (!this.isMounted())
            return;

        this.setState({
            loading: false
        });
        window.spinner.hideSpinner();
    },

    render: function() {
        var sidebarVisible=this.state.sidebarVisible;
        var sidebarWidth = document.body.clientWidth;
        return (<div />);
    }
});

var Index = React.createClass({
    getInitialState: function() {
        return {
            blogitems: BlogStore.getItems()
        };
    },
    componentWillMount: function () {
        window.sidebar=this;
    },

    componentDidMount: function() {

    },

    componentWillUnmount: function () {
    },

    updateContacts: function (blogitems) {
        if (!this.isMounted())
            return;
        jQuery( "body" ).addClass( "visible animated fadeIn" );
    },
    render: function() {
    render(<div/>);
    }

});


var NotFound = React.createClass({
    render: function() {
        return <h2>Not found</h2>;
    }
});

// Request utils.

function getJSON(url, cb) {
    var req = new XMLHttpRequest();
    req.onload = function() {
        if (req.status === 404) {
            cb(new Error('not found'));
        } else {
            cb(null, JSON.parse(req.response));
        }
    };
    req.open('GET', url);
    req.send();
}

function postJSON(url, obj, cb) {
    var req = new XMLHttpRequest();
    req.onload = function() {
        cb(JSON.parse(req.response));
    };
    req.open('POST', url);
    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    req.send(JSON.stringify(obj));
}

function deleteJSON(url, cb) {
    var req = new XMLHttpRequest();
    req.onload = cb;
    req.open('DELETE', url);
    req.send();
}

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={Index}/>
        <Route name="index" path=":id" handler={Index}/>
        <NotFoundRoute handler={NotFound}/>
    </Route>
    );

React.renderComponent(
    <Routes children={routes}/>,
    document.getElementById('App')
);

