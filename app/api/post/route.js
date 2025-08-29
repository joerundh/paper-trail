import { connectToDatabase } from "@/app/lib/mongoDBconnect";
import { auth } from "@clerk/nextjs/server";

export async function POST(request) {
    const { userId: clientId } = await auth();
    if (!clientId) {
        return Response.json({ message: "Access denied." }, { status: 401 });
    }

    const req = await request.json();

    if (!req.userId) {
        console.log("No client ID provided.")
        return Response.json({ message: "No client ID provided." }, { status: 401 })
    }
    if (req.userId !== clientId) {
        console.log("Mismatched IDs")
        return Response.json({ message: "Mismatched IDs" }, { status: 401 })
    }

    try {
        const db = await connectToDatabase();
        const entries = db.collection("entries");

        const result = await entries.insertOne({
            userId: clientId,
            userFullName: req.userFullName,
            title: req.title,
            description: req.description,
            url: req.url,
            createdAt: new Date(),
            isPublic: req.makePublic
        });
        return Response.json({ message: "Entry submitted." })
    }
    catch(e) {
        console.log(e);
        return Response.json({ message: "An error occurred." }, { status: 500 });
    }
}