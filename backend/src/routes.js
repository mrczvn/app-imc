import UserSession from './controllers/session-controller';

export default (app, auth) => {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' });
  });

  app.get('/users', auth.authenticate(), UserSession.index);

  app.post('/signup', UserSession.signUp);

  app.get('/signin', UserSession.signIn);
};
