import { Document } from 'mongoose';

export interface About extends Document {
  readonly text: string;
  readonly created_at: Date;
}
