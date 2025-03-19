import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDataBase } from "@/backendServices/connectDb";
import userModel from "@/backendServices/models/user-model";

export const POST = async (req) => {
  try {
    await connectDataBase();
    const body = await req.json();
    const { password, email } = body;

    const isUser = await userModel.findOne({ email });
    if (!isUser) {
      return NextResponse.json({
        error: "User not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, isUser.password);
    if (!passwordMatch) {
      return NextResponse.json({
        error: "Password doesn't match",
      });
    }
    const userToken = jwt.sign({ userId: isUser._id }, "MY_SECRET", {
      expiresIn: "2d",
    });

    return NextResponse.json({
      message: "Login Successful",
      token: userToken,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
};
