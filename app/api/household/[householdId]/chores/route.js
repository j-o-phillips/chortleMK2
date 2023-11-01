import connectMongoDB from "@/libs/mongodb";
import Chore from "@/models/chores";
import Household from "@/models/household";
import { NextResponse } from "next/server";

export async function POST(req, {params}) {
   try{
  const { name, description, deadline, assignees } = await req.json();
  const { householdId } = params
  await connectMongoDB();
       
  const chore = await Chore.create({
          name: name,
          description: description,
          deadline: deadline,
          assignees: [assignees],
          household: householdId

        });
  
        await Household.findByIdAndUpdate(householdId, { 
          $push: {chores: chore._id }});

        return NextResponse.json(
          { message: "Chore Created", chore },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json({ error: 'error', error }, { status: 400 });
      }
    }

    ///

    export async function GET(req, { params }) {
      try {
        const { householdId } = params;
        if (!householdId) {
          return NextResponse.json({ error: "Missing householdId" }, { status: 400 });
        }
    
        await connectMongoDB();
    
        const chores = await Chore.find({ household: householdId });
    
        return NextResponse.json({ chores }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: "Error fetching chores" }, { status: 500 });
      }
    }
