"use client"

import { Icons } from "@/components/shared/icons"
import Button from "@/components/ui/button"
import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { Preview } from "@/types"
import Image from "next/image"
import { useState } from "react"

export default function PreviewImages() {
    const [preview, setPreview] = useState<Preview>(marketingConfig.previews[0])
    return (
        <div className="flex flex-col">
            <div className="border border-gray-2 rounded-t-md h-[600px] max-md:h-[350px] overflow-hidden">
                <Image
                    src={preview.image}
                    alt={preview.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto"
                    quality={100}
                    priority
                />
            </div>
            <div className="flex flex-col border border-gray-2 p-1 border-t-0 rounded-t-none gap-3 transition-all overflow-hidden rounded-md">
                <div className="grid grid-cols-5 gap-1 max-md:grid-cols-2 max-sm:grid-cols-1">
                    {marketingConfig.previews.map(p => (
                        <Button variant="ghost" size="sm" className={cn("bg-transparent w-full whitespace-nowrap rounded-md gap-2", preview.title === p.title ? "bg-gray-2 text-secondary" : "")} onClick={() => setPreview(p)} key={p.title}>
                            {p.title}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}