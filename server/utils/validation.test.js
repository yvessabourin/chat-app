const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non string values', () => {
        var res = isRealString(99);
        
        expect(res).toBe(false);

    });

    it('should reject empty strings', () => {
        var res = isRealString(' ');
        
        expect(res).toBe(false);

    });

    it('should allow strings with non space characters', () => {
        var res = isRealString(' bo zo ');
        
        expect(res).toBe(true);

    });


});