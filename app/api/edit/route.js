import { connectToDatabase } from "@/app/lib/mongoDBconnect";
import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";

export async function PUT(request) {
    const { userId: clientId } = await auth();
    if (!clientId) {
        return Response.json({ message: "Access denied." }, { status: 401 });
    }

    const params = await request.json();

    const userId = params.userId;
    if (!userId) {
        return Response.json({ message: "User ID missing." }, { status: 400 })
    }
    if (userId !== clientId) {
        return Response.json({ message: "Mismatched user IDs." }, { status: 401 });
    }

    const entryId = params.entryId;
    if (!entryId) {
        return Response.json({ message: "Entry ID missing." }, { status: 400 })
    }

    const data = {
        title: params.title,
        abstract: params.abstract,
        url: params.url,
        isPublic: params.makePublic
    }

    try {
        const db = await connectToDatabase();
        const entries = db.collection("entries");

        await entries.updateOne(
            { _id: ObjectId.createFromHexString(params.entryId) },
            { $set: data }
        );

        return Response.json({ message: "Entry edited." });
    }
    catch (e) {
        console.log(e);
        return Response.json({ message: "An error occurred." }, { status: 500 });
    }
}