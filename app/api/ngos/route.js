import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ngo");
    const collection = db.collection("ngo");

    const ngos = await collection.find({}).toArray();

    // Return only necessary fields
    const data = ngos.map((ngo) => ({
      id: ngo._id.toString(),
      organization: ngo.organization,
      contact: ngo.contact,
      location: ngo.location,
    }));

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: true, message: "Failed to fetch NGOs" }, { status: 500 });
  }
}
