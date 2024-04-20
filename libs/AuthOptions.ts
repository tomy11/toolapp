import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/libs/prisma';
import bcrype from 'bcrypt';

export const authOptions: AuthOptions = {
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label:"Email", type: "email"},
                password: { label: "Password", type: "password"}
            },
            async authorize(data): Promise<any> {

                if(!data?.email || !data.password){
                    throw new Error("Missing credentials");
                }

                const user = await prisma.user.findFirst({
                    where: {
                        email: data.email
                    }
                })

                if(!user || !user.id || !user.password){
                    throw new Error("Invalid credentials");
                }

                const currenHashPassword = await bcrype.compare(data.password, user.password);

                if(!currenHashPassword){
                    throw new Error("Invalid credentials");
                }

                return user;
            },
        })
    ],
    secret: "qOOuEe3xet9YLHkrbxqUwYAIpMYnmBsg",
    session: { strategy: 'jwt' },
    debug: process.env.NODE_ENV != 'production'
}