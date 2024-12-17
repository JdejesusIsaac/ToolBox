// app/api/generate-quiz/route.ts
import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

// Initialize Hugging Face client
const client = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY || '')

export async function POST(request: Request) {
    try {
      const { topic, numSlides } = await request.json();
  
      // Input validation
      if (!topic || !numSlides) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }
  
      const response = await client.chatCompletion({
        model: "mistralai/Mistral-Nemo-Instruct-2407",
        messages: [
          {
            role: "user",
            content: `As a presentation expert, generate a ${numSlides}-slide presentation on the topic: "${topic}".
          
            Format each slide as follows:
            1. Slide Title
            2. Slide Content (brief bullet points or paragraphs, tailored for a professional audience)
            
            Ensure the presentation is:
            - Concise and engaging
            - Visually structured (use markdown formatting)
            - Professional in tone
            - Logically organized
            - Contains clear transitions between slides
            
            `
          }
        ],
        max_tokens: 1024,
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.15,
      });
  
      if (!response.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format');
      }
  
      return NextResponse.json({ 
        slides: response.choices[0].message.content,
        status: 'success'
      });
  
    } catch (error) {
      console.error('Slide generation error:', error);
      return NextResponse.json(
        { 
          error: 'Failed to generate slides',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  }