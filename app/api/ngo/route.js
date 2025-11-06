import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.organization || !body.contact || !body.location) {
      return NextResponse.json({ error: true, message: "All fields are required" });
    }

    const client = await clientPromise;
    const db = client.db("ngo");
    const collection = db.collection("ngo");

    const existingUser = await collection.findOne({ organization: body.organization });
    if (existingUser) {
      return NextResponse.json({ error: true, message: "Organization exists" });
    }

    await collection.insertOne({
      organization: body.organization,
      contact: body.contact,
      location: body.location,
    });

    return NextResponse.json({ error: false, message: "Success" });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: true, message: "Internal Server Error" });
  }
}
