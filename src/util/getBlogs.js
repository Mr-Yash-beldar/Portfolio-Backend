require("dotenv").config();
const axios = require("axios");
const {
  InternalServerException,
} = require("http-exception-transformer/exceptions");


const getBlogsUrl = process.env.GET_BLOGS;
console.log(getBlogsUrl);



const getBlogs = async (page) => {
  try {
    const response = await axios.get(
      `${getBlogsUrl}&page=${page}`
    );
    return response.data;
  } catch (err) {
    throw new InternalServerException();
  }
};

module.exports = { getBlogs };
