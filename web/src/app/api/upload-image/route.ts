import { s3FileUpload } from "@/lib/aws";
import { NextRequest } from "next/server";
import fetch from "node-fetch";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { userId, imageUrl } = body;
    let fileBuffer;
    let s3Response;

    try {

        const response = await fetch(imageUrl);
        if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            fileBuffer = Buffer.from(arrayBuffer);
            console.log({fileBuffer})
        }

    } catch (error) {
        console.error(
            "Error in save-content route -> Fetch the image or video:",
            error
        );
        return new Response(
            JSON.stringify({ error: "Internal Server Error", message: error }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    try {

        s3Response = await s3FileUpload(
            fileBuffer!,
            userId,
            `image-${Date.now()}.jpg`,
            "image/jpeg"
        );
        return new Response(JSON.stringify(s3Response), { status: 200 });

    } catch (error) {
        console.error(
            "Error in save-content route -> Upload to S3 and save to database:",
            error
        );
        return new Response(
            JSON.stringify({ error: "Internal Server Error", message: error }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

}
