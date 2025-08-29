import { connectToDatabase } from "@/app/lib/mongoDBconnect";
import { auth } from "@clerk/nextjs/server";

export async function POST(request) {
    const { userId: clientId } = await auth();
    if (!clientId) {
        return Response.json({ message: "Access denied." }, { status: 401 });
    }

    const req = await request.json();

    if (!req.userId) {
        return Response.json({ message: "No client ID provided." }, { status: 401 })
    }
    if (req.userId !== clientId) {
        return Response.json({ message: "Mismatched user IDs" }, { status: 401 })
    }

    try {
        const db = await connectToDatabase();
        const entries = db.collection("entries");

        const result = await entries.insertOne({
            userId: clientId.split("_")[1],
            userFirstName: req.userFirstName,
            title: req.title,
            abstract: req.abstract,
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