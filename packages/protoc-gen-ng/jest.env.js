// credits to https://stackoverflow.com/a/57713960/1990451

const Environment = require('jest-environment-jsdom');

/**
 * A custom environment to set the TextEncoder that is required by TensorFlow.js.
 */
module.exports = class CustomTestEnvironment extends Environment {
    async setup() {
        await super.setup();

        if (typeof this.global.TextDecoder === 'undefined') {
            const { TextDecoder } = require('util');
            this.global.TextDecoder = TextDecoder;
        }
    }
}
