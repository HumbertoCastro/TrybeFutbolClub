import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { matches } from './mock/mocks.mock';

import { Response } from 'superagent';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('match', () => {
  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matches as any);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('return all object on rout get', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body[0]).have.property('id');
    expect(chaiHttpResponse.body[0]).have.property('home_team');
  })
  it('return all matches in progress', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .set('query', 'true')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body[0]).have.property('id')
    expect(chaiHttpResponse.body[0]).have.property('homeTeam')
    expect(chaiHttpResponse.body[0]).have.property('awayTeam')
    expect(chaiHttpResponse.body[0]).have.property('homeTeamGoals')
    expect(chaiHttpResponse.body[0]).have.property('awayTeamGoals')
    expect(chaiHttpResponse.body[0]).have.property('inProgress')
    expect(chaiHttpResponse.body[0].inProgress).to.be('true')    
  })
});

describe('match create', () => {
  before(async () => {
    sinon
      .stub(Match, "create")
      .resolves({
        "homeTeam": "16",
        "awayTeam": "8",
        "homeTeamGoals": "2",
        "awayTeamGoals": "2",
        "inProgress": true,
      } as any);
  });

  after(()=>{
    (Match.create as sinon.SinonStub).restore();
  })
  it('create match return is OK', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        "homeTeam": "16",
        "awayTeam": "8",
        "homeTeamGoals": "2",
        "awayTeamGoals": "2"
      });
      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).have.property('id');
      expect(chaiHttpResponse.body).have.property('homeTeam');
      expect(chaiHttpResponse.body).have.property('awayTeam');
      expect(chaiHttpResponse.body).have.property('homeTeamGoals');
      expect(chaiHttpResponse.body).have.property('awayTeamGoals');
      expect(chaiHttpResponse.body).have.property('inProgress');
      expect(chaiHttpResponse.body.inProgress).to.be.equal(true);    
  });
  it('create with a unreal team', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        "homeTeam": 20,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "inProgress": true
      })
    expect(chaiHttpResponse.status).to.be.equal(404)
    expect(chaiHttpResponse.body).have.property('message')
    expect(chaiHttpResponse.body.message).to.be.equal("There is no team with such id!");
  });
  it ('create with equal teans', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        "homeTeam": 8,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "inProgress": true
      })
    expect(chaiHttpResponse.status).to.be.equal(404)
    expect(chaiHttpResponse.body).have.property('message')
    expect(chaiHttpResponse.body.message).to.be.equal("It is not possible to create a match with two equal teams")
  })
});

describe('match', () => {
  before(async () => {
    sinon
      .stub(Match, "update")
      .resolves({
        "homeTeam": "16",
        "awayTeam": "8",
        "homeTeamGoals": "2",
        "awayTeamGoals": "2",
        "inProgress": true,
      } as any);
  });
  after(()=>{
    (Match.update as sinon.SinonStub).restore();
  });
  it('update match', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1')
      .send({
        "homeTeamGoals": "7",
        "awayTeamGoals": "1"
      });
      expect(chaiHttpResponse.status).to.be.equal(200)
      expect(chaiHttpResponse.body).have.property('message')
      expect(chaiHttpResponse.body.message).to.be.equal("Updated goals!");
  });
});
