const app = require('../../app');
const chaiHttp = require('chai-http');
const chai = require('chai');
const expect = chai.expect;
const User = require('../../models/model');

chai.use(chaiHttp);

describe('GET /', () => {
    const expectedResponse = {message: 'API Works'};
    it('Test index API payload', async () => {
      const result = await chai.request(app).get('/');
      expect(result.body).to.be.deep.equal(expectedResponse);
      expect(result.status).to.be.equal(200);
    });
  });
 

  
  describe('POST /', function () {
    it('Dovrebbe aggiungere un user', function (done) {
    
        let newUser = {
            name: 'Marco',
            surname: 'Rossi',
            email: 'MarcoR@hotmail.com',
            dateOfBirth: '23',
            gender: 'uomo',
            id:'1'
        };

        chai.request(app)
        .post('/users')
        .send(newUser)
        .end(function (err, res) {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.a.property('name');
            expect(res.body).to.have.a.property('surname');
            expect(res.body).to.have.a.property('email');
            expect(res.body).to.have.a.property('dateOfBirth');
            expect(res.body).to.have.a.property('gender');
            expect(res.body.id).to.have.a.property('1');
            done();
        });
  });
});

describe('PUT /', function () {
  it('put User cercato per id', function (done) {
        
    let user = new User ({
      name: 'Marco',
      surname: 'Rossi',
      email: 'MarcoR@hotmail.com',
      dateOfBirth: '24-08-1204',
      gender: 'M'
    });

    user.save(function (err, user) {
        chai.request(app)
        .put('/users/' + user.id)
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.id).to.equal(user.id);
            done();
        });
    });
  });
});
  
describe('DELETE /', function () {
  it("testiamo l'eliminazione di un utente ", function (done) {

  const response = { message: 'Utente eliminato correttamente' };

  let user = new User ({
      name: "Pippo",
      surname: "Pollo",
      email: "pip@gmail.com",
      dateOfBirth: "29",
      gender: "uomo"
  });
  user.save((err, user) => {
      chai.request(app)
      .del('/users/' + user.id)
      .end((err, res) => {
          expect(res.body).to.be.deep.equal(response);
          expect(res.status).to.equal(200);
          done();
      });
    });
  });
});
  
describe('SEARCH /', function () {
  it('cercare un utente tramite id: ', function (done) {
  let user = new User ({
      name: "gino",
      surname: "bello",
      email: "beautiful@yu.com",
      dateOfBirth: "54",
      gender: "uomo"
  });
  user.save(function (err, data) {
      chai.request(app)
      .get('/users/' + data.id)
      .end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.id).to.equal(data.id);
          done();
      });
  });
});
}) 
  
  
  describe('404 Route', () => {
    const expectedResponse = {message: 'Not Found', error: {status: 404}};
    it('Test 404 route payload', async () => {
      const result = await chai.request(app).get('/404api');
      expect(result.body).to.be.deep.equal(expectedResponse);
      expect(result.status).to.be.equal(404);
    });
  });