import { Schema, model } from 'mongoose';
import { IUser, IUserMethodes, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<IUser, Record<string, never>, IUserMethodes>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
    needsPasswordChange: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
userSchema.methods.isUserExist = async function (
  id: string
): Promise<Partial<IUser | null>> {
  const existingUser = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1, role: 1 }
  ).lean();
  return existingUser;
};
userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savePassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savePassword);
};
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
const User = model<IUser, UserModel>('User', userSchema);
export default User;
