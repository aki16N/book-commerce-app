import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// 購入履歴の保存
export async function POST(request: Request, response: Response) {
    const { sessionId } = await request.json();

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const userId = session.client_reference_id;
        const bookId = session.metadata?.bookId;

        if (!userId || !bookId) {
            return NextResponse.json({ error: "ユーザーIDまたは書籍IDが見つかりません。" }, { status: 400 });
        }

        const existingPurchase = await prisma.purchase.findFirst({
            where: {
                userId: userId,
                bookId: bookId,
            },
        });

        if (!existingPurchase) {
            const purchase = await prisma.purchase.create({
                data: {
                    userId: userId,
                    bookId: bookId,
                }
            });

            return NextResponse.json({ purchase });
        } else {
            return NextResponse.json({ message: "すでに購入済みです。" })
        }
    } catch (err) {
        return NextResponse.json(err);
    }
}