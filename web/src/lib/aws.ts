/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import dotenv from "dotenv";
import AWS from "aws-sdk";
import fetch from "node-fetch";
import { Readable } from "stream";
import {
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

// Create an instance of AWS.S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
  s3ForcePathStyle: true,
  // endpoint: "https://s3.amazonaws.com",
  signatureVersion: "v4",
});
const bucketName = process.env.AWS_S3_BUCKET!;
const client = new S3Client({ region: process.env.AWS_REGION! });

// Function to fetch user assets from S3
export const fetchUserAssetsFromS3 = async (
  userId: string,
  page: number,
  pageSize: number
) => {
  const prefix = `${userId}/`; // Assuming assets are stored with userId as a prefix

  const params: AWS.S3.ListObjectsV2Request = {
    Bucket: bucketName,
    Prefix: prefix,
    MaxKeys: pageSize,
    StartAfter: page > 1 ? `${prefix}${(page - 1) * pageSize}/` : undefined,
  };

  try {
    const response = await s3.listObjectsV2(params).promise();
    if (!response.Contents) {
      console.log("No contents found.");
      return {
        assets: [],
        totalCount: 0,
      };
    }
    const assets = await Promise.all(
      response.Contents.filter((c) => c.Key).map(async ({ Key }) => {
        const url = await s3.getSignedUrlPromise("getObject", {
          Bucket: bucketName,
          Key: Key,
          Expires: 3600, // URL expires in 1 hour, adjust as needed
        });

        return {
          type: Key?.endsWith(".mp4") ? "video" : "image",
          url: url, // Presigned URL
        };
      })
    );

    const totalCount = response.KeyCount || 0;

    return {
      assets,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching user's assets from S3:", error);
    throw new Error("Failed to fetch assets");
  }
};

// Function to get the number of items with a specific file extension in a specific prefix within a bucket
export const getItemsCountByExtensionInBucket = async (
  userId: string,
  fileExtension: string
): Promise<number> => {
  // Set up the parameters for listing objects
  const params: AWS.S3.ListObjectsV2Request = {
    Bucket: bucketName,
    Prefix: `${userId}/`, // Prefix for objects belonging to the user
  };

  try {
    // List objects in the specified prefix
    const response = await s3.listObjectsV2(params).promise();
    if (!response.Contents) {
      return 0;
    }
    // Filter objects based on file extension
    const itemsWithExtension = response.Contents
      ? response.Contents.filter(
          (item) => item && item.Key && item.Key.endsWith(`.${fileExtension}`)
        )
      : [];
    // Count the number of items with the specified extension
    const itemsCount = itemsWithExtension.length;
    return itemsCount;
  } catch (error) {
    console.error(
      `Error getting items count with extension ${fileExtension} from S3:`,
      error
    );
    throw new Error(
      `Failed to get items count with extension ${fileExtension} from S3`
    );
  }
};

// Function to upload a file to S3
export const s3FileUpload = async (
  body: Buffer | Uint8Array | Blob | string | Readable,
  userId: string,
  fileName: string,
  mimeType: string,
  bucketName = process.env.AWS_S3_BUCKET!,
  presignedUrl = false
) => {
  let s3Body = body;

  if (typeof body === "string") {
    try {
      const response = await fetch(body);
      if (response.ok) {
        s3Body = await response.buffer();
      }
    } catch (error) {
      console.error("Error fetch body in s3Upload function:", error);
    }
  }

  const params: AWS.S3.PutObjectRequest = {
    Bucket: bucketName,
    Key: `${userId}/${fileName}`,
    Body: s3Body,
    ContentType: mimeType,
  };

  try {
    const response = await s3.upload(params).promise();
    let publicUrl: string;

    if (presignedUrl) {
      publicUrl = await generateUploadPresignedUrl(
        bucketName,
        `${userId}/${fileName}`
      );
    } else {
      publicUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${userId}/${fileName}`;
    }

    https: return {
      publicUrl: publicUrl,
      url: response.Location, // URL of the uploaded file
      key: response.Key, // Key of the uploaded file
    };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
};

export async function uploadVideoToS3(blob: any, userId: string) {
  const body = Buffer.from(blob, "base64");
  const fileName = `video-${Date.now()}.mp4`;
  // Set up the parameters for the S3 upload
  const params: AWS.S3.PutObjectRequest = {
    Bucket: bucketName,
    Key: `${userId}/${fileName}`, // Constructing the file key
    Body: body, // Use the blob as Body
    ContentType: "video/mp4", // Set content type accordingly
  };

  try {
    // Upload the file to S3
    const response = await s3.upload(params).promise();

    // const mp4Count = await getItemsCountByExtensionInBucket(userId, "mp4");
    // const userCreditsRes = await decrementUserCredits(userId, "video");

    return {
      url: response.Location, // URL of the uploaded file
      key: response.Key, // Key of the uploaded file
      // mp4Count: userCreditsRes?.videoCredits, // Number of mp4 files in the user's directory
    };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
}

export const generateUploadPresignedUrl = async (
  bucketName: string,
  fileName: string
) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: fileName,
  });
  try {
    const url = await getSignedUrl(client, command, { expiresIn: 3600 }); // URL valid for 1 hour
    console.log("Presigned URL for upload:", url);
    return url;
  } catch (err) {
    console.error("Error generating presigned URL", err);
    throw new Error("Error generating presigned URL");
  }
};
