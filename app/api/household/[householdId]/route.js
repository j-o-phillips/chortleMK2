import Household from "@/models/household";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    const { id } = params;
    const { newName: name, newUsers: users } = await req.json();
    await connectMongoDB();
    await Household.findByIdAndUpdate(id, { name, users });
    return NextResponse.json({ message: "Household updated" }, { status: 200 });
  }
  
  export async function GET(req, { params }) {
    try {
    const { householdId } = params;
    console.log(householdId);
    await connectMongoDB();
    const household = await Household.findOne({ _id: householdId });
    if (!household) {
      return NextResponse.json({ error: "Household not found" }, { status: 404 });
    }

    return NextResponse.json({ household }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching household" }, { status: 500 });
  }
}
