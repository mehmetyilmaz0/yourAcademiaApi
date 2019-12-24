const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

let token;

chai.use(chaiHttp);

describe('/api/articles test', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send( {username: 'mehmet.yilmaz2', password: 'Sanane1234'})
            .end((err, res) => {
                token = res.body.token;
                console.log('token', token);
                done();
            });
    });

    describe('/GET articles', () => {
        it('(GET/ARTICLES) Tüm Articlelari Getirir', (done) => {
            chai.request(server)
                .get('/api/articles')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
});