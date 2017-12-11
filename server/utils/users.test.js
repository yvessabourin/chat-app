const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Yves',
            room: 'Levate'
        }, {
            id: '2',
            name: 'Stefan',
            room: 'Mericor'
        }, {
            id: '3',
            name: 'Björn',
            room: 'Levate'
        }]
    })


    it('should add a new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Yves',
            room: 'Calypso'
        }
        var resUser = users.addUser(user.id, user.name, user.room);
        
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId = '2';
        var removedUser = users.removeUser(userId);

        expect(removedUser.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId = '99';
        var removedUser = users.removeUser(userId);

        expect(removedUser).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '3';
        var foundUser = users.getUser(userId);
        
        expect(foundUser.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = '99';
        var foundUser = users.getUser(userId);
        
        expect(foundUser).toNotExist();
    });

    it('should return names for Levate', () => {
        var userList = users.getUserList('Levate');
        
        expect(userList).toEqual(['Yves', 'Björn']);
    });

    it('should return names for Mericor', () => {
        var userList = users.getUserList('Mericor');
        
        expect(userList).toEqual(['Stefan']);
    });
});

