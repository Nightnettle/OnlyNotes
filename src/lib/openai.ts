import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function generateImagePrompt(name: string): Promise<string> {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4.1',
            messages: [
                {
                    role: 'system',
                    content: "You are a creative and helpful AI assistant capable of generating intersting thumbnail descriptions for my notes. Your output will be fetched into the DALLE API to generate a thumbnail. The description should be minimalistic and flat-styled."
                },
                {
                    role: 'user',
                    content: `Generate a thumbnail description for my notebook titled ${name}`
                }
            ]
        })
        const image_desc = response.choices[0]?.message?.content
        return image_desc?.trim() || "Minimalistic notebook thumbnail"
    } catch (error) {
        console.log("Error generating image prompt:", error)
        throw error
    }
}

export async function generateImage(image_desc: string): Promise<string> {
    try {
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: image_desc,
            n: 1,
            size: "256x256",
            response_format: "b64_json"
        })

        const b64 = response.data?.[0]?.b64_json

        if (!b64) {
            throw new Error("No image data returned from OpenAI")
        }
        return b64
    } catch (error) {
        console.error("Image generation failed:", error)
        throw error
    }
}