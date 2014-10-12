# Performant Design

> Completely reactified

> Uses react-router

> Primary idea is to build a performant, responsive design based on Barekit

Check out [the site](http://performantdesign.herokuapp.com/)

## Workflow

npm start (for development)
This set up the build environment and starts a webserver at http://localhost:3000
When changes are made in the __scss__ or __js__ files, the bundles are automatically
recompiled. 

This project is built with regards for deployment on Heroku. Issue __git push heroku master__ for
deployment.

For deployment on a standard node server, simply build with __npm build__ and start the server with
__node index.js__.

```
BUILDPACK_URL:            https://github.com/heroku/heroku-buildpack-nodejs
NODE_ENV:                 production
```

