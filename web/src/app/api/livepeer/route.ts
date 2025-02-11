import axios from 'axios';

export default async function generateImage(prompt: string) {
    const body = {
        "model_id":"SG161222/RealVisXL_V4.0_Lightning",
        "prompt":prompt,
        "width": 1080,
        "height": 1920
    }
    const livepeer = await axios.post('https://dream-gateway.livepeer.cloud/text-to-image', body)

    return livepeer;

}