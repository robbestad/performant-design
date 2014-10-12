/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

//var sweetAlert = require("./alert");
//sweetAlert("Oops...", "Something went wrong!", "error");
//var Metagrid = require ("./components/metagrid");
var Metagrid = require ("react-grid");

var stickyDiv = require("react-stickydiv");


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
    mixins: [SetIntervalMixin], // Use the mixin

    getInitialState: function() {
        return {
            loading: true,
            width:'500',
            scrollTop:0
        };
    },
   
    componentWillMount: function () {
        window.app=this;
    },

    componentDidMount: function() {
        this.setInterval(this.tick, 60); // Call a method on the mixin
    },
    tick: function() {
        var state=this.state;
        state.width=jQuery(".mainRow").width();
        var scrollTop = (window.pageYOffset !== undefined) ?
            window.pageYOffset : (document.documentElement ||
            document.body.parentNode || document.body).scrollTop;
        state.scrollTop=scrollTop;
        this.setState(state);
    },

    componentWillUnmount: function () {
    },

    render: function() {
        var sidebarVisible=this.state.sidebarVisible;
        var width = this.state.width;
        var padding={
            marginTop:'0px',
            paddingTop: '0px'
        };

        if(this.state.scrollTop>250){
            padding={
                marginTop:'30px',
                paddingTop: '0px'
            };
        }
        return (<section className="app">

            <a id="home"></a>
            <div className="wrapper">
            <div className="masthead">
                <h1 className="logo animated zoomIn">Responsive Performant Design</h1>
            </div>

            <div className="content">

                <div className="modal" id="modal">
                    <a href="#" className="modal-close right">Close</a>
                    <img className="modal-img lg-12 md-12 sm-12" src="#" alt=""/>
                </div>
                <stickyDiv togglepoint="250" top="0" width={width} >
                    <section className="navbar-wrapper navbar nav">
                        <div className="subnav">
                            <ul className="no-bullets text-center">
                                <li className="subnav-usage"><a href="#home">Top</a>
                                </li>
                                <li className="subnav-setup"><a href="#automation">Automation</a>
                                </li>
                                <li className="subnav-features"><a href="#speed">Speed</a>
                                </li>
                            </ul>
                        </div>
                    </section>
                </stickyDiv>


                <div className="row mainRow" >
                    <div className="lg-4 sm-12 md-12 standout bottomMargin has-gutter">
                    Web design is not all about creating good looking pages, but it's also about creating a
                    snappy system that doesn't require the user to wait longer than necessary before
                    the page loads.
                    </div>
                    <div className="lg-8 sm-12 md-12 has-gutter">
                        <p className="">
                        BareKit is a promising
                        new CSS framework that is comparable to Bootstrap in many respects, though it
                        lacks many of the features and functionality that makes Bootstrap
                        attractive.

                        </p>

                        <p className="topPadding">

                        However, if you
                        can implement everything you want in a restrictive framework, both you and your users
                        can benefit greatly.


                        </p>
                    </div>
                </div>

                <div className="topPadding clearfix"></div>

                <div className="wrapper">
                    <h2 className="text-center">Features</h2>

                    <ul className="features no-bullets">
                        <li className="sm-12 md-4 lg-4">
                            <div className="row feature text-center">
                                <h5>Responsive</h5>

                                <p className="feature-text">It's easy to create responsive pages with CSS frameworks such as BareKit. Try
                                and expand or shrink this page, or open this page in a mobile browser.</p>
                            </div>
                        </li>
                        <li className="sm-12 md-4 lg-4">
                            <div className="row feature text-center">
                                <h5>Sass &amp; Autoprefixer</h5>

                                <p className="feature-text">
                                The CSS code on this page is written in SASS. The Gulp build system automatically creates all
                                prefixes
                                on the fly for compatibility with all browsers.
                                </p>
                            </div>
                        </li>
                        <li className="sm-12 md-4 lg-4">
                            <div className="row feature text-center">
                                <h5>Grid</h5>

                                <p className="feature-text">
                                Grids have proven to be a very capable way of designing web pages.
                                BareKit provides a flexible grid that makes setting up pages a breeze.
                                    <a id="automation"></a>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="clearfix"></div>
                <div className="row">
                    <div className="clearfix"></div>
                    <div className="lg-12 md-12 sm-12">
                        <h2>Automation</h2>

                    </div>


                    <div className="clearfix"></div>
                    <div className=" lg-6 md-12 sm-12">
                        <h4>Automate everything</h4>

                        <p className="clearfix">
                        You don't have to use Gulp. You can use Grunt, Broccoli, npm or even make if you're nostalgic. Just don't
                        do things manually if you can help it. It's better to invest time writing a good automation logic than
                        manually copying things around everytime you want to deploy.</p>
                    </div>
                    <div className=" lg-6 md-12 sm-12">
                        <a href="#" className="modal-trigger" data-options='{ "modalId": "modal" }'>
                            <img width="332" height="198" className="modal-event lg-12 md-12 sm-12" src="img/gulp.png" alt="Gulp automation"/>
                        </a>
                    </div>

                    <div className="clearfix"></div>
                    <div className="lg-12 md-12 sm-12">
                        <p className="clearfix">While we're on the matter of deploying, always set up your system so that you
                        can deploy your website into production at any minute. </p>

                        <p className="clearfix">For instance, when working with a CSS preprocessor, set it up in such a way that you're
                        always compiling it and viewing your build on compiled code. This makes it deploying the compiled
                        code easier and faster. Take a look at the source code for this project and let that be an
                        inspiration.
                            <a id="speed"></a>
                        </p>

                    </div>
                </div>

                <div className="clearfix"></div>
                <div className="row">
                    <div className="clearfix"></div>
                    <div className="lg-12 md-12 sm-12">
                        <h2>Speed</h2>
                        <h4>Design your webpages for speed</h4>

                    </div>

                    <div className="clearfix"></div>
                    <div className=" lg-6 md-12 sm-12">

                        <a href="#" className="modal-trigger" data-options='{ "modalId": "modal" }'>
                            <img width="332" height="234" className="modal-event lg-12 md-12 sm-12" src="img/yslow.png" alt="ySlow result"/>
                        </a>


                    </div>
                    <div className=" lg-6 md-12 sm-12">
                        <p className="clearfix">Use measurement tools like Yahoo's ySlow to find areas of your webpage that is lacking.
                        ySlow scores your page based on a number of different areas. Aim for a grade of 'A' on everything.</p>


                        <p className="clearfix">This may be a bit hard at first, but google the areas where you score low and make the
                        appropriate changes.</p>

                        <p className="clearfix">Another useful tool is <a href="https://developers.google.com/speed/pagespeed/">Google's PageSpeed</a>. In addition to ranking your overall pagespeed, it will also test the responsiveness of your page and rank how well it works on mobile devices. </p>

                    </div>


                </div>


                <div className="lg-12 md-12 sm-12 ">

                    <footer className="row footer">
                        <div className="wrapper text-center">
                        © 2014 <a href="http://www.robbestad.com">Sven Anders Robbestad</a>.
                        Twitter: <a href="https://twitter.com/svenardocom">@svenardocom</a>
                        </div>
                    </footer>

                </div>

                <div className="clearfix">&nbsp;</div>


            </div>
            </div>
            </section>);
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

