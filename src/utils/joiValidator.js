import {createValidator} from 'express-joi-validation';
const validator = createValidator({
    // This options forces validation to pass any errors the express
    // error handler instead of generating a 400 error
    passError: true
});

export default {
    validator
}