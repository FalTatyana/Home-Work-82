import mongoose, { Schema } from "mongoose";
import { UserFields } from "../types";
import bcrypt from "bcrypt";

const Scema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema<UserFields>({
 username: {
  type: String,
  require: true,
  unique: true
 },
 password: {
  type: String,
  require: true
 }
});

userSchema.pre("save", async function(){
 const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
 const hash = await bcrypt.hash(this.password, salt);

 this.password = hash;
})

const User = mongoose.model("User", userSchema);
export default User;
