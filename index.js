
const generate = require('./generate');
const schema = require('./schema');

/** ---- RUN CODE --- */
generate.createSchema(schema.global, __dirname + '/');

console.log('React sources generated!');