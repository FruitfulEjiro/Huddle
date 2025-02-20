import mongoose from "mongoose";
import validator from "validator";

const UserSchema = mongoose.Schema({
   name: {
      type: String,
      required: [true, "Please enter your name"],
   },
   email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: {
         validator: (value) => validator.isEmail(value),
         message: "Please enter a valid email",
      },
   },
   password: {
      type: String,
      required: [true, "Please enter your password"],
   },
   confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
         validator: function (value) {
            return this.password === value;
         },
         message: "Passwords do not match",
      },
   },
   role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
   },
   status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
   },
   profilePicture: {
      type: String,
      default: "default.png",
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

// ++++++++++++++++ Document Middleware ++++++++++++++++

// Hash password before saving
UserSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password, 10);
   this.confirmPassword = undefined;
   next();
});

// Compare password
UserSchema.methods.comparePassword = async function (password, DBPassword) {
   return await bcrypt.compare(password, DBPassword);
};

const User = mongoose.model("User", UserSchema);
