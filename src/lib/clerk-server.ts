import { createClerkClient } from '@clerk/backend'

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY
})

export async function getUser(userId: string) {
    if (!userId) {
        return null
    }

    return await clerkClient.users.getUser(userId)
}