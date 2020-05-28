# Yet-Another-Yelp

A full stack project using ExpressJS and NodeJS framework, as well as MongoDB.

## Tech Stack
- ExpressJS
- NodeJS
- PassportJS (for authentication)
- MongoDB
- Docker

## UI
- BootStrap

## Build
### Docker
```shell
docker pull mongo
docker run -d -p 27017:27017 -v {$pwd}:/data/db --name mongoDB mongo:latest
```

### App
```shell
npm install
```

### Database Setup
Get the IP address of container
```shell
docker inspect mongoDB
```
```javascript
mongoose.connect("mongodb://{container IP address}:27017", { useNewUrlParser: true, useUnifiedTopology: true });

// PORT for nodeJS is default 3000
app.listen(PORT, process.env.IP, function () {
    console.log("Server has started!");
});
```

## Run
```shell
docker start mongoDB
node app.js
```
or 
```shell
docker start mongoDB
nodemon
```

## RESTful Routes
```text
name                        url                                         HTTP Verb
================================================================================
Landing Page                /                                           GET

Index Display               /campgrounds                                GET
Campgrounds Create          /campgrounds                                POST
Campgrounds New             /campgrounds/new                            GET
Campgrounds Show            /campgrounds/:id                            GET
Campgrounds Edit            /campgrounds/:id/edit                       PUT
Campgrounds Destroy         /campgrounds/:id                            DELETE    

Auth Register Display       /register                                   GET
Auth Register Handle        /register                                   POST
Auth Login Display          /login                                      GET
Auth Login Handle           /login                                      POST
Auth Logout                 /logout                                     GET

Comment New                 /campgrounds/:id/comments/new               GET
Comment Create              /campgrounds/:id/comments                   POST    
Comment Edit                /campgrounds/:id/comments/:comment_id/edit  GET
Comment Update              /campgrounds/:id/comments/:comment_id       PUT
Comment Destroy             /campgrounds/:id/comments/:comment_id       DELETE
```