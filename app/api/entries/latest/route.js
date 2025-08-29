import { connectToDatabase } from "@/app/lib/mongoDBconnect";

/*
Returns a number of entries sorted according to date added, 
with pagination specified in the request
*/

export async function GET(request) {
    // Skim request properties
    const params = await request.nextUrl.searchParams;

    // Define offset and limit
    const offset = params.has("offset") ? parseInt(params.get("offset")) : 0;
    const limit = params.has("limit") ? parseInt(params.get("limit")) : 5;

    try {
        const db = await connectToDatabase();
        const entries = db.collection("entries");

        const results = await entries.find({ isPublic: true })                  // Find only public entries
                            .sort({ createdAt: -1 })                            // Sort according to date
                            .skip(offset)                                       // Self-explanatory
                            .limit(limit)                                       // Ditto
                            .toArray();
        const count = await entries.countDocuments({ isPublic: true });
        
        return Response.json({ count: count, entries: results });
    }
    catch (e) {
        console.log(e);
        return Response.json({ message: "An error occurred" }, { status: 500 });
    }
}