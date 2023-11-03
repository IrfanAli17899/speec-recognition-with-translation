/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        OPEN_AI_KEY: process.env.OPEN_AI_KEY
    }
}

module.exports = nextConfig
