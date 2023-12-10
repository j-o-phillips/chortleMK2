import connectMongoDB from "@/libs/mongodb";
import Chore from "@/models/chores";
import Household from "@/models/household";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { choreId } = params;
    await connectMongoDB();
    const chore = await Chore.findOne({ _id: choreId });
    if (!chore) {
      return NextResponse.json({ error: "Chore not found" }, { status: 404 });
    }

    return NextResponse.json({ chore }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching chore" },
      { status: 500 }
    );
  }
}

///
export async function DELETE(req, { params }) {
  try {
    const { householdId, choreId } = params;
    await connectMongoDB();

    const chore = await Chore.findOne({ _id: choreId });

    if (!chore) {
      return NextResponse.json({ error: "Chore not found" }, { status: 404 });
    }

    const household = await Household.findOne({ _id: householdId });

    if (!household) {
      return NextResponse.json(
        { error: "Household not found" },
        { status: 404 }
      );
    }

    await Chore.deleteOne({ _id: choreId });
    household.chores = household.chores.filter(
      (choreToDelete) => choreToDelete.toString() !== choreId.toString()
    );
    await household.save();

    return NextResponse.json({ message: "Chore deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

///
export async function PUT(req, { params, body }) {
  try {
    const { choreId } = params;
    const data = await req.json();
    await connectMongoDB();

    const updatedChore = await Chore.findByIdAndUpdate(
      choreId,
      { $set: data },
      { new: true }
    );

    if (!updatedChore) {
      return NextResponse.json({ error: "Chore not found" }, { status: 404 });
    }

    return NextResponse.json({ chore: updatedChore }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req, { params, body }) {
  try {
    const { choreId } = params;
    await connectMongoDB();

    const update = { completed: true, ...body };

    const updatedChore = await Chore.findByIdAndUpdate(
      choreId,
      { $set: update },
      { new: true }
    );

    if (!updatedChore) {
      return NextResponse.json({ error: "Chore not found" }, { status: 404 });
    }

    return NextResponse.json({ chore: updatedChore }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
