module.exports = {
  stories: ["../stories/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-actions/register",
    "@storybook/addon-knobs/register",
  ],
  webpackFinal: async config => {
    // see: https://github.com/storybookjs/storybook/issues/6408#issuecomment-648197797
    config.optimization = {
      minimize: false,
      minimizer: [],
    };
    return config;
  }
};
