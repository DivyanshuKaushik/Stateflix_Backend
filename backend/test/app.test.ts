import chai,{expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app'

chai.use(chaiHttp)

describe("GET /", () => {
    it('welcome message',async function () {
        const res = await chai.request(app).get('/')
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("Welcome to StateFlix");
    });
});
