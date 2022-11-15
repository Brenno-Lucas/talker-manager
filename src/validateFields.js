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

const checkAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const checkFields = async (req, res, next) => {
  const { body: { name, age, talk } } = req;
  if (!name) return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (!age) return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (!talk) return res.status(400).send({ message: 'O campo "talk" é obrigatório' });
  next();
};

const checkNameAndAge = async (req, res, next) => {
  const { body: { name, age } } = req;
  if (name.length <= 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } 
  if (age < 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const checkTalk = async (req, res, next) => {
  const { body } = req;
  const { talk } = body;
  const { rate, watchedAt } = talk;
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const values = [1, 2, 3, 4, 5];
  const valid = (param) => (!param && Number(param !== 0));
  if (!watchedAt) {
    return res.status(400).send({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (valid(rate)) return res.status(400).send({ message: 'O campo "rate" é obrigatório' });
  if (!regex.test(watchedAt)) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } 
  if (!values.includes(rate)) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } 
  next();
};

module.exports = { 
  checkEmail,
  checkPassword,
  checkAuthorization,
  checkFields,
  checkNameAndAge,
  checkTalk,
};