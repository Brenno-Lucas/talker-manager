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

module.exports = { readTalker, user };