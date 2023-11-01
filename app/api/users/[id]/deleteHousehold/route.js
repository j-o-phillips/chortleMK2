import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import Household from "@/models/household";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id, householdId } = params;
    console.log(params);
    console.log(id);
    await connectMongoDB();

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const household = await Household.findById(householdId);

    if (!household) {
      return NextResponse.json({ error: "Household not found" }, { status: 404 });
    }

    //find index of the household to be deleted in the user's list
    const userHouseholdIndex = user.households.indexOf(householdId);

    if (userHouseholdIndex === -1) {
      return NextResponse.json({ error: "Household not found in the user's list" }, { status: 404 });
    }

    //find the index of the user to be removed in the household's users array
    const householdUserIndex = household.users.indexOf(id);

    if (householdUserIndex === -1) {
      return NextResponse.json({ error: "User not found in the household's users" }, { status: 404 });
    }

    //remove the household from the user's list
    user.households.splice(userHouseholdIndex, 1);

    //remove the user from the household's users array
    household.users.splice(householdUserIndex, 1);

    //save changes
    await user.save();
    await household.save();

    return NextResponse.json({ message: "Household deleted from the user's list, and user removed from household" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting household and removing user from the household" }, { status: 500 });
  }
}

//http://localhost:3000/api/users/{userid}/deleteHousehold/{householdId}
