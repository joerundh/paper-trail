import { connectToDatabase } from "@/app/lib/mongoDBconnect";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
    const { entryId } = await params;
    console.log(entryId)

    try {
        const db = await connectToDatabase();
        const entries = db.collection("entries");

        const entry = await entries.findOne(
                        { _id: ObjectId.createFromHexString(entryId) }
                    );

        return Response.json({ entry: entry });
    }
    catch (e) {
        console.log(e);
        return Response.json({ message: "An error occurred" }, { status: 500 })
    }
}