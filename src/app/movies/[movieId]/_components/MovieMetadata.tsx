"use client"

import { motion } from "framer-motion";
import Tag from "~/app/_components/Tag";

type MovieMetadataProps = {
    title: string;
    tagline: string;
    releaseDate: Date;
    genres: {id: number, name: string}[];
}

export default function MovieMetadata({genres, releaseDate, title, tagline}: MovieMetadataProps) {    
    return (
        <div className="flex flex-col justify-end text-sm">
        <h1 className="gradient-text text-3xl font-bold">{title}</h1>

        <span className="italic font-extralight">&quot;{tagline}&quot;</span>
        <motion.div className="group flex gap-1 w-full" initial='initial' animate='initial' whileHover={'animate'}>
            <motion.span variants={{
                initial: {
                    width: 0
                },
                animate: {
                    width: 'fit-content'
                }
            }} className="w-0 text-nowrap group-hover:w-fit overflow-hidden">{releaseDate.getDate()} {releaseDate.toLocaleString('en-US', {month: 'long'})}</motion.span>
            <span className="h-fit">{releaseDate.getFullYear()}</span>
        </motion.div>

        <div className="flex gap-2 items-center pt-2">
            {genres.slice(0, 3).map(genre => (
                <Tag key={genre.id}>{genre.name}</Tag>
            ))}
        </div>
    </div>
    )
}