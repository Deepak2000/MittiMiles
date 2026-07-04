"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getFallbackDestination, DestinationData } from "@/lib/fallbackData";

export async function discoverDestination(
  destination: string,
  interests: string[]
): Promise<{ success: boolean; data: DestinationData; error?: string }> {
  try {
    // 1. Sanitize inputs
    const sanitizedDestination = destination.trim().substring(0, 100);
    const sanitizedInterests = interests.map((i) => i.trim().substring(0, 30));

    if (!sanitizedDestination) {
      return {
        success: false,
        data: getFallbackDestination("hampi"),
        error: "Destination name is required.",
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // 2. Fallback if API key is not configured
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not configured in environment. Using fallback data.");
      const fallback = getFallbackDestination(sanitizedDestination);
      return {
        success: true,
        data: fallback,
        error: "Notice: Operating in offline fallback mode (GEMINI_API_KEY not configured).",
      };
    }

    // 3. Initialize Gemini AI SDK
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: "You are a local cultural historian and travel guide. Your goal is to help travelers discover hidden, non-commercial treasures. You must ONLY output a single valid JSON object following the exact schema provided. Do not enclose the output in markdown block formatting. No ```json tags, just pure JSON.",
    });

    const interestsPrompt = sanitizedInterests.length > 0 
      ? `The traveler is specifically interested in: ${sanitizedInterests.join(", ")}.` 
      : "";

    const prompt = `
Generate deep cultural details for the destination: "${sanitizedDestination}". ${interestsPrompt}
Make sure you include lesser-known folklore, hidden traditional craft clusters, authentic native food, historical heritage sights, and a 1-day step-by-step slow-travel itinerary.

CRITICAL READABILITY REQUIREMENT:
For all text description fields (such as 'description', 'lore.story', 'crafts.description', 'food.description', 'heritageSights.description'), you must ensure the language is concise and easy to read. Do NOT output a single long wall-of-text block. Break the description into multiple paragraphs by inserting explicit double newlines (\\n\\n) between logical points, or use simple lists (e.g. starting with '-') to list features, making it highly readable in user cards.

First, check if the entered location "${sanitizedDestination}" makes logical and geographical sense (e.g. if the user says "Manali in Maharashtra", it is incorrect because Manali is in Himachal Pradesh. Similarly, check for other typos or contradictory state/country/regional bindings).
You MUST evaluate this and populate the "locationValidation" object.
- If it is correct and makes sense, "isValid" should be true, "message" can be empty, and "suggestions" can be empty.
- If there is a discrepancy (like "Manali in Maharashtra"), "isValid" must be false, "message" must explain why (e.g. "Manali is actually located in Himachal Pradesh, not Maharashtra."), and "suggestions" must list 1-3 sensible correct locations they might have intended (e.g. ["Manali, Himachal Pradesh", "Maharashtra (e.g. Mahabaleshwar)"]). Even if isValid is false, you should still generate best-effort details for the user's intended target in the rest of the JSON.

You MUST return a JSON object with the following exact keys and types:
{
  "destinationName": "String (exact name of the place)",
  "stateOrRegion": "String (state or province)",
  "coordinates": {
    "lat": Number (approximate latitude coordinate),
    "lng": Number (approximate longitude coordinate)
  },
  "tagline": "String (engaging cultural tagline)",
  "description": "String (short description highlighting cultural significance)",
  "lore": {
    "title": "String (catchy story title)",
    "story": "String (an immersive, engaging historical legend or folklore about the place or its crafts, written in first-person or guide-narrative style)"
  },
  "crafts": [
    {
      "name": "String (name of the traditional craft/weaving/art form)",
      "description": "String (history of this craft, how it is made, how it supports locals)",
      "location": "String (specific village, cluster, or coordinate zone to find it)"
    }
  ],
  "food": [
    {
      "name": "String (name of the local/traditional dish)",
      "description": "String (what ingredients are used, and the story of its origin)"
    }
  ],
  "heritageSights": [
    {
      "name": "String (name of the heritage site/monument/ancient ruin)",
      "description": "String (historical details, architectural significance)",
      "historicalEra": "String (estimated build date/century or ruling dynasty)"
    }
  ],
  "itinerary": [
    {
      "timeSlot": "String (Morning, Afternoon, or Evening)",
      "activity": "String (slow-travel activity visiting artisans or historic spots)",
      "localTip": "String (ethical travel tip, transit advise, or behavior etiquette)"
    }
  ],
  "locationValidation": {
    "isValid": Boolean (true if the entered location makes geographical sense, false if there is a discrepancy),
    "message": "String (empty if valid, otherwise explaining the geographical discrepancy to the user)",
    "suggestions": ["String (1-3 suggested correct locations)"]
  }
}

Only return the JSON. Double-check that it parses correctly and has no trailing commas.
`;

    // 4. Call generative model
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const responseText = result.response.text();
    if (!responseText) {
      throw new Error("Empty response returned from Gemini API");
    }

    // 5. Parse JSON response
    const parsedData = JSON.parse(responseText.trim()) as DestinationData;

    // Validate coordinates
    if (!parsedData.coordinates || typeof parsedData.coordinates.lat !== "number" || typeof parsedData.coordinates.lng !== "number") {
      parsedData.coordinates = { lat: 20.5937, lng: 78.9629 }; // fallback to center of India
    }

    // Ensure heritageSights exists
    if (!parsedData.heritageSights) {
      parsedData.heritageSights = [];
    }

    // Ensure locationValidation structure is sound
    if (!parsedData.locationValidation) {
      parsedData.locationValidation = { isValid: true };
    }

    return {
      success: true,
      data: parsedData,
    };

  } catch (error: any) {
    console.error("Error generating content via Gemini API:", error);
    const baseFallback = getFallbackDestination(destination);
    const fallback: DestinationData = {
      ...baseFallback,
      locationValidation: {
        isValid: true,
      }
    };
    return {
      success: true,
      data: fallback,
      error: `Notice: API call encountered an error (${error.message || error}). Displaying fallback mock data.`,
    };
  }
}
