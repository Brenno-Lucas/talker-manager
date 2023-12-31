const fs = require('fs').promises;
const path = require('path');
const cripto = require('crypto');

const FILE_TALKER = path.resolve(__dirname, './talker.json');
const token = () => cripto.randomBytes(8).toString('hex');

const user = async (login) => {
  const LOGIN = {
    token: token(),
    ...login,
  };
  return LOGIN;
};

const readTalker = async () => {
  const data = await fs.readFile(FILE_TALKER, 'utf-8');
  return JSON.parse(data);
};

const writeTalker = async (talker) => {
  const data = await readTalker();
  const talk = {
    id: data.length + 1,
    ...talker,
  };
  const talkers = [...data, talk];
  await fs.writeFile(
    path.resolve(__dirname, FILE_TALKER),
    JSON.stringify(talkers),
  );
  return talk;
};

const attTalker = async (id, talker) => {
  const data = await readTalker();
  const att = { id, ...talker };
  const talkers = data.reduce((acc, param) => {
    if (param.id === id) return [...acc, att];
    return [...acc, param];
  }, []);
  await fs.writeFile(
    path.resolve(__dirname, FILE_TALKER),
    JSON.stringify(talkers),
  );
  return att;
};

const daleteTalker = async (id) => {
  const data = await readTalker();
  const talkers = data.reduce((acc, param) => {
    if (param.id === id) return [...acc];
    return [...acc, param];
  }, []);
  await fs.writeFile(
    path.resolve(__dirname, FILE_TALKER),
    JSON.stringify(talkers),
  );
};

module.exports = { readTalker, user, writeTalker, attTalker, daleteTalker };