import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";

interface Metadata {
  title: string;
  description: string;
  image: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid or missing URL parameter." });
  }

  try {
    // Fetch the website content
    const response = await axios.get(url);
    const html = response.data;

    // Load the HTML into cheerio for scraping
    const $ = cheerio.load(html);

    // Extract metadata
    const title = $("meta[property='og:title']").attr("content") || $("title").text() || "";
    const description =
      $("meta[property='og:description']").attr("content") ||
      $("meta[name='description']").attr("content") ||
      "";
    const image =
      $("meta[property='og:image']").attr("content") || "";

    const metadata: Metadata = {
      title,
      description,
      image,
    };

    res.status(200).json(metadata);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch metadata." });
  }
}
