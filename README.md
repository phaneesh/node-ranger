# Ranger Node
nodejs port for feature rich [ranger](https://github.com/flipkart-incubator/ranger) service discovery framework

[![NPM](https://nodei.co/npm/ranger-node.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ranger-node/)

## Installation

    npm install node-ranger --save

## Examples

### Service Registration

```javascript
'use strict';

var Ranger               = require('ranger').Ranger;
var ServiceInstanceBuilder  = require('ranger').ServiceInstanceBuilder;
var ServiceDiscoveryBuilder = require('ranger').ServiceDiscoveryBuilder;

// Client
var rangerClient = Ranger.newClient('127.0.0.1:2181');

// Start the client (connect to ZooKeeper)
rangerClient.start();

// Service Instance
var serviceInstance = ServiceInstanceBuilder
                        .builder()
                        .address('127.0.0.1')
                        .port(process.env.PORT)
                        .name('my/service/name/v1')
                        .build();

// Service Discovery
var serviceDiscovery = ServiceDiscoveryBuilder
                         .builder()
                         .client(rangerClient)
                         .thisInstance(serviceInstance)
                         .basePath('services')
                         .build();

// Register a Service
serviceDiscovery.registerService(function onRegister(err, data) {
  console.log({
    id: data.id,
    name: data.name,
    address: data.address,
    port: data.port
  });
});

```

### Service Discovery

```javascript
'use strict';

var Ranger               = require('ranger').Ranger;
var ServiceInstanceBuilder  = require('ranger').ServiceInstanceBuilder;
var ServiceDiscoveryBuilder = require('ranger').ServiceDiscoveryBuilder;

// Client
var rangerClient = Ranger.newClient('127.0.0.1:2181');


// Start the client (connect to ZooKeeper)
rangerClient.start();


// Service Instance
var serviceInstance = ServiceInstanceBuilder
                        .builder()
                        .address('127.0.0.1')
                        .port(process.env.PORT)
                        .name('my/service/name/v1')
                        .build();

// Service Discovery
var serviceDiscovery = ServiceDiscoveryBuilder
                         .builder()
                         .client(rangerClientClient)
                         .thisInstance(serviceInstance)
                         .basePath('services')
                         .build();

// Service Provider (providerStrategy: 'RoundRobin' or 'Random')
var serviceProvider = serviceDiscovery.serviceProviderBuilder()
                        .serviceName('my/service/name/v1')
                        .providerStrategy('RoundRobin')
                        .build();

// Discover available Services and provide an instance
serviceProvider.getInstance(function onInstanceReturn(err, data) {
  console.log({
    id: data.id,
    name: data.name,
    address: data.address,
    port: data.port,
    serviceUrl: serviceUrl
  });
});

```
