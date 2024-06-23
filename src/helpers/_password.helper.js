import 'regenerator-runtime';
import bcrypt from 'bcrypt';

export const generatePassword = ( pass ) => {
   return bcrypt.hashSync(pass, 10);
  };
  