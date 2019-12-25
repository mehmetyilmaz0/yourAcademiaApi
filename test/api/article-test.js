const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

let token, articleId;

chai.use(chaiHttp);

describe('/api/articles test', () => {

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

    describe('/POST articles', () => {
        it('(POST/ARTICLE) Article Kaydeder', (done) => {
            const article = {
                title: 'Title_Mocha',
                content: 'Content_Mocha',
                categoryId: '5e020dcb796c631ca0bae02d',
                keywords: 'Keywords_Mocha1,Keywords_Mocha2',
                favCount: 0,
                displayCount: 0,
                source: 'www.sourceMocha.com',
                user: 'admin_mocha'
            };

            chai.request(server)
                .post('/api/articles')
                .send(article)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('content');
                    res.body.should.have.property('categoryId');
                    res.body.should.have.property('keywords');
                    res.body.should.have.property('favCount');
                    res.body.should.have.property('displayCount');
                    res.body.should.have.property('source');
                    res.body.should.have.property('user');

                    articleId = res.body._id;
                    done();
                });
        });
    });

    describe('/GET/:articleId article', () => {
        it('(GET/ARTICLES/:articleId) ID ye Sahip Articleları Getirir', (done) => {
            chai.request(server)
                .get('/api/articles/' + articleId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('content');
                    res.body.should.have.property('categoryId');
                    res.body.should.have.property('keywords');
                    res.body.should.have.property('favCount');
                    res.body.should.have.property('displayCount');
                    res.body.should.have.property('source');
                    res.body.should.have.property('user');
                    res.body.should.have.property('_id').eql(articleId);
                    done();
                });
        });
    });

    describe('/PUT/:articleId article', () => {
        it('(PUT/ARTICLES/:articleId) ID ye Sahip Article yi Update Eder', (done) => {
            const article = {
                title: 'Title_Mocha_Updated',
                content: 'Content_Mocha_Updated',
                categoryId: '5e020dcb796c631ca0bae02d',
                keywords: 'Keywords_Mocha1_Updated,Keywords_Mocha2_Updated',
                favCount: 0,
                displayCount: 0,
                source: 'www.sourceMocha_Updated.com',
                user: 'admin_mocha_Updated'
            };

            chai.request(server)
                .put('/api/articles/' + articleId)
                .send(article)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(article.title);
                    res.body.should.have.property('content').eql(article.content);
                    res.body.should.have.property('categoryId').eql(article.categoryId);
                    res.body.should.have.property('keywords').eql(article.keywords);
                    res.body.should.have.property('favCount').eql(article.favCount);
                    res.body.should.have.property('displayCount').eql(article.displayCount);
                    res.body.should.have.property('source').eql(article.source);
                    res.body.should.have.property('user').eql(article.user);
                    done();
                });
        });
    });

    describe('/DELETE/:articleId article', () => {
        it('(DELETE/ARTICLES/:articleId) ID ye Sahip Article yi Siler', (done) => {
            chai.request(server)
                .delete('/api/articles/' + articleId)
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