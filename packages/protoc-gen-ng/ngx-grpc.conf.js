module.exports = {
  debug: true,
  embedWellKnownTypes: true,
  stripEnumPrefixes: false,
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
