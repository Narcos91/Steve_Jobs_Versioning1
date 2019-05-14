const chai = require('chai');
const expect = chai.expect;
const User = require('../../models/model');

describe('User.create()', () => {
  /* before('Delete all users from DB test', async () => {
    await User.remove({});
  }); */

  after('Delete all users from DB test', async () => {
    await User.deleteMany({});
  });

  it('Create new User Document', async () => {
    const newUser = {
      name: 'Mario',
      surname: 'Rossi',
      dateOfBirth: '25',
      email: 'Mario@gmail.com',
      gender:'uomo',
      id:'1'
    };
    const user = await User.create(newUser);
    expect(user).has.property('name', newUser.name);
    expect(user).has.property('surname', newUser.surname);
    expect(user).has.property('dateOfBirth', newUser.dateOfBirth);
    expect(user).has.property('email', newUser.email);
    expect(user).has.property('id',newUser.id);
  });
});