import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config({ path: '/home/mahdi/Documents/Projects/ai-url-shortner/backend/.env' });

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',  
    apiKey: process.env.AI_KEY,  
  });


const generateSmrtUrl = async (originalUrl, description) => {
    const prompt = {role:'user', 
        content:`Suggest a short, human-readable alias for the following URL:
            original-url: ${originalUrl},
            description: ${description},
        `}

    const completion = await openai.chat.completions.create({
        model: 'mistralai/mistral-small-3.1-24b-instruct:free',
        messages: [
          {
            role: 'system',
            content: `You generate clean, unique, SEO-friendly URL aliases.`
          },
          prompt
        ],
    
      });
    
      return completion.choices[0].message;
}

const aliase = await generateSmrtUrl('https://myblog.com/article/123', 'This is a blog post about AI and productivity')
console.log(aliase);