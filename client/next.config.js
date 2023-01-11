/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['stateflix.s3.ap-south-1.amazonaws.com',"media.istockphoto.com",'image.pitchbook.com', 'tpc.googlesyndication.com', 'opoyi.com',"newscg11.com","static.inshorts.com","cdn2.storyasset.link","cdn.britannica.com"],
  },
  env:{
    STATEFLIX_API_KEY:process.env.STATEFLIX_API_KEY,
    STATEFLIX_API_URI:process.env.STATEFLIX_API_URI,
  }
}

module.exports = nextConfig
