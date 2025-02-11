import { NextRequest, NextResponse } from 'next/server';
import { fal } from '@fal-ai/client';

fal.config({
  credentials: process.env.FAL_AI_API_KEY!, // API Key from .env.local
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const photo = formData.get('photo') as File;
  const characterName = formData.get('characterName') as string;
  const hasName = formData.get('hasName') as string;

  if (!photo) {
    return NextResponse.json({ error: 'Photo is required' }, { status: 400 });
  }

  try {
    // Step 1: Upload Image to Fal Storage
    const imageUrl = await fal.storage.upload(photo);

    // Step 2: Extract Vision Attributes with Specific Prompt
    const visionAttributes = await fetchFlorenceVisionAttributes(imageUrl);

    // Step 3: Generate Character Breakdown using GPT
    const breakdown = await generateCharacterBreakdown({
      visionAttributes,
      characterName,
      hasName,
    });

    return NextResponse.json({ breakdown });

  } catch (error) {
    console.error("Error processing character:", error);
    return NextResponse.json({ error: "Failed to process the character" }, { status: 500 });
  }
}

// Send Image to Florence-2 with a Custom Prompt
async function fetchFlorenceVisionAttributes(imageUrl: string): Promise<string> {
  const result = await fal.subscribe("fal-ai/florence-2-large/detailed-caption", {
    input: {
      image_url: imageUrl, // ✅ Now using the uploaded image URL
      // prompt: `
      //   Describe the character in the image in detail. Include:
      //   - The type of character (human, animal, mythical creature).
      //   - What they are wearing (clothing style, cape color, armor).
      //   - What they are holding (sword, staff, book, magical item).
      //   - Their emotional state (happy, sad, serious, determined).
      //   - Their physical stance (standing, sitting, flying).
      // `,
    },
    logs: true,
  });

  return result.data?.results || 'No description available';
}

// Generate GPT-Based Character Breakdown
async function generateCharacterBreakdown({
  visionAttributes,
  characterName,
  hasName,
}: {
  visionAttributes: string;
  characterName: string;
  hasName: string;
}): Promise<string> {
  const nameSection = hasName === 'yes' ? `Name: ${characterName}` : 'Name: fal-ai/creative-upscaler';
  return `
Character Breakdown
===================
${nameSection}
Vision Attributes: ${visionAttributes}

This character possesses a unique presence, making them an ideal choice for diverse roles.
`;
}
