import { connectToDatabase } from "@/app/lib/mongoDBconnect";
import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";

/*
Checks whether the user is logged in. If they are, then okay for now.

Then the request is checked. If it lacks a client ID, access is denied.
If the request's client ID doesn't match the session's client ID, 
access is denied.

If the users match, then it may proceed.
*/

export async function DELETE(request) {
    // Access check
    const { userId: clientId } = await auth();
    if (!clientId) {
        return Response.json({ message: "Access denied." }, { status: 401 });
    }

    const params = await request.nextUrl.searchParams;

    if (!params.has("clientId")) {
        return Response.json({ message: "Access denied." }, { status: 401 });
    }
    if (params.get("clientId") !== clientId) {
        return Response.json({ message: "User ID mismatch." }, { status: 401 });
    }

    // If the request has no entry ID, throw bad request
    if (!params.has("entryId")) {
        return Response.json({ message: "No entry ID provided." }, { status: 400 });
    }

    // All good so far, time to remove from the database
    try {
        const db = await connectToDatabase();
        const entries = await db.collection("entries");

        await entries.deleteOne({ _id: ObjectId.createFromHexString(params.get("entryId")) });
        return Response.json({ message: "Entry deleted." })
    }
    catch (e) {
        return Response.json({ message: "An error occurred." }, { status: 500 });
    }
}