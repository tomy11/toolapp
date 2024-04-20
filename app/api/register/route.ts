import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import bcrypt from 'bcrypt';


export async function POST(req: Request){
    try {
        const body = await req.json();
        const { email, password } = body;
        if(!email || !password){
            return new NextResponse("Missing data", { status: 500 })
        }

        const userAlreadyExit = await prisma.user.findFirst({ where: { email: email }});

        if(userAlreadyExit?.id){
            return new NextResponse("User already exit", { status: 500 })
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashPassword,
            }
        })

        return NextResponse.json(newUser);

    } catch (error: any) {
        console.log("Register_err: " + error);
        return new NextResponse(error, { status: 500 })
    }
}