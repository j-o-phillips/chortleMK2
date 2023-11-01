import connectMongoDB from "@/libs/mongodb";
import Chore from "@/models/chores";
import Household from "@/models/household";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
  const { choresId } = params;
  console.log(params);
  await connectMongoDB();
  const chore = await Chore.findOne({ _id: choresId});
  if (!chore) {
    return NextResponse.json({ error: "Chore not found" }, { status: 404 });
  }

  return NextResponse.json({ chore }, { status: 200 });
} catch (error) {
  return NextResponse.json({ error: "Error fetching chore" }, { status: 500 });
}
}

///
export async function DELETE(req) {
  try {
    const { choreId, householdId } = params;
    await connectMongoDB();
    
    const chore = await Chore.findOne({ _id: choreId });

    if (!chore) {
      return NextResponse.json({ error: "Chore not found" }, { status: 404 });
    }
    
    const household = await Household.findOne({ _id: householdId });

    if (!household) {
      return NextResponse.json({ error: "Household not found" }, { status: 404 });
    }

    household.chores = household.chores.filter((choreId) => choreId.toString() !== choreId);

    await household.save();
    await chore.remove();

    return NextResponse.json({ message: "Chore deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting chore" }, { status: 500 });
  }
}
