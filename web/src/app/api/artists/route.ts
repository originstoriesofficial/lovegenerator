import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../lib/prisma';

// Add Artist
export default async function addArtist(req: NextApiRequest, res: NextApiResponse) {
    const { name, email } = req.body;
    try {
        const artist = await prisma.artist.create({
            data: {
                name,
                email
            }
        });
        res.status(201).json(artist);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add artist' });
    }
}

// Add Route
export async function addRoute(req: NextApiRequest, res: NextApiResponse) {
    const { title, content, published, artistId } = req.body;
    try {
        const route = await prisma.route.create({
            data: {
                title,
                content,
                published,
                artistId
            }
        });
        res.status(201).json(route);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add route' });
    }
}

// Get Route
export async function getRoute(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    try {
        const route = await prisma.route.findUnique({
            where: { id: Number(id) }
        });
        res.status(200).json(route);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get route' });
    }
}

// Get All Routes
export async function getAllRoutes(req: NextApiRequest, res: NextApiResponse) {
    try {
        const routes = await prisma.route.findMany();
        res.status(200).json(routes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get routes' });
    }
}

// Get Artist
export async function getArtist(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    try {
        const artist = await prisma.artist.findUnique({
            where: { id: Number(id) }
        });
        res.status(200).json(artist);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get artist' });
    }
}

// Get All Artists
export async function getAllArtists(req: NextApiRequest, res: NextApiResponse) {
    try {
        const artists = await prisma.artist.findMany();
        res.status(200).json(artists);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get artists' });
    }
}

// Add Question
export async function addQuestion(req: NextApiRequest, res: NextApiResponse) {
    const { text, routeId } = req.body;
    try {
        const question = await prisma.question.create({
            data: {
                text,
                routeId
            }
        });
        res.status(201).json(question);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add question' });
    }
}

// Get Question
export async function getQuestion(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    try {
        const question = await prisma.question.findUnique({
            where: { id: Number(id) }
        });
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get question' });
    }
}

// Get All Questions
export async function getAllQuestions(req: NextApiRequest, res: NextApiResponse) {
    try {
        const questions = await prisma.question.findMany();
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get questions' });
    }
}