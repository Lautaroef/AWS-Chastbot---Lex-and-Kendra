import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse<APIResponse>) {
  try {
    const question = req.query.question as string;
    const sessionId = req.query.sessionId as string;

    const { data }: { data: LambdaResponse } = await axios.post(
      "https://uvxo57q5oyqxni2jamw6ojrl6e0jmzkg.lambda-url.us-east-1.on.aws/",
      {
        question,
        sessionId,
      }
    );

    console.log(data);

    res.status(200).json({
      statusCode: 200, //data.statusCode
      message: data.answer,
      transmitter: data.transmitter,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      message: "Error: " + error.message + ", see console for more details",
      transmitter: "Server",
    });
  }
}

// function extractAnswerFromText(text: string, target: string) {
//   const normalizedText = text.toLowerCase();
//   const normalizedTarget = target.toLowerCase();

//   const lines = normalizedText.split("\n");

//   let result = "";

//   for (let i = 0; i < lines.length; i++) {
//     if (lines[i].includes(normalizedTarget)) {
//       result = lines[i + 2];
//       break;
//     }
//   }

//   // return the answer with the first letter capitalized
//   return result.charAt(0).toUpperCase() + result.slice(1);
// }
