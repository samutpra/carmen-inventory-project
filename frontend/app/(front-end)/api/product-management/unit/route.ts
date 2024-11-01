import { NextResponse } from 'next/server'
import { UnitSchema } from "@/lib/types"


export async function POST(request: Request) {
    try {
        const body = await request.json()
        const result = UnitSchema.safeParse(body)

        console.log('API Route result', result)

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.errors[0].message },
                { status: 400 }
            )
        }
        return NextResponse.json({
            success: true,
            data: {
                message: 'Form submitted successfully',
                receivedData: result.data
            }
        })
    } catch (error) {
        console.error('API Route Error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}