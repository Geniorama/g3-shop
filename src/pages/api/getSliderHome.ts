import { NextRequest, NextResponse } from 'next/server';
import contentfulClient from '@/lib/contentful';

export async function handler(req: NextRequest) {
    if (req.method === 'POST') {
        try {
            // Realiza la llamada a Contentful para obtener los datos del "Slider Home"
            const entries = await contentfulClient.getEntries({
                content_type: 'sliderHome', // Cambia al content type correcto
            });

            // Retorna los datos del slider
            return NextResponse.json(entries);
        } catch (error) {
            console.error('Error fetching data from Contentful:', error);
            return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
        }
    } else {
        // Manejo de métodos HTTP no permitidos
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }
}
