# Parking

### Implement a Backend Developer (NooeJs) Test

start dev at 04/2022 with Parinya Kowitsakul



## Running

### Run with Docker Compose
Move to the base directory, Build and Run Docker Image

```bashxxxx
docker-compose up --build
```

Or to run it on the background, just add -d option:

```bashxxxx
docker-compose up -d --build
```

And open http://localhost:8080 to see the results.

If you need to stop the containers:

```bashxxxx
docker-compose down
```

### Run without Docker Compose

Move to the base directory, Run 
```bashxxxx
npm install

npm run migrate

npm run seed

npm run start
```

Testing
```bashxxxx
cd tests

npm test carSize.test.js

npm test parking.test.js

npm test parkingRegistration.test.js
```
