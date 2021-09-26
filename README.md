# TAMM - Task for the backend

### This repository contains the following 2 tasks from the TAMM document

1. Write a nodejs express middleware:
   that only allows request to proceed if req has session and it's applicable only to all URLs that start with pub/proxy and api/proxy (for example pub/proxy/bpm/start or api/proxy/adu-ms/get).
2. Write endpoint post and get express handler
   That is using middleware from previous question. For post /save/:id writes contents of request body that is JSON to file named id.json and on get reads file Id and serves back as JSON.

### To run this project

1. `git clone git@github.com:mikdadayan/task-backend.git`
2. `cd REPO_NAME`
3. `npm install`
4. `npm start`

### To ckeck the first task in the list, the `authMiddleware`

1. Run this project
2. Make a GET/POST request to `http://localhost:3000/pub/proxy` or `http://localhost:3000/api/proxy`
3. You will get a success response because in the `app.ts` we have a mocked user session - `app.use(mockUser)`
4. Now try to comment out this line `app.use(mockUser)` in the `app.ts` file and make the same request
5. This time you will get an error response with the Unathorized message because there is no user session in the request
6. For the final check try to make a request to `http://localhost:3000/{something}` where something isn't starting `/pub/proxy` or `/api/proxy`
7. You should get an error response with message `URL does not match` because the request URL doesn't contain `/pub/proxy` or `/api/proxy`

### To check the second task from the list

1. Run this project
2. First you have to go to the `middlwares/mockUser.ts` file to change mocked user information (`id`, `name`, `email`)
3. Make a GET request to `http://localhost:3000/pub/proxy/save/:id` to get file and POST request `http://localhost:3000/api/proxy/save/:id` to create json file `userId.json`
4. Created files are located in `dist/controllers/data` directory.
