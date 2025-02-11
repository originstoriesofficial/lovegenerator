import { NextRequest, NextResponse } from 'next/server';
import { fal } from '@fal-ai/client';
import { s3Client } from "nodejs-s3-typescript";

fal.config({
  credentials: process.env.FAL_AI_API_KEY!, // API Key from .env.local
});

const s3Config = {
  bucketName: process.env.AWS_BUCKET_NAME as string,
  region: process.env.AWS_REGION as string,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
}

// AWS S3 Configuration
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   region: process.env.AWS_REGION!,
// });

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const photo = formData.get('photo') as File;
  const characterName = formData.get('characterName') as string;
  const hasName = formData.get('hasName') as string;

  if (!photo) {
    return NextResponse.json({ error: 'Photo is required' }, { status: 400 });
  }
  
  // Simulate Vision Model Attributes
  const visionAttributes = await fakeVisionModel(photo);

  // Generate Character Breakdown using GPT or any LLM
  const breakdown = await generateCharacterBreakdown({
    visionAttributes,
    characterName,
    hasName,
  });

  return NextResponse.json({ breakdown });
}


// Simulated Vision Model Function
async function fakeVisionModel(photo: File): Promise<string> {
  console.log(photo.type, 'from vision model')
  const file = new File(["MonksCreativeUpscaler"], photo.name, { type: photo.type });
  const url = await fal.storage.upload(file);

  // const s3Url = await uploadToS3(photo);
  // console.log(s3Url, 'S3 Upload URL');
  const s3 = new s3Client({
    ...s3Config,
    dirName: "vpm1"
});
const res = await s3.uploadFile(Buffer.from(await file.arrayBuffer()));
        // return res;
  try {
    const result = await fal.subscribe("fal-ai/creative-upscaler", {
      input: {
        image_url: res.location
        // "https://storage.googleapis.com/falserverless/model_tests/upscale/owl.png"
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });
    console.log(result.data.image.url);
    console.log(result.requestId);
  
    return result.data.image.url;
  } catch(e: any) {
    return e;
  }
}



// Simulated GPT-4/LLM Function
async function generateCharacterBreakdown({
  visionAttributes,
  characterName,
  hasName,
}: {
  visionAttributes: string;
  characterName: string;
  hasName: string;
}): Promise<string> {
  const nameSection = hasName === 'yes' ? `Name: ${characterName}` : 'Name: Not provided';
  return `
Character Breakdown
===================
${nameSection}
Vision Attributes: ${visionAttributes}

This character is perfect for roles requiring a mix of confidence and leadership.
`;
}
