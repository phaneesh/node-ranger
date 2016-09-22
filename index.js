/**
 *
 * Ranger Service Discovery.
 *
 * @module node-ranger
 *
 */

var Ranger                   = require('./lib/Ranger');
var ServiceDiscoveryBuilder     = require('./lib/ServiceDiscoveryBuilder');
var ServiceInstanceBuilder      = require('./lib/ServiceInstanceBuilder');
var ServiceProvider             = require('./lib/ServiceProvider');
var ServiceProviderBuilder      = require('./lib/ServiceProviderBuilder');
var GetChildrenBuilder          = require('./lib/GetChildrenBuilder');

exports.Ranger               	= Ranger;
exports.ServiceDiscoveryBuilder = ServiceDiscoveryBuilder;
exports.ServiceInstanceBuilder  = ServiceInstanceBuilder;
exports.ServiceProvider         = ServiceProvider;
exports.ServiceProviderBuilder  = ServiceProviderBuilder;
exports.GetChildrenBuilder      = GetChildrenBuilder;
