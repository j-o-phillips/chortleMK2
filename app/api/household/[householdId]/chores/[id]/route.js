import connectMongoDB from "@/libs/mongodb";
import { Chore } from "@/models/chores";
import Household from "@/models/household";
import { NextResponse } from "next/server";

export default async function POST(req) {
    try{
   const { name, description, deadline, assignees, householdId } = await req.json();
   await connectMongoDB();
        
   const chore = await Chore.create({
           name: name,
           description: description,
           deadline: deadline,
           assignees: [assignees]
         });
   
         await Household.findByIdAndUpdate(householdId, { 
           $push: {chores: chore._id }});
 
         return NextResponse.json(
           { message: "Chore Created", chore },
           { status: 200 }
         );
       } catch (error) {
         return NextResponse.json({ error: "Error creating chore" }, { status: 400 });
       }
     }
 