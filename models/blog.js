const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");
const { createTokenForUser } = require("../services/authentication");
const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        coverImageURL: {
            type: String,
            required: false,
        },
        createdBy:{
            type:Schema.Types.ObjectId,
            ref:"Bloguser"
        }
    },
    { timestamps: true }
);


const Blog = model("Blogtable", blogSchema);

module.exports = Blog;