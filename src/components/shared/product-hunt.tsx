"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "../ui/button";
import { Icons } from "./icons";

export default function ProductHunt() {
    const [isVisible, setIsVisible] = useState<boolean>(true)
    if(!isVisible) {
        return null;
    }
    return (
        <div className="fixed z-50 left-5 bottom-5  w-[300px] p-4 flex flex-col rounded-md border border-gray-2 bg-gray-3">
            <Image src='/_static/product-hunt.webp' alt="Product Hunt" width={100} height={100} />
            <div>
                <p className="font-medium">We're live on Product Hunt!</p>
                <Link href="https://www.producthunt.com/posts/nucelo?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-nucelo" className="text-sm underline hover:text-secondary transition-colors underline-offset-2 text-gray-4">Join the conversation and help us. ↗</Link>
            </div>
            <Button size="icon" className="absolute right-4 top-4" onClick={() => setIsVisible(false)}>
                <Icons.x size={15}  />
            </Button>
        </div>
    )
}