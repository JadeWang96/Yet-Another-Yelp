# Yet-Another-Yelp

A full stack project using ExpressJS and NodeJS framework, as well as MongoDB.

## Tech Stack
- ExpressJS
- NodeJS
- PassportJS
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
```shell
// Get the IP address of container
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
name    url         verb            desc.
====================================================
```

## Authentication