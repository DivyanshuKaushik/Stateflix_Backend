/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{domains:['stateflix.s3.ap-south-1.amazonaws.com']},
  reactStrictMode: true,
  env:{
    API_URL: "http://localhost:4000/api/v1"
  }
}

module.exports = nextConfig
