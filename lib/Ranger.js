'use strict';

/**
 * Ranger.
 *
 * @module node-ranger
 */

var util         = require('util');
var EventEmitter = require('events').EventEmitter;
var async        = require('async');
var Promise      = require("bluebird");
var zkClient     = require('node-zookeeper-client');
var _            = require('underscore');
var customErr    = require('custom-error-generator');

// Custom Errors
var ZooKeeperError = customErr('ZooKeeperError', Error);

// Inherit from EventEmitter
util.inherits(Ranger, EventEmitter);

// Defaults
var DEFAULT_RETRY_COUNT        = 5;
var DEFAULT_RETRY_WAIT_MS      = 1000;
var DEFAULT_CONNECT_TIMEOUT_MS = 1000;
var DEFAULT_SESSION_TIMEOUT_MS = 10000;

/**
 * Create a Ranger framework client.
 *
 * @public
 * @method newClient
 *
 * @param connectionString {String} ZooKeeper connection string.
 * @param retryCount {Number} Number of times to retry.
 * @param retryWait {Number} Time in ms to wait before retrying.
 * @param connectTimeout {Number} Time in ms before the ZooKeeper connection times out.
 * @param sessionTimeout {Number} Time in ms before the ZooKeeper session times out.
 *
 * @return data {Object} return the data object
 */
function newClient(connectionString, retryCount, retryWait, connectTimeout, sessionTimeout) {
  var options = {};

  options.retries        = retryCount      || DEFAULT_RETRY_COUNT;
  options.spinDelay      = retryWait       || DEFAULT_RETRY_WAIT_MS;
  options.connectTimeout = connectTimeout  || DEFAULT_CONNECT_TIMEOUT_MS;
  options.sessionTimeout = sessionTimeout  || DEFAULT_SESSION_TIMEOUT_MS;

  return new Ranger(connectionString, options);
};

/**
 * Ranger constructor.
 *
 * @private
 * @constructor Ranger
 *
 * @param zkClient {Object} ZooKeeper client.
 */
function Ranger(connectionString, options) {
  this.connectionString = connectionString;
  this.options = options;
  this.started = false;
  this.closed = false;
};

/**
 * Is the ZooKeeper Client Connected?
 *
 * @public
 * @method isConnected
 */
Ranger.prototype.isConnected = function() {
  return this.client.getState() == zkClient.State.SYNC_CONNECTED;
};

/**
 * Return the ZooKeeper client.
 *
 * @public
 * @method getClient
 */
Ranger.prototype.getClientwithConnectionCheck = function() {
  if (this.client.getState() !== zkClient.State.SYNC_CONNECTED) {
    throw new ZooKeeperError('Connection Not Established');
  }

  return this.client;
};

/**
 * Return the ZooKeeper client.
 *
 * @public
 * @method getClient
 */
Ranger.prototype.getClient = function() {
  return this.client;
};

/**
 * Start the Ranger framework.
 *
 * @public
 * @method start
 */
Ranger.prototype.start = function() {
  var self = this;

  this.client = null;
  this.client = zkClient.createClient(this.connectionString, this.options);

  this.client.connect();

  this.client.once('connected', function () {
    self.started = true;
    self.emit('connected');
  });

  this.client.once('disconnected', function () {

    self.started = false;
    self.emit('disconnected');

    if (!self.closed){
      self.start();
    }
  });
};

/**
 *
 *
 * Close the Ranger framework.
 *
 * @public
 * @method close
 */
Ranger.prototype.close = function() {
  this.closed = true;
  this.client.close();
};

/**
 * Return if the client has been previously started.
 *
 * @public
 * @method getStarted
 */
Ranger.prototype.getStarted = function() {
  return this.started;
};

module.exports.newClient = newClient;
