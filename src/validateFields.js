const checkEmail = (req, res, next) => {
  const { body } = req;
  if (!body.email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(body.email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const checkPassword = (req, res, next) => {
  const { body } = req;
  if (!body.password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (body.password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = { checkEmail, checkPassword };