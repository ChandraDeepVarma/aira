// import mongoose from "mongoose";

// const adminSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   role: String,
// });

// const Admin = mongoose.model("admincredentials", adminSchema);

// export default mongoose.models.Admin ||
//   mongoose.model("admincredentials", adminSchema);

import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

// Only create the model if it doesn't already exist
const Admin =
  mongoose.models.admincredentials ||
  mongoose.model("admincredentials", adminSchema);

export default Admin;
