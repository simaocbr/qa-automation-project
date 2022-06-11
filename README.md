# QA-AUTOMATION-PROJECT

## Dependencies:

### For API Tests:
* [Node JS and NPM](https://nodejs.org/en/) (to install the packages below)
* [Mocha JS](https://mochajs.org/) (for test framework)
* [Chai JS](https://www.chaijs.com/) (for assertions)
* [SuperTest](https://www.npmjs.com/package/supertest) (for making API calls)

### For UI Tests
* RobotFrameWork
* SeleniumLibrary


## To run tests

Clone project & run

* For API tests just run Docker iamge without loading anything.
* For UI tests clean image load /cases and /conditions and create user
```
{
    "name": "Doctor Simao",
    "email": "simao@doctor.com",
    "password": "qwerty"
}
```

### API run command
```bash
npm test ApiTests
```

### UI Run Command
```
cd UiTests
robot main.robot
```

Any question just shout.