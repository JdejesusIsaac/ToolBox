// 1. Create API Route
// app/api/generate-quiz/route.ts
import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

// Initialize Hugging Face client
const client = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY || '')
export async function POST(request: Request) {
  try {
    const { curriculum, numQuestions } = await request.json();

    const response = await client.chatCompletion({
      model: "mistralai/Mistral-Nemo-Instruct-2407",
      messages: [
        {
          role: "user",
          content: `As an educational expert, create a ${numQuestions}-question critical thinking and inferencing quiz based on the following curriculum content:

${curriculum}

Format the quiz as follows:
1. Include multiple choice questions (A, B, C, D options)
2. Provide the correct answer after each critical thinking and inferencing question
3. Include a difficulty level tuned to the 6th grade level 
4. Add brief explanations for the correct answers`
        }
      ],
      max_tokens: 1024,
      temperature: 0.7,
      top_p: 0.95,
      repetition_penalty: 1.15,
    });

    return NextResponse.json({ quiz: response.choices[0].message.content });
  } catch (error) {
    console.error('Quiz generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}