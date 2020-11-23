module.exports = {
  debug: true,
  embedWellKnownTypes: true,
  files: {
    pb: {
      generate: true,
    },
    pbconf: {
      generate: true,
    },
    pbsc: {
      generate: true,
      serviceClientProvidedIn: 'root',
    },
    pbwsc: {
      generate: true,
    },
  },
};
