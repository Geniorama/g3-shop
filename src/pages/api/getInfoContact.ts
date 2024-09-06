import { NextRequest, NextResponse } from 'next/server';
import contentfulClient from '@/lib/contentful';

export async function handler(req: NextRequest) {
    if (req.method === 'POST') {
        try {
            // Realiza la llamada a Contentful
            const entries = await contentfulClient.getEntries({
                content_type: 'contactInfo',
                limit: 1
            });
            const entry = entries.items[0];

            return NextResponse.json(entry);
        } catch (error) {
            console.error('Error fetching data from Contentful:', error);
            return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
        }
    } else {
        // Manejo de métodos HTTP no permitidos
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }
}
