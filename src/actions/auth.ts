"use server"

import { prismaClient } from "@/lib/prismaClient"
import { currentUser} from "@clerk/nextjs/server"

export async function onAuthenticateUser() {
    try {
        const user = await currentUser()
        if(!user){
            return{
                status: 403,
                message: "User Not Found"
            }
        }

        const userExists = await prismaClient.user.findUnique({
            where:{
                clerkId: user.id,
            }
        })

        if(userExists){
            return{
                status: 200,
                user: userExists,
            }
        }

        const newUser = await prismaClient.user.create({
            data:{
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: user.firstName + ' ' + user.lastName,
                profileImage: user.imageUrl,
            }
        })

        if(!newUser){
            return{
                status: 500,
                message: 'Failed to create User'
            }
        }

        return{
            status: 201,
            user: newUser
        }
    } catch (error) {
        console.log(error);
        
        return{
            status: 500,
            error: 'Internal Server Error',
        }
    }
}