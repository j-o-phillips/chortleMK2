import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("route hit");
  const { name, email, imgURL, households } = await req.json();
  await connectMongoDB();
  const user = await User.find({ email: email });

  if (!user[0]) {
    //If the user doesn't exist
    const user = await User.create({ name, email, imgURL, households });
    return NextResponse.json(
      { message: "User Created", redirect: "/createHousehold", user: user },
      { status: 201 }
    );
  }

  if (user[0]) {
    //if the user exists but their houshold array is empty
    if (!user[0].households.length)
      return NextResponse.json(
        {
          message: "User exists, create a household",
          redirect: "/createHousehold",
          user: user[0],
        },
        { status: 200 }
      );

    //the user exists and already has atleast one household
    //the user may have been added by another user, so we must update the image and name
    user[0].name = name;
    user[0].imgURL = imgURL;
    await user[0].save();

    return NextResponse.json(
      {
        message: "User email already exists",
        redirect: `/${user[0].households[0]}`,
        user: user[0],
      },
      { status: 200 }
    );
  }
}

export async function GET() {
  await connectMongoDB();
  const user = await User.find();
  return NextResponse.json({ user });
}

