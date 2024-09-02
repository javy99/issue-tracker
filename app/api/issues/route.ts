import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json({ errors: validation.error.errors }, { status: 400 });

    const newIssue = await prisma.issue.create({
        data: {
            title: validation.data.title,
            description: validation.data.description,
        },
    });

    return NextResponse.json(newIssue, { status: 201 });
}