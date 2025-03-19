import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { userId } = params;

  return NextResponse.json({ message: `Hello ${userId}` });
};
