import supertest from "supertest";
const request = supertest('http://localhost:3000/');

import { expect } from 'chai';

describe('Users', () => {

    it('POST /users/register', () =>{ //Register test User
        const data = {
            name: 'UserTest',
            email: 'test.test@gyant.com',
            password: 'SuperUser000!',
          };

          registerUser(data);
    });
    
    it('POST /users/login', async () =>{ //Try to login with random generated User
        
        var id = Math.floor(Math.random() * 9999);
        
        const data = {
            name: `User${id}`,
            email: `test.${id}@gyant.com`,
            password: 'SuperUser000!',
          };
          
          const userRes = await registerUser(data);
          
          return request
          .post('users/login')
          .send(data)
          .then((res) => {
            expect(res.body.email).to.eq(data.email);
          });
       
    });

    function registerUser(data){
        return request
          .post('users/register')
          .send(data)
          .then((res) => { //can't use expect(res.body).to.deep.include(data); because password is encripted
            expect(res.body.name).to.eq(data.name);
            expect(res.body.email).to.eq(data.email);
          });
    }
});