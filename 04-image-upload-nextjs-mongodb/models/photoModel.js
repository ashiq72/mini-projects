import { Schema, model, models } from "mongoose";

const photoSchema = new Schema(
  {
    public_id: String,
    public_url: String,
  },
  { timestamps: true }
);

const Photo = models.photos || model("photos", photoSchema);

export default Photo;
