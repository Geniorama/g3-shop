import { NextApiRequest, NextApiResponse } from "next";
import contentfulClient from "@/lib/contentful";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        const fetchMenu = await contentfulClient.getEntries({
          content_type: "customMenu",
        });
    
        res.status(200).json({menuItems:fetchMenu.items})
      } catch (error) {
        console.error("Error fetching custom menu:", error);
        res.status(500).json({ menuItems: [] });
      }
}