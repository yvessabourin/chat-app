const expect = require('expect');
const {app} = require('./../server');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', (from, text) => {
    it('should generate the correct message object', () => {
        var from = 'Yveline';
        var text = 'Some message';
        var message = generateMessage(from, text);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', (from, latitude, longitude) => {
    it('should generate the correct location object', () => {
        var from = 'Yveline';
        var latitude = 20;
        var longitude = 20;
        var url = `https://www.google.com/maps?q=20,20`;
        var message = generateLocationMessage(from, latitude, longitude);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});

