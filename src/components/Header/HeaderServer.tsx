"use server";

import Header from "./Header";
import { currentUser } from "@clerk/nextjs/server";
import { calculateWinRate, syncUser } from "@/actions/user.action";

export default async function HeaderServer() {
    const stats = await calculateWinRate()
    console.log(stats)

    const user = await currentUser();
    if(user) await syncUser();

    return <Header />
}