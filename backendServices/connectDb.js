import mongoose from "mongoose";
const mongooseURL = "mongodb://localhost:27017";
let cached = global.mongoose || { conn: null, promise: null };

export const connectDataBase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongooseURL).then((mongoose) => mongoose);
    cached.conn = await cached.promise;
  }
  return cached.conn;
};
