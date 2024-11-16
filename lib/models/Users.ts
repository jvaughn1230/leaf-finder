import { Schema, Document, model, models } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  favoriteLocalParks: string[];
  favoriteNPSParks: string[];
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  favoriteLocalParks: [{ type: String }],
  favoriteNPSParks: [{ type: String }],
});

export default models.User || model<IUser>("User", UserSchema);
