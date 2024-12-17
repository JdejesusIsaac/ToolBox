// app/api/analyze-gaps/route.ts
import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';


const client = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY || '')

export async function POST(request: Request) {
  try {
    const { studentResponses, gradeLevel, subject } = await request.json();

    // Enhanced input validation
    if (!studentResponses) {
      return NextResponse.json(
        { error: 'Student responses are required' },
        { status: 400 }
      );
    }

    if (!gradeLevel) {
      return NextResponse.json(
        { error: 'Grade level is required' },
        { status: 400 }
      );
    }

    if (!subject) {
      return NextResponse.json(
        { error: 'Subject is required' },
        { status: 400 }
      );
    }

    // Validate content
    if (typeof studentResponses !== 'string' || studentResponses.trim() === '') {
      return NextResponse.json(
        { error: 'Student responses must be a non-empty string' },
        { status: 400 }
      );
    }

    const response = await client.chatCompletion({
      model: "mistralai/Mistral-Nemo-Instruct-2407",
      messages: [
        {
          role: "user",
          content: `You are an educational expert analyzing student responses:

# Input:
Grade Level: ${gradeLevel}
Subject: ${subject}

Student Question-Response Pairs:
${studentResponses}

# Instructions:
## Step 1: Initial Analysis
Analyze each question-response pair and identify:
- Key concepts being tested
- Student's understanding level
- Specific errors or misconceptions

## Step 2: Gap Categorization
Categorize identified gaps into:
1. Content Gaps (Missing foundational knowledge)
2. Skill Gaps (Difficulty applying concepts)
3. Comprehension Gaps (Misunderstandings)

## Step 3: Generate Recommendations
Provide specific recommendations for:
a) Learning Resources
b) Teaching Strategies
`
        }
      ],
      max_tokens: 1024,
      temperature: 0.7,
    });

    if (!response.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from AI model');
    }

    // Parse the response into structured format
    const analysisText = response.choices[0].message.content;
    const analysis = parseAnalysis(analysisText);

    return NextResponse.json({ 
      analysis,
      status: 'success'
    });

  } catch (error) {
    console.error('Gap analysis error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze learning gaps',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function parseAnalysis(text: string) {
  return {
    contentGaps: extractSection(text, "Content Gaps"),
    skillGaps: extractSection(text, "Skill Gaps"),
    comprehensionGaps: extractSection(text, "Comprehension Gaps"),
    recommendations: {
      resources: extractSection(text, "Learning Resources"),
      strategies: extractSection(text, "Teaching Strategies"),
    }
  };
}

function extractSection(text: string, sectionName: string): string[] {
  const section = text.split(sectionName)[1]?.split('\n') || [];
  return section
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.trim().substring(1).trim());
}