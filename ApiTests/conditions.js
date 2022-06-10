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
    
    it('GET /conditions', () =>{
        return request
        .get('conditions')
        .then((res) =>{
            expect(res.statusCode).to.eq(200);
            expect(res.body).to.not.be.empty;
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
});