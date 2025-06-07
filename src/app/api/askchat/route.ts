import query from "@/lib/queryApi";
import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { adminDB } from "@/firebaseAdmin";

export const POST = async (req: NextRequest) => {
    try {
        const reqBody = await req.json();
        const { prompt, id, model, session } = reqBody;

        if (!prompt) {
            return NextResponse.json({ message: "Please provide a prompt!" }, { status: 400 });
        }

        if (!id) {
            return NextResponse.json({ message: "Please provide a valid chat ID!" }, { status: 400 });
        }

        if (!session) {
            return NextResponse.json({ message: "Session (user ID) is required!" }, { status: 400 });
        }

        let response;
        try {
            response = await query(prompt, id, model);
        } catch (queryError) {
            console.error("Query API failed:", queryError);
            return NextResponse.json({ error: "Query failed", details: queryError }, { status: 500 });
        }

        const message = {
            text: response || "ChatGPT was unable to find an answer for that!",
            createdAt: admin.firestore.Timestamp.now(),
            user: {
                _id: "ChatGPT",
                name: "ChatGPT",
                avatar: "https://res.cloudinary.com/duehd78sl/image/upload/v1729227742/logoLight_amxdpz.png"
            }
        };

        await adminDB
            .collection("users")
            .doc(session)
            .collection("chats")
            .doc(id)
            .collection("messages")
            .add(message);

        return NextResponse.json({ success: true, message: "ChatGPT has responded!" }, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occured."
        return NextResponse.json({ error: message }, { status: 500 })
    }
};
