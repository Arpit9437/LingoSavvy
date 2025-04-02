import { GoogleGenerativeAI } from "@google/generative-ai"; 

export const analyze = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const {text} = req.body;
    const model = genAI.getGenerativeModel({model: "gemini-2.0-flash"});
    const prompt = `You are a language expert who reviews text to enhance clarity, grammar, punctuation, tone, and vocabulary. Please analyze the following text and provide suggestions for improvement in the following JSON format:

{
  "corrected_text": "<The improved version of the text>",
  "changes": [
    {
      "type": "grammar", 
      "original": "<original text or phrase>",
      "corrected": "<corrected text or phrase>"
    },
    {
      "type": "clarity", 
      "original": "<original text or phrase>", 
      "corrected": "<corrected text or phrase>"
    },
    {
      "type": "tone", 
      "original": "<original text or phrase>", 
      "corrected": "<corrected text or phrase>"
    },
    {
      "type": "vocabulary", 
      "original": "<original word or phrase>", 
      "corrected": "<improved word or phrase>"
    }
  ],
  "ratings": {
    "grammar": <rating out of 10>,
    "vocabulary": <rating out of 10>,
    "clarity": <rating out of 10>,
    "overall": <rating out of 10>
  }
}

Important: Return ONLY the JSON without any additional text, markdown formatting, or code block markers.

Here is the text to be analyzed:
${text}
`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let textres = response.text();
    
    // Clean the response by removing markdown code block markers if they exist
    textres = textres.replace(/```json\s*/, '').replace(/```\s*$/, '');
    
    // Try to parse the cleaned response
    try {
      const parsedJson = JSON.parse(textres);
      // If successful, send the parsed JSON directly
      res.json({ textres: parsedJson });
    } catch (e) {
      // If it still fails to parse, log the error and send the raw text
      console.log("Error parsing AI response:", e);
      console.log("Raw response:", textres);
      res.json({ textres });
    }
  } catch (error) {
    console.error("AI analysis error:", error);
    res.status(500).json({ message: "Failed to analyze text" });
  }
}