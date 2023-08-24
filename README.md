<h1 align='center'>✍️📰🖥️ Bloggy 🖥️📰✍️ </h1>

This project is a responsive full stack blog application built using the MERN stack and Bootstrap. In this app, users will be able to view blog posts created by other users. After registering for an account, users will be able to write, edit and delete their own posts as well. The website is fully responsive across a wide variety of screens, ranging from mobile screens to xl desktop monitors.

<div align='center'>
    <img 
        src='https://media2.giphy.com/media/rKX8282zMX1wQzZytj/giphy.gif?cid=ecf05e476dxsxq2son4bw1u4vo11m2qy7ylho2f43ayrltml&ep=v1_gifs_search&rid=giphy.gif&ct=g'
        height='180'
    >
</div>

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Planned Enhancements](#future-features-to-be-added)
- [License](#license)

## Demo

Check out the live demo of the project [here](https://bloggy-production.up.railway.app/).

## Features

- User authentication and authorization
- Stylish and modern homepage design with a section for new posts
- Customized bootstrap elements for custom and eye catching website design
- Read posts created by other users and create your own
- Ability to add images to posts and edit or delete them after creation
- Search for posts by category
- User profiles with profile pictures and user posts
- Responsive design for various screen sizes

## Technologies

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express.js, MongoDB, Passport
- **Deployment**: Railway

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/DustyDogCodex/bloggy.git
   cd bloggy
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the `server` directory and add the following:

   ```env
   MONGO_URL=your-mongodb-uri
   SESSION_SECRET=your-secret
   ```

4. Run the development servers:

   ```bash
   npm run devstart
   ```

5. Access the app in your browser at `http://localhost:5000`.

## Future features to be added

- Add comments and like posts
- Ability to follow users and see their posts on your home feed
- Markdown support to customise user's blog posts


## License

This project is licensed under the ISC License.