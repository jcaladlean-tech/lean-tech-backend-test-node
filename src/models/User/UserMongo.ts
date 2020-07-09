import { IUser } from '../../interfaces/UserInterfaces';
import { Schema, model } from 'mongoose';
import Bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { config } from '../../config';

const userSchema = new Schema(
  {
    fullName: { type: String, required: 'The Name is required' },
    email: {
      type: String,
      required: 'The email is required',
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: 'The password is required' },
    tokens: [{ token: { type: String, required: true } }],
    role: { type: String, enum: ['admin', 'readOnly'], default: 'readOnly' },
    status: { type: String, default: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>('save', async function (next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified('password')) {
    user.password = await Bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const token = JWT.sign({ _id: user._id }, config.auth.token_key);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.removeAuthToken = async function (
  token: string
): Promise<IUser> {
  // Remove an auth token for the user
  const user: IUser = this;
  user.tokens = user.tokens.filter((t: any) => t.token !== token);
  return user.save();
};

userSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return Bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);
export default User;
