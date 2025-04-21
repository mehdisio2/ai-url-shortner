import OpenAI from 'openai'
import dotenv from 'dotenv'
import { response } from 'express';

dotenv.config({ path: '/home/mahdi/Documents/Projects/ai-url-shortner/backend/.env' });

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',  
    apiKey: process.env.AI_KEY,  
  });


const generateSmrtUrl = async (url, description) => {
    const prompt = {role:'user', 
        content:`Suggest a short, human-readable aliases for the following website:
            url: ${url},
            description: ${description},
        `}

    const completion = await openai.chat.completions.create({
        model: 'google/learnlm-1.5-pro-experimental:free',
        messages: [
          {
            role: 'system',
            content: `You generate clean, very very short, very very unique, 
            you can include some numbers or simple symbols to make the alias more unique,
             SEO-friendly URL aliases only and 
            you don't write any descriptions or explations just aliases`
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
                    tags: {
                      type: 'array',
                      description: 'Optional tags related to the alias, such as topic or category',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                  required: ['alias'],
                },
              },
            },
            required: ['aliases'],
            additionalProperties: false,
          },
        }       
      }
})

    const aliases = completion.choices[0].message.content;
    return JSON.parse(aliases);

}

const aliases = await generateSmrtUrl('https://myblog.com/article/123', 'This is a blog post about cybersecurity and its relation with ai on human life do not give me this alias: cyber-ai-life');
console.log(aliases.aliases[0].alias);