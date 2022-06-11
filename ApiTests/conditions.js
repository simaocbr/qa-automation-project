import supertest from "supertest";
const request = supertest('http://localhost:3000/');

import { expect } from 'chai';

describe('Conditions', () => {
    
    it('POST /conditions/import', () =>{ //Import inicial conditions
        
          return request
          .post('conditions/import')
          .then((res) => {
            expect(res.statusCode).to.eql(200);
          });
       
    });
    
    it('GET /conditions', () =>{ //Get All Conditions
        return request
        .get('conditions')
        .then((res) =>{
            expect(res.body).to.not.be.empty;
            expect(res.statusCode).to.eql(200);
        });
    });

    it('POST /conditions', () =>{ //Creating new Condition and checking it presence
        const data = {
            code: 'TEST00',
            description: 'Test Condition',
          };

          return request
          .post('conditions')
          .send(data)
          .then((res) => {
            expect(res.body).to.deep.include(data);
          });
    });

    it('POST /conditions Duplication', async () =>{ //Creating new Condition and checking it presence
      var id = Math.floor(Math.random() * 99);

      const data = {
          code: `TEST${id}`,
          description: `Test Condition${id}`,
        };

        const firstCondition = await newCondition(data);

        return request
          .post('conditions')
          .send(data)
          .then((res) => {
            expect(res.statusCode).to.eql(400);
          });
    });

    function newCondition(data){
      return request
      .post('conditions')
      .send(data)
      .then((res) => {
        expect(res.body).to.deep.include(data);
        expect(res.statusCode).to.eql(200);
      });
    }
});