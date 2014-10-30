# Formula 1 Standings

Based on [A Step-by-Step Guide to Your First AngularJS App](http://www.toptal.com/angular-js/a-step-by-step-guide-to-your-first-angularjs-app)

## FAQs

Q: I can't see the partial views because my browser says something like "Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https, chrome-extension-resource."

A: Spin up a NodeJS httpd instance:

    npm install -g http-server

    http-server -c-1

You can view the app at http://localhost:8080 