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
            .send( {username: 'mehmet.yilmaz', password: 'Sanane1234'})
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
               .end((err, res) =>{
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
                   done();
               } );
       });
    });
});