const express = require('express');
const bodyParser = require('body-parser');
const { readTalker, user, writeTalker, attTalker, daleteTalker } = require('./utils');
const {
  checkID,
  checkEmail,
  checkPassword,
  checkAuthorization,
  checkFields,
  checkNameAndAge,
  checkTalk,
} = require('./validateFields');

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

app.delete('/talker/:id', checkID, checkAuthorization, async (req, res) => {
  const { id } = req.params;
  await daleteTalker(Number(id));
  return res.status(204).end();
});

app.post('/login', checkEmail, checkPassword, async (req, res) => {
  const login = req.body;
  const { token } = await user(login);
  return res.status(200).send({ token });
});

app.post('/talker',
  checkAuthorization,
  checkFields,
  checkNameAndAge,
  checkTalk,
  async (req, res) => {
  const talker = req.body;
  const data = await writeTalker(talker);
  return res.status(201).send(data);
});

app.put('/talker/:id',
  checkAuthorization,
  checkFields,
  checkNameAndAge,
  checkTalk,
  async (req, res) => {
  const { id } = req.params;
  const talker = req.body;
  const data = await attTalker(Number(id), talker);
  return res.status(200).send(data);
});
