import { GoogleGenerativeAI } from "@google/generative-ai"; 


export const analyze = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const {text} = req.body;
  const model = genAI.getGenerativeModel({model: "gemini-pro"});
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

Here is the text to be analyzed:
${text}
`
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const textres = response.text()
  console.log(textres);
  res.json({textres})
}