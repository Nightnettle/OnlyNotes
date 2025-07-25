// /api/completion
import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
    // extract prompt from body
    const {prompt}: {prompt: string} = await req.json()

    const result = streamText({
        model: openai('gpt-4'),
        messages: [
            {
                role: 'system',
                content: 'You are a helpful AI embedded in a notion text editor app that is used to autocomplete sentences. The traits of AI include expert knowledge, helpfulness, cleverness and articulateness. AI is well-behaved and well-mannered individual. AI is always friendly, kind and inspiring, and is eager to provide vivid and thoughtful responses to the user. ',
            },
            {
                role: 'user',
                content: `I am writing a piece of text in a notion text editor app. Help me complete my train of thought here: ##${prompt}##. Keep the tone of the text consistent with the rest of the text. Keep responses short and sweet.`
            }
        ]
    })

    return result.toDataStreamResponse()
}