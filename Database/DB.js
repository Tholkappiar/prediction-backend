import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(() => console.log("Connected to DB"));

const AdminSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    age: Number,
    nationality: String,
});

const UserSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    age: Number,
    nationality: String,
});

const AdminCollection = mongoose.model("Admin", AdminSchema);
const UserCollection = mongoose.model("User", UserSchema);

export { AdminCollection, UserCollection };
