import Household from "@/models/household";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/users";

export async function POST(req) {
  const { name, user } = await req.json();
  await connectMongoDB();
  //create household
  const household = await Household.create({
    name: name,
    users: [user],
    chores: [],
  });
  //add household to user model
  await User.findByIdAndUpdate(user, { households: household._id });
  return NextResponse.json(
    { message: "Household Created", household },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const household = await Household.find();
  return NextResponse.json({ household });
}
