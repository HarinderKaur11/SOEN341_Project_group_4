## Frontend

The structure for the frontend is the following:

.
+--templates
+----template_name.html
+----...
+--app.js
+--app.modules.js
+--app.routes.js
+--index.html
+--package.json

Where:
* the templates folder is where we hold all our html views
* app.js is where our front facing server's code meant for testing is stored
* app.modules.js stores all the modules we support
* app.routes.js stores all the routing logic
* index.html is the main entry point of our application


### Building and testing locally

To build the project locally you need to run `npm install` in a terminal window which is located in the frontend directory.
After installing all dependencies you must install node and run `node app.js`, you will receive a message the app is listening on
port 3001.

Open up a browser and go to http://localhost:3001 and you will be served the main index.html file.