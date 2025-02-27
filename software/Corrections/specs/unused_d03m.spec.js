const fs = require('fs');
const { join } = require('path');
const { copyStudentProject, resetTemporaryDirectory } = require('./utils');

copyStudentProject();

beforeEach(async () => {
  resetTemporaryDirectory();
});

describe('ex01 - my_lite_db', () => {
  const MyLiteDB = require('@student/src/my_lite_db');

  describe('01 - Database creation', () => {
    it('should create an empty database', async () => {
      const db = await MyLiteDB.load(':memory:');
      expect(db).toBeDefined();
    });

    it('should load an existing database', async () => {
      const path = join(__dirname, 'files/d03m_db.sqlite');
      let db = await MyLiteDB.load(path);
      await db.createUser('Meow', 'Graou');
      db.close();

      db = await MyLiteDB.load(path);
      expect(db).toBeDefined();
    });

    it('should save a database', async () => {
      const path = join(__dirname, 'files/d03m_db.sqlite');
      let db = await MyLiteDB.load(path);
      await db.createUser('Meow', 'Graou');
      db.close();

      await expect(fs.promises.access(path)).resolves.not.toThrow();
    });
  });

  describe('02 - User', () => {
    it('should create an user', async () => {
      const db = await MyLiteDB.load(':memory:');
      expect(db).toBeDefined();

      const user = await db.createUser('Meow', 'Graou');
      expect(user).toBeDefined();
      expect(user).toMatchObject({
        firstname: 'Meow',
        lastname: 'Graou',
      });
    });

    // it('should create multiple users', () => {
    //   const db = new MyDB({});
    //   expect(db).toBeDefined();

    //   let user = db.createUser('Meow', 'Graou');
    //   expect(user).toBeDefined();
    //   expect(user).toMatchObject({
    //     firstname: 'Meow',
    //     lastname: 'Graou',
    //   });

    //   user = db.createUser('Space', 'Mountain');
    //   expect(user).toBeDefined();
    //   expect(user).toMatchObject({
    //     firstname: 'Space',
    //     lastname: 'Mountain',
    //   });
    // });

    // it('should not create an user with the same name', () => {
    //   const db = new MyDB({});
    //   expect(db).toBeDefined();

    //   db.createUser('Meow', 'Graou');
      
    //   try {
    //     db.createUser('Meow', 'Graou');
    //     fail('should not succeed');
    //   } catch (e) {
    //     expect(e.message).toBe('A user with the same name already exists');
    //   }
    // });

    // it('should find an existing user', () => {
    //   const db = new MyDB({});
    //   expect(db).toBeDefined();

    //   const user = db.createUser('Meow', 'Graou');
    //   expect(user).toBeDefined();

    //   const found = db.getUser(user.id);
    //   expect(found).toBeDefined();

    //   expect(user).toMatchObject(found);
    // });

    // it('should not find an unknown user', () => {
    //   const db = new MyDB({});
    //   expect(db).toBeDefined();

    //   try {
    //     db.getUser('lol');
    //     fail('should not succeed');
    //   } catch (e) {
    //     expect(e.message).toBe('User with id lol not found');
    //   }

    //   db.createUser('Meow', 'Graou');

    //   try {
    //     db.getUser('lol');
    //     fail('should not succeed');
    //   } catch (e) {
    //     expect(e.message).toBe('User with id lol not found');
    //   }
    // });

    // it('should update a user', () => {
    //   const db = new MyDB({});
    //   expect(db).toBeDefined();

    //   const user = db.createUser('Meow', 'Graou');
    //   expect(user).toBeDefined();

    //   const modified = db.updateUser(user.id, 'Space', 'Mountain');
    //   expect(modified).toBeDefined();
    //   expect(modified).toMatchObject({
    //     firstname: 'Space',
    //     lastname: 'Mountain',
    //   });
    // });

    // it('should not update an unknown user', () => {
    //   const db = new MyDB({});
    //   expect(db).toBeDefined();

    //   try {
    //     db.updateUser('lol', 'Meow', 'Graou');
    //     fail('should not succeed');
    //   } catch (e) {
    //     expect(e.message).toBe('User with id lol not found');
    //   }
    // });

    // it('should delete a user', () => {
    //   const db = new MyDB({});
    //   expect(db).toBeDefined();

    //   const user = db.createUser('Meow', 'Graou');
    //   expect(user).toBeDefined();

    //   db.deleteUser(user.id);

    //   try {
    //     db.getUser(user.id);
    //     fail('should not succeed');
    //   } catch (e) {
    //     expect(e.message).toBe(`User with id ${user.id} not found`);
    //   }
    // });

    // it('should not delete an unknown user', () => {
    //   const db = new MyDB({});
    //   expect(db).toBeDefined();

    //   try {
    //     db.deleteUser('lol');
    //     fail('should not succeed');
    //   } catch (e) {
    //     expect(e.message).toBe('User with id lol not found');
    //   }
    // });
  });

  // describe('03 - Account', () => {
  //   it('should create an account', () => {
  //     const db = new MyDB({});
  //     expect(db).toBeDefined();

  //     const user = db.createUser('Meow', 'Graou');
  //     expect(user).toBeDefined();

  //     const account = db.createAccount(user, 0);
  //     expect(account).toBeDefined();
  //     expect(account).toMatchObject({
  //       ownerId: user.id,
  //       balance: 0,
  //     });
  //   });

  //   it('should not create an account with an unknown owner', () => {
  //     const db = new MyDB({});
  //     expect(db).toBeDefined();

  //     try {
  //       db.createAccount({
  //         id: 'lol',
  //       }, 0);
  //       fail('should not succeed');
  //     } catch (e) {
  //       expect(e.message).toBe('User with id lol not found');
  //     }
  //   });

  //   it('should create multiple accounts for different owners', () => {
  //     const db = new MyDB({});
  //     expect(db).toBeDefined();

  //     let user = db.createUser('Meow', 'Graou');
  //     expect(user).toBeDefined();

  //     let account = db.createAccount(user, 0);
  //     expect(account).toBeDefined();
  //     expect(account).toMatchObject({
  //       ownerId: user.id,
  //       balance: 0,
  //     });

  //     user = db.createUser('Space', 'Mountain');
  //     expect(user).toBeDefined();

  //     account = db.createAccount(user, 100);
  //     expect(account).toBeDefined();
  //     expect(account).toMatchObject({
  //       ownerId: user.id,
  //       balance: 100,
  //     });
  //   });

  //   it('should create multiple accounts for the same owner', () => {
  //     const db = new MyDB({});
  //     expect(db).toBeDefined();

  //     const user = db.createUser('Meow', 'Graou');
  //     expect(user).toBeDefined();

  //     let account = db.createAccount(user, 0);
  //     expect(account).toBeDefined();
  //     expect(account).toMatchObject({
  //       ownerId: user.id,
  //       balance: 0,
  //     });

  //     account = db.createAccount(user, 100);
  //     expect(account).toBeDefined();
  //     expect(account).toMatchObject({
  //       ownerId: user.id,
  //       balance: 100,
  //     });
  //   });

  //   it('should find an existing account', () => {
  //     const db = new MyDB({});
  //     expect(db).toBeDefined();

  //     const user = db.createUser('Meow', 'Graou');
  //     const account = db.createAccount(user, 42);

  //     const found = db.getAccount(account.id);
  //     expect(found).toBeDefined();
  //     expect(found).toMatchObject(account);
  //   });

  //   it('should not find an unknown account', () => {
  //     const db = new MyDB({});
  //     expect(db).toBeDefined();

  //     try {
  //       db.getAccount('lol');
  //       fail('should not succeed');
  //     } catch (e) {
  //       expect(e.message).toBe('Account with id lol not found');
  //     }
  //   });

  //   it('should credit an account', () => {
  //     const db = new MyDB({});
  //     expect(db).toBeDefined();

  //     const user = db.createUser('Meow', 'Graou');

  //     const account = db.createAccount(user, 42);
  //     expect(account.balance).toBe(42);

  //     const modified = db.creditAccount(account.id, 42);
  //     expect(modified.balance).toBe(84);
  //   });

  //   it('should not credit an unknown account', () => {
  //     const db = new MyDB({});
  //     expect(db).toBeDefined();

  //     try {
  //       db.creditAccount('lol', 10);
  //       fail('should not succeed');
  //     } catch (e) {
  //       expect(e.message).toBe('Account with id lol not found');
  //     }
  //   });

  //   it('should withdraw an account', () => {
  //     const db = new MyDB({});
  //     expect(db).toBeDefined();

  //     const user = db.createUser('Meow', 'Graou');

  //     const account = db.createAccount(user, 42);
  //     expect(account.balance).toBe(42);

  //     const modified = db.withdrawAccount(account.id, 42);
  //     expect(modified.balance).toBe(0);
  //   });

  //   it('should not withdraw an unknown account', () => {
  //     const db = new MyDB({});
  //     expect(db).toBeDefined();

  //     try {
  //       db.withdrawAccount('lol', 10);
  //       fail('should not succeed');
  //     } catch (e) {
  //       expect(e.message).toBe('Account with id lol not found');
  //     }
  //   });

  //   it('should delete an account', () => {
  //     const db = new MyDB({});
  //     expect(db).toBeDefined();

  //     const user = db.createUser('Meow', 'Graou');
  //     const account = db.createAccount(user, 42);

  //     db.deleteAccount(account.id);
  //   });

  //   it('should not delete an unknown account', () => {
  //     const db = new MyDB({});
  //     expect(db).toBeDefined();

  //     try {
  //       db.deleteAccount('lol');
  //       fail('should not succeed');
  //     } catch (e) {
  //       expect(e.message).toBe('Account with id lol not found');
  //     }
  //   });
  // });

  // describe('04 - Relational based database', () => {
  //   it('should delete the accounts when deleting a user', () => {
  //     const db = new MyDB({});
  //     expect(db).toBeDefined();

  //     const user = db.createUser('Meow', 'Graou');
  //     const account = db.createAccount(user, 42);
  //     expect(account).toBeDefined();

  //     db.deleteUser(user.id);

  //     try {
  //       db.getAccount(account.id);
  //       fail('should not succeed');
  //     } catch (e) {
  //       expect(e.message).toBe(`Account with id ${account.id} not found`);
  //     }
  //   });
  // });
});
