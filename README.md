# Oasis

### WebSockets Docs
* Binance:
  * https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams
* Kraken
  * https://docs.kraken.com/websockets/#message-trade
* Coinbase
  * https://docs.cloud.coinbase.com/exchange/docs/websocket-overview
  * https://help.coinbase.com/en/cloud/websocket-feeds/exchange

### Tools Docs:
* Logger
  * [Pino](https://getpino.io/#/)
* Websockets
  * [Tests article](https://thomason-isaiah.medium.com/writing-integration-tests-for-websocket-servers-using-jest-and-ws-8e5c61726b2a)

<hr>
### MongoDB

1. Pull the MongoDB image from the Docker registry:
> docker pull mongo

2. Run a new container using the MongoDB image with bound port 27017:
> docker run --name some-mongo -p 27017:27017 -d mongo

3. Connect to the MongoDB instance running in the container:
> docker exec -it some-mongo mongo

4. To persist the data, you can mount a host directory as a data volume for the container:
> docker run --name some-mongo -v /my/own/datadir:/data/db -d mongo

5. To specify the MongoDB configuration options by creating a custom mongod.conf file and mounting it as a configuration volume for the container:
> docker run --name some-mongo -v /my/own/mongod.conf:/etc/mongod.conf -d mongo --config /etc/mongod.conf

6. An example of a basic mongod.conf file that can be used to configure a MongoDB instance:
```
# mongod.conf

# MongoDB configuration file

# Where and how to store data.
storage:
  dbPath: /data/db
  journal:
    enabled: true

# Where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# Network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0

# Process management options
processManagement:
  fork: true
  pidFilePath: /var/run/mongodb/mongod.pid

# Replication options
replication:
  replSetName: rs0

```

### Ref
* [Websocket Server with Express](https://cheatcode.co/tutorials/how-to-set-up-a-websocket-server-with-node-js-and-express)
* [API Guide](https://github.com/losikov/api-example)
* [Angular tips - youtube channel](https://www.youtube.com/@kreuzercode/videos)
