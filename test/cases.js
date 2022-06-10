import supertest from "supertest";
const request = supertest('http://localhost:3000/');

import { expect } from 'chai';

describe('Cases', () => {
    
    it('POST /cases/import', () =>{ //Import inicial cases
        
          return request
          .post('cases/import')
          .then((res) => {
            expect(res.statusCode).to.eql(200);
          });
        
    });
    
    it('GET /cases/unreviewed/{userId}', () =>{
        return request.get('cases/unreviewed/62a28d0d2604b945903a1cd1').then((res) =>{
            expect(res.body).to.not.be.empty;
            expect(res.statusCode).to.eql(200);
        });
    });

    it('PUT /cases/review', () => {
      
      const data = {
        id: '00688F1A12C5787124CE2F75FD58F66F',
        review: { 
            userId: '62a27ba23aa36900131b8887',
            conditionId: '62a27bb70824fe1431e05ea5'
          }
      };
  
      return request
        .put('cases/review')
        .send(data)
        .then((res) => {
          expect(res.body.reviews[0].userId).to.eq(data.review.userId);
          expect(res.statusCode).to.eq(200);
        });
    });

    it('DELETE /cases', () => {
      return request
        .delete('cases')
        .then((res) => {
          expect(res.statusCode).to.eq(200);
        });
    });
});