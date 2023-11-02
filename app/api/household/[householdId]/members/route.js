import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/users";
import Household from "@/models/household";

export async function POST(req, { params }) {
  const { email } = await req.json();
  const { householdId } = params;
  await connectMongoDB();

  //check if user exists
  const user = await User.find({ email: email });

  //create new user if none exists
  if (!user[0]) {
    const user = await User.create({ email: email, households: [householdId] });
    //add user to household
    await Household.findOneAndUpdate(
      { _id: householdId },
      { $push: { users: user } }
    );

    return NextResponse.json(
      {
        message: "User Created and added",
        redirect: "/createHousehold",
        user: user,
      },
      { status: 201 }
    );
  }
  //if user does exist
  //check if user is already a part of the houshold
  const household = await Household.findById(householdId);
  const match = household.users.includes(user[0]._id);

  if (match) {
    return NextResponse.json(
      { message: "User Already belongs to this household" },
      { status: 200 }
    );
  } else {
    user[0].households = [householdId];
    await user[0].save();
    //add user to houshold
    await Household.findOneAndUpdate(
      { _id: householdId },
      { $push: { users: user[0] } }
    );
    return NextResponse.json({ message: "User Added" }, { status: 200 });
  }
}

export async function GET (req, {params}) {
  try {
    const {householdId} = params
    await connectMongoDB()
    const members = await User.find({households: householdId})
    console.log(members);
    return NextResponse.json({members})
  } catch (error) {
    NextResponse.error(error)
  }
}