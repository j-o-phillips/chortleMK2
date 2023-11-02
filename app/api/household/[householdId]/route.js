import Household from "@/models/household";
import User from "@/models/users";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(req, { params }) {
    const { householdId } = params;
    console.log(householdId);
    const { memberId } = await req.json();
    console.log(memberId)
    await Household.updateOne({_id:householdId}, {$pull: {users: memberId}});
    return NextResponse.json(
      { message: "Household updated" },
      { status: 200 }
    );
  }

export async function GET(req, { params }) {
  try {
    const { householdId } = params;
    await connectMongoDB();
    const household = await Household.findOne({ _id: householdId });
    if (!household) {
      return NextResponse.json(
        { error: "Household not found" },
        { status: 404 }
      );
    }
    const allUsers = await household.populate("users");

    return NextResponse.json({ allUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching household" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { householdId } = params;
    await connectMongoDB();

    const household = await Household.findOne({ _id: householdId });
    if (!household) {
      return NextResponse.json(
        { error: "Household not found" },
        { status: 404 }
      );
    }

    const users = await User.find({ _id: { $in: household.users } });

    for (const user of users) {
      user.households = user.households.filter(
        (id) => id.toString() !== householdId.toString()
      );
      await user.save();
    }

    await Household.findByIdAndDelete(householdId);

    return NextResponse.json({ message: "Household deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting household" },
      { status: 500 }
    );
  }
}

//http://localhost:3000/api/household/{householdId}
