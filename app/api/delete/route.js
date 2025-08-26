import { auth } from "@clerk/nextjs/dist/types/server";

/*
Checks whether the user is logged in. If they are, then okay for now.

Then the request is checked. If it lacks a client ID, access is denied.
If the request's client ID doesn't match the session's client ID, 
access is denied.

If the users match, then it may proceed.
*/

export default async function DELETE(request) {
    // Access check
    const { userId: clientId } = await auth();
    if (!clientId) {
        return Response.json({ message: "Access denied." }, { status: 401 });
    }

    const req = await request.nextUrl.searchParams.entries().map((acc, [key, value]) => { acc[key] = value; return acc; }, {});
    if (!req.clientId) {
        return Response.json({ message: "Access denied." }, { status: 401 });
    }
    if (req.clientId !== clientId) {
        return Response.json({ message: "Access denied." }, { status: 401 });
    }

    // If the request has no entry ID, throw bad request
    if (!req.entryId) {
        return Response.json({ message: "No entry ID provided." }, { status: 400 });
    }
}