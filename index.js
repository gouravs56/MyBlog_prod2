const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors"); 
const dotenv = require("dotenv");
const path = require('path');

dotenv.config();
const apiKey = process.env.API_KEY;

 app.use(cors({
  origin: "https://my-news-blog.cyclic.app/", // Allow requests from this origin
  methods: "GET", // Allow only GET requests
}));

// static files
// app.use(express.static(path.join(__dirname,'./client/dist')))
// app.get('*', (req, res) => {
//   res.sendFile (path.join(__dirname,'./client/dist/index.html'))
// });


// API route to fetch news data
app.get("/v1", async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}); 

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
