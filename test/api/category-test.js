const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

let token, categoryId;

chai.use(chaiHttp);

describe('/api/categories test', () => {

    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({username: 'mehmet.yilmaz', password: 'Sanane1234'})
            .end((err, res) => {
                token = res.body.token;
                console.log('token', token);
                done();
            });
    });

    describe('/GET categories', () => {
        it('(GET/CATEGORIES) Tüm Kategorileri Getirir', (done) => {
            chai.request(server)
                .get('/api/categories')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST categories', () => {
        it('(POST/CATEGORIES) Kategorileri Kaydeder', (done) => {
            const category = {
                title: 'Title_Mocha',
                content: 'Content_Mocha'
            };

            chai.request(server)
                .post('/api/categories')
                .send(category)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('content');

                    categoryId = res.body._id;
                    done();
                });
        });
    });

    describe('/GET/:categoryId category', () => {
        it('(GET/CATEGORIES/:categoryId) ID ye Sahip Kategorileri Getirir', (done) => {
            chai.request(server)
                .get('/api/categories/' + categoryId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.property('title');
                    res.body.should.have.property('content');
                    res.body.should.have.property('_id').eql(categoryId);
                    done();
                });
        });
    });

    describe('/PUT/:categoryId category', () => {
        it('(PUT/CATEGORIES/:categoryId) ID ye Sahip Kategorileri yi Update Eder', (done) => {
            const category = {
                title: 'Title_Mocha_Updated',
                content: 'Content_Mocha_Updated',
            };

            chai.request(server)
                .put('/api/categories/' + categoryId)
                .send(category)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(category.title);
                    res.body.should.have.property('content').eql(category.content);
                    done();
                });
        });
    });

    describe('/DELETE/:categoryId category', () => {
        it('(DELETE/CATEGORIES/:categoryId) ID ye Sahip Kategori yi Siler', (done) => {
            chai.request(server)
                .delete('/api/categories/' + categoryId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });
    });
});