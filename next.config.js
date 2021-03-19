const withImages = require('next-images')

module.exports = withImages({
  target: "serverless",
  async rewrites() {
    return [
      // Rewrite everything to `pages/app`
      {
        source: "/app/:any*",
        destination: "/app"
      }
    ];
  }
});
