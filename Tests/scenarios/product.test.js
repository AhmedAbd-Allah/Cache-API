const chai = require('chai');
const expect = require('chai').expect
const should = chai.should();
const app = require('../../index');
const chaiHttp = require('chai-http');
const { v4: uuidv4 } = require('uuid');



let contactId;
describe("Test caching layer", function () {

    let cachingKeys;
    chai.use(chaiHttp);
    it('should Get All caching Keys', function (done) {
        let url = '/products'
        chai.request(app)
            .get(url)
            .end(function (error, response, body) {
                if (error) {
                    done(error);
                } else {
                    expect(response.body).to.be.an('array')
                    expect(response.body).to.have.lengthOf.below(Number(process.env.MAX_ENTRIES));
                    cachingKeys = response.body
                    done();
                }
            });

    })

    it('should returns the cached data for a given key', function (done) {
        let url = `/products/${cachingKeys[0]}`
        chai.request(app)
            .get(url)
            .end(function (error, response, body) {
                if (error) {
                    done(error);
                } else {
                    expect(response.text).to.be.a('string')
                    done();
                }
            });

    })

    it('should create/update the cached data for a given key', function (done) {
        let url = `/product/${uuidv4()}`
        chai.request(app)
            .post(url)
            .set('content-type', 'application/json')
            .send({
                data: 'test_data'
            })
            .end(function (error, response, body) {
                if (error) {
                    done(error);
                } else {
                    expect(response.text).to.be.a('string')
                    expect(response.text).to.equal('test_data')
                    done();
                }
            });

    })

    it('should Get All caching Keys', function (done) {
        let url = '/products'
        chai.request(app)
            .get(url)
            .end(function (error, response, body) {
                if (error) {
                    done(error);
                } else {
                    expect(response.body).to.be.an('array')
                    expect(response.body).to.have.lengthOf(cachingKeys.length + 1);
                    done();
                }
            });

    })

    it('should removes a given key from the cache', function (done) {
        let url = `/product/cache/${cachingKeys[0]}`
        chai.request(app)
            .delete(url)
            .set('content-type', 'application/json')
            .send()
            .end(function (error, response, body) {
                if (error) {
                    done(error);
                } else {
                    expect(response.text).to.be.a('string')
                    expect(response.text).to.equal('record cleaned in cache')
                    done();
                }
            });

    })

    it('should Get All caching Keys', function (done) {
        let url = '/products'
        chai.request(app)
            .get(url)
            .end(function (error, response, body) {
                if (error) {
                    done(error);
                } else {
                    expect(response.body).to.be.an('array')
                    expect(response.body).to.have.lengthOf.below(Number(process.env.MAX_ENTRIES));
                    expect(response.body).to.have.lengthOf(cachingKeys.length);
                    done();
                }
            });

    })

    it('should removes all keys from the cache', function (done) {
        let url = '/products/cache/clear'
        chai.request(app)
            .delete(url)
            .set('content-type', 'application/json')
            .send()
            .end(function (error, response, body) {
                if (error) {
                    done(error);
                } else {
                    expect(response.body).to.be.empty;
                    done();
                }
            });

    })

    it('should Get All caching Keys', function (done) {
        let url = '/products'
        chai.request(app)
            .get(url)
            .end(function (error, response, body) {
                if (error) {
                    done(error);
                } else {
                    expect(response.body).to.be.an('array')
                    expect(response.body).to.have.lengthOf(0);
                    done();
                }
            });

    })
})
