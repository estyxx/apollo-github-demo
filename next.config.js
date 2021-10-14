/** @type {import('next').NextConfig} */


const {
  GRAPHQL_API,
  REACT_APP_CLIENT_TOKEN,
} = process.env;

module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side: good for secrets
    REACT_APP_CLIENT_TOKEN
  },

    publicRuntimeConfig: {GRAPHQL_API,REACT_APP_CLIENT_TOKEN },

}
