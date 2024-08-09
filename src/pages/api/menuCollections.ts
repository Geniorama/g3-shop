import { NextApiRequest, NextApiResponse } from "next";
import shopifyClient from "@/lib/shopify";
import type { MenuCollection } from "@/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const fetchCollections = await shopifyClient.collection.fetchAll()

        const serializableCollections = fetchCollections.map((collection:MenuCollection) => ({
            id: collection.id,
            title: collection.title,
            handle: collection.handle
        }))

        res.status(200).json({collections:serializableCollections})
    } catch(error){
        console.log(error);
        res.status(500).json({ collections: [] });
    }    
}