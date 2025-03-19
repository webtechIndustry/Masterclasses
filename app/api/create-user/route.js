import { connectDataBase } from "@/backendServices/connectDb";
import userModel from "@/backendServices/models/user-model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDataBase();
    const body = await req.json();
    const { fullName, email, password } = body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400, statusText: "Bad Request" }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    console.log(error, "error");
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
