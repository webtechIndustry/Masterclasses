import { connectDataBase } from "@/backendServices/connectDb";
import userModel from "@/backendServices/models/user-model";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDataBase();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User Id not found" }, { status: 404 });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const responsePayload = {
      name: user.fullName,
      email: user.email,
    };
    return NextResponse.json({
      message: "User Found",
      data: responsePayload,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
