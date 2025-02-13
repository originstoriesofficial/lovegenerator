/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export async function POST(req: Request): Promise<Response> {
    try {
        const { answers }: { answers: string } = await req.json();

        if (!answers) {
            return new Response(JSON.stringify({ error: 'Answers are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const prompt = answers;
        console.log({ prompt });

        const body = {
            model_id: 'SG161222/RealVisXL_V4.0_Lightning',
            prompt,
            width: 1080,
            height: 1920,
        };

        console.log('Request Body:', JSON.stringify(body, null, 2));

        const response = await axios.post(
            'https://dream-gateway.livepeer.cloud/text-to-image',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.LIVEPEER_API_TOKEN}`,
                },
            }
        );

        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error('Error response:', error.response?.data || error.message);
        return new Response(
            JSON.stringify({ error: error.response?.data || 'Internal Server Error' }),
            { status: error.response?.status || 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
