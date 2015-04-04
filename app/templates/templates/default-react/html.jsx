// Note that this file only runs serverside

var React     = require('react');
var PostStore = require('./stores/PostStore');

var Skeleton = React.createClass({
  render: function () {
    var user = this.props.user;
    var innerHTML = this.props.innerHTML;
    
    console.log('Environment: ' + process.env.ENVIRONMENT);

    var serverLocation = process.env.ENVIRONMENT === 'production'
      ? ''
      : 'http://localhost:9090';

    /* Get the state of the app */
    var state = {
      posts: PostStore.getPosts().toArray()
    };

    /* Build initial react state variable to be consumed on browser init */
    var reactState = 'var initialReactState=' + JSON.stringify(state) + ';';

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="robots" content="NOODP" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <title>{this.props.title}</title>

          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

          {/* Google font collection, only one font allowed */}
          <link href='//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700|Oswald:700' rel='stylesheet' type='text/css' />

          {/* Main style sheet generated by site.scss */}
          <link href={serverLocation + '/site.css'} rel="stylesheet" />


        </head>
        <body>
          <section id="app" dangerouslySetInnerHTML={{__html: innerHTML}} />
          <script dangerouslySetInnerHTML={{__html: reactState}} />

          <script src={serverLocation + '/main.js'} type="text/javascript" />

        </body>
      </html>
    );
  }
});

module.exports = Skeleton;