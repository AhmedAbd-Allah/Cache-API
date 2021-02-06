const chai = require('chai');
const expect = require('chai').expect
const should = chai.should();
const app = require('../../index');
const chaiHttp = require('chai-http');



let contactId;
describe("Test caching layer", function () {

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
                    done();
                }
            });

    })

})
