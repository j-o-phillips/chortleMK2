import connectMongoDB from "@/libs/mongodb";

import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("route hit");
  const { name, email, imgURL, households } = await req.json();
  await connectMongoDB();
  const user = await User.find({ email: email });

  if (user.length)
    return NextResponse.json({ message: "User email already exists" });

  await User.create({ name, email, imgURL, households });
  return NextResponse.json({ message: "User Created" }, { status: 201 });
}
