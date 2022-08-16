module.exports = {
    stories: ['../lib/**/*.stories.js'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
    ],
    features: {
      previewCsfV3: true,
    }
};