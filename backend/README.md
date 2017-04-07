# Installation

```
git clone https://github.com/bersling/typescript-mongo-express-node-seed.git <your-project-name>-backend
cd <your-project-name>-backend
npm install
```

# Run
Make sure you have typescript installed, then run:
```
npm start
```

# Test
```
npm test
```


# Database
When you first run this project, it will connect to a remote Mongo instance I have setup so this project can be run with minimal overhead. However, I advise you to create your own `<project>/properties/local.properties.json` and `<project>/properties/test.properties.json`, since the remote mongo instance is cleaned on a regular basis.
