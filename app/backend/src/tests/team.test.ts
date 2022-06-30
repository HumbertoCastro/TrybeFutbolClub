import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { teams } from './mock/mocks.mock';

import { Response } from 'superagent';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('login', () => {
  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(teams as Team[]);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('return all object on rout get', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body[0]).have.property('id');
    expect(chaiHttpResponse.body[0]).have.property('teamName');
  })

  it('return the specify team object', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body[0]).have.property('id');
    expect(chaiHttpResponse.body[0]).have.property('teamName');
  })
});

