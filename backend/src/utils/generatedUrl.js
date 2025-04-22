import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config({ path: '/home/mahdi/Documents/Projects/ai-url-shortner/backend/.env' });

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',  
    apiKey: process.env.AI_KEY,  
  });


export const generateSmrtUrl = async (url, description) => {
    const prompt = {role:'user', 
        content:`Suggest a 3 short, human-readable aliases for the following website:
            url: ${url},
            description: ${description},
        `}

    const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.5-flash-preview:thinking',
        messages: [
          {
            role: 'system',
            content: `You generate clean,3-10 characheters, short, unique,
             SEO-friendly URL aliases`
          },
          prompt
        ],          
        response_format: {   
        type: 'json_schema',
        json_schema: {
          name: 'alias_suggestions',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              aliases: {
                type: 'array',
                description: 'List of suggested URL aliases',
                items: {
                  type: 'object',
                  properties: {
                    alias: {
                      type: 'string',
                      description: 'A short, clean, human-readable alias for the given URL or content',
                    },
                    score: {
                      type: 'number',
                      description: 'Confidence or quality score for the alias (0 to 1)',
                    },
                  },
                  required: ['alias'], // u can add the score to be required.
                },
              },
            },
            required: ['aliases'],
            additionalProperties: false,
          },
        }       
      }
})

    const {aliases} = JSON.parse(completion.choices[0].message.content);
    return aliases;

}

