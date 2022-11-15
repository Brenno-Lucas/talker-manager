const express = require('express');
const bodyParser = require('body-parser');
const { readTalker, user } = require('./utils');
const { checkEmail, checkPassword } = require('./validateFields');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const file = await readTalker();
  res.status(200).json(file);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const file = await readTalker();
  const findFile = file.find((e) => e.id === Number(id));
  if (!findFile) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(findFile);
});

app.post('/login', checkEmail, checkPassword, async (req, res) => {
  const login = req.body;
  const { token } = await user(login);
  return res.status(200).send({ token });
});