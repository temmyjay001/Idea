import * as mongoose from 'mongoose';


export const IdeaSchema = new mongoose.Schema(
  {
    idea: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { 
    timestamps: true
  },
);

export class Idea extends mongoose.Document {
  id: string;
  idea: string;
  description: string;
}
