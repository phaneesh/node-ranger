var mocha   = require('mocha');
var mockery = require('mockery');
var should  = require('chai').should();

var Ranger = require('..').Ranger;

describe('Ranger', function() {

  beforeEach(function(){
    ranger = Ranger.newClient('127.0.0.1:2181');
  });

  it('should create an instance of Ranger when calling newClient()', function() {
    ranger.should.be.a('object');
  });

  it('should start the framework when calling start()', function() {
    ranger.start();
  });

  it('should be classified as started once start() has been called', function() {
    ranger.start();
  });

  it('should be classified as not started if the start() function has not been called', function() {
    ranger.getStarted().should.equal(false);
  });

  it('should be classified as not started if the close() function has been called', function(done) {
    ranger.start();
    ranger.once('connected', function() {
      ranger.close();

      ranger.once('disconnected', function() {
        ranger.getStarted().should.equal(false);
        done();
      });
    });
  });

  it('should be classified as not started if the isConnected() function has been called', function(done) {
    ranger.start();

    ranger.once('connected', function() {
      ranger.isConnected().should.equal(true);
      done();
    });
  });

  it('should close the framework when calling close()', function(done) {

    ranger.start();

    ranger.once('connected', function() {

      ranger.close();
      ranger.once('disconnected', function() {

        ranger.isConnected().should.be.false();
        done();
      });
    });
  });
});
