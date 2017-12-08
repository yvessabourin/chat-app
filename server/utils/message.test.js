var expect = require('expect');
const {app} = require('./../server');

var {generateMessage} = require('./message');

describe('generateMessage', (from, text) => {
    it('should generate the correct message object', () => {
        var from = 'Yveline';
        var text = 'Some message';
        var message = generateMessage(from, text);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});