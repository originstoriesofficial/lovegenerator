import axios from 'axios';

export default async function generateImage(prompt: string) {
    const body = {
        "model_id":" black-forest-labs/FLUX.1-dev",
        "prompt":prompt,
        "width": 1080,
        "height": 1920
    }
    const livepeer = await axios.post('https://dream-gateway.livepeer.cloud/text-to-image', body)

    return livepeer;

}