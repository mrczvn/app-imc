import User from '../models/user';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

class UserSession {
  async index(req, res) {
    try {
      const users = await User.findAll({});
      return res.status(200).json({ result: users });
    } catch (error) {
      return res.status(404).json({ result: 'Not found' });
    }
  }

  async signUp(req, res) {
    const { username, email, password } = req.body;
    try {
      const user = await User.create({
        username,
        email,
        password,
      });
      const payload = { user: user.id };
      user.password = undefined;
      return res.status(201).json({
        result: user,
        token: jwt.sign(payload, authConfig.secret, { expiresIn: '1h' }),
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async signIn(req, res) {
    const login = {
      id: null,
      isValid: false,
      message: 'Login inválido!',
    };

    const [, hash] = req.headers.authorization.split(' ');
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

    try {
      if (!email || !password) {
        return res.status(401).json(login);
      }

      let user = await User.findOne({ where: { email } });

      if (user && (await User.isPassword(user.password, password))) {
        const payload = { user: user.id };
        login.id = user.id;
        login.isVallid = true;
        login.message = 'Logado com sucesso!';

        console.log('Verificação de senha -> ' + login.isVallid);

        return res.status(200).json({
          token: jwt.sign(payload, authConfig.secret, { expiresIn: '1h' }),
          ...login,
        });
      }
      return res.status(401).json(login);
    } catch (error) {
      return res.status(401).json(login);
    }
  }
}

export default new UserSession();

//   const [, hash] = req.headers.authorization.split(' ');
//   const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

//   if (email && password) {
//     try {
//       const user = await User.findOne({ where: { email } });

//       if (await User.isPassword(user.password, password)) {
//         const payload = { user: user.id };

//         login.id = user.id;
//         login.isVallid = true;
//         login.message = 'Logado com sucesso!';

//         console.log('Verificação de senha -> ' + login.isVallid);

//         return res.status(200).json({
//           token: jwt.sign(payload, authConfig.secret, { expiresIn: '1h' }),
//           ...login,
//         });
//       }
//     } catch (error) {
//       return res.status(401).json(login);
//     }
//   }
//   return res.status(401).json(login);
// }
