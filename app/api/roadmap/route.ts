// import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { generateText } from "ai";
import { google } from "@ai-sdk/google";


// Initialize the Google AI client
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { projectDescription } = await request.json();
    console.log(projectDescription);

    if (!projectDescription) {
      return NextResponse.json(
        { error: 'Project description is required' },
        { status: 400 }
      );
    }

    const result = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `You are a technical project planning expert. Your task is to validate the project description and either:
1. Return a JSON roadmap if it's a valid technical project, or
2. Return a simple error message if it's not a valid technical project.

First, validate if the project description is:
- A technical project (not creative works like stories, poems, or art)
- Something that can be broken down into technical milestones
- Something that requires programming/development

If the project is NOT valid, return ONLY this exact message:
"I'm sorry, but I can only help with technical projects that involve programming or development. Please describe a project that can be broken down into technical milestones."

If the project IS valid, create a detailed roadmap with 5 milestones and return it as a JSON object with this structure:
{
  "milestones": [
    {
      "title": "Milestone 1",
      "description": "Detailed description of what will be accomplished",
      "tools": ["List of tools/libraries/APIs"],
      "dependencies": ["List of dependencies or setup requirements"]
    },
    // ... repeat for all 5 milestones
  ]
}

Project Description: ${projectDescription}

Make sure each milestone builds upon the previous one in terms of complexity and functionality.`,
    });
    console.log(result)

    // Check if the response is an error message
    const responseText = result.text.trim();
    if (responseText.startsWith("I'm sorry")) {
      return NextResponse.json(
        { error: responseText },
        { status: 400 }
      );
    }

    // Remove markdown code block formatting and parse JSON
    const jsonString = responseText.replace(/```json\n|\n```/g, '');
    const roadmap = JSON.parse(jsonString);

    return NextResponse.json(roadmap);
  } catch (error) {
    console.error('Error generating roadmap:', error);
    return NextResponse.json(
      { error: 'Failed to generate roadmap' },
      { status: 500 }
    );
  }
} 