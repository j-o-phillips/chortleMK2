import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
      const { id } = params;
      await connectMongoDB();
      const user = await User.findById(id);
  
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
    }
  }

  ///
  export async function PUT(req, { params }) {
    try {
      const { id } = params;
      const { name, email, imgURL, households } = await req.json();
      await connectMongoDB();
      const user = await User.findById(id);
  
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      user.name = name;
      user.email = email;
      user.imgURL = imgURL;
      user.households = households;
      await user.save();
  
      return NextResponse.json({ message: "User updated", user }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error updating user" }, { status: 500 });
    }
  }

  ///
  export async function DELETE(req, { params }) {
    try {
      const { id } = params;
      await connectMongoDB();
      const user = await User.findById(id);
  
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      await User.findByIdAndDelete(id);
  
      return NextResponse.json({ message: "User deleted" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
    }
  }