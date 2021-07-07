const config = {
    PORT: process.env.PORT || 8080,
    // API_BASE_URL: `http://localhost:8000`,
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || `https://desolate-meadow-47002.herokuapp.com/`,
    CLOUDINARY_URL: `cloudinary://399288438763212:b0Sr88vtQ2qYJwJ--flBpvwVONw@thornberry`
}

export default config;