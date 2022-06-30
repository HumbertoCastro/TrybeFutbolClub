import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { user, userTipos } from './mock/mocks.mock';

import { Response } from 'superagent';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('login', () => {
  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(user as unknown as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('when provide right data, return right object', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userTipos.rightUser);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body.user).to.have.property('id');
    expect(chaiHttpResponse.body.user).to.have.property('username');
    expect(chaiHttpResponse.body.user).to.have.property('role');
    expect(chaiHttpResponse.body.user).to.have.property('email');
    expect(chaiHttpResponse.body).to.have.property('token');
  })
  it ('when provide wrong data, return a warning', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userTipos.wrongEmail);
    expect(chaiHttpResponse.status).to.be.deep.equal(401);
    expect(chaiHttpResponse.body).to.haveOwnProperty('message');
    expect(chaiHttpResponse.body).to.be.deep.equal({ message:'Incorrect email or password'});    
  })
  it ('when provide no data, return invalid message', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userTipos.without);
    expect(chaiHttpResponse.status).to.be.deep.equal(400);
    expect(chaiHttpResponse.body).to.haveOwnProperty('message');
    expect(chaiHttpResponse.body).to.be.deep.equal({ message:'All fields must be filled'});
  })
});
