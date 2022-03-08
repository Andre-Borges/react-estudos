const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

// index, show, store, update, destroy

module.exports = {
  async index(reques, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, longitude, latitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      // Se o name não existir pega o login
      const { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });

      // Filtrar as conexões que estão há no máximo 10km de distância
      // e que o novo dev tenha pelo menos uma das tecnologias filtradas

      const sendSocketMessageTo = findConnections({ latitude, longitude }, techsArray);

      sendMessage(sendSocketMessageTo, 'new-dev-', dev);
    }
    return response.json(dev);
  },

  async read(req, res) {
    const { github_username } = req.params;
    const dev = await Dev.findOne({ github_username });

    return res.json(dev === null ? {} : dev);
  },

  async update(req, res) {
    const { github_username } = req.params;
    const dev = await Dev.findOne({ github_username });
    const { latitude, longitude, techs, ...rest } = req.body;
    rest.github_username = github_username;
    if (latitude && longitude)
      var newLocation = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
    if (techs) var techsArray = parseStringAsArray(techs);
    const newDev = await Dev.updateOne(
      { github_username },
      {
        location: latitude && longitude ? newLocation : dev.location,
        techs: techs ? techsArray : dev.techs,
        ...rest,
      }
    );

    return res.json({
      modifiedCount: newDev.nModified,
      ok: newDev.ok,
    });
  },

  async delete(req, res) {
    const { github_username } = req.params;
    await Dev.deleteOne({ github_username });
    return res.json();
  },
};
