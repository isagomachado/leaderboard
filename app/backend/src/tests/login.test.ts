import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

// import IUser from '../interfaces/IUser';
import User from '../database/models/User';
import { ILogin } from '../interfaces/ILogin';
import { Model } from 'sequelize/types';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('Test /login', () => {
  describe('.POST', () => {
    const userMock: ILogin = {
      email: 'user@user.com',
      password: 'secret_user',
    }

    beforeEach(() => {
      sinon.stub(User, "findOne").resolves(userMock as unknown as Model)
    })
  
    afterEach(() => {
      sinon.restore();
    })
  
    it('Caso sucesso, retorna token com status 200', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(userMock);
  
      expect(chaiHttpResponse.status.valueOf()).to.be.equal(200);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.have.property('token');
    });

    it('Se não for passado "email", retornar mensagem de erro com status 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: '',
        password: 'secret_user',
      });
  
      expect(chaiHttpResponse.status.valueOf()).to.be.equal(400);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });

    it('Se não for passado "password", retornar mensagem de erro com status 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'user@user.com',
        password: '',
      });
  
      expect(chaiHttpResponse.status.valueOf()).to.be.equal(400);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });

    it('Se for passado um "email" inexistente, retornar mensagem de erro com status 401', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'use@user.com',
        password: 'secret_user',
      });
  
      expect(chaiHttpResponse.status.valueOf()).to.be.equal(401);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });

    it('Se for passado um "password" incorreto, retornar mensagem de erro com status 401', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'user@user.com',
        password: 'secret_use',
      });
  
      expect(chaiHttpResponse.status.valueOf()).to.be.equal(401);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
  })

  describe('.GET /login/validate', () => {
    const userToken = {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJwYXNzd29yZEhhc2giOiIkMmEkMDUkRS8zV005UVdBQllqaGRLR1pwTTVFZWM2dE1BL0drcnY5QkNxOWdnL0x5czFjYzdoajBQS2UiLCJpYXQiOjE2NjE5Nzk3MTQsImV4cCI6MTY2NDU3MTcxNH0.Gllsa7G7hshCz8Zr4LzgwyragWdEGC1azSv7ze5HDCI",
    }

    beforeEach(() => {
      sinon.stub(User, "findOne").resolves(userToken as unknown as Model)
    })
  
    afterEach(() => {
      sinon.restore();
    })
  
    it('Se não passar o token, retorna status 400 com mensagem de erro ', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate').send({
        token: ""
      });
  
      expect(chaiHttpResponse.status.valueOf()).to.be.equal(400);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body.message).to.be.equal('Token is required');
    });
  })  
});
