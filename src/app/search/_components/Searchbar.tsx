/* eslint-disable react-hooks/exhaustive-deps */
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { Input } from "~/app/_components/Input";
import { cn } from "~/lib/utils";

const placeholderMovies = [
    "The Shawshank Redemption",
    "Iron Man",
    "Titanic",
    "The Godfather",
    "Star Wars",
    "Jurrasic Park",
    "The Matrix",
    "Forrest Gump",
    "The Dark Knight",
    "Harry Potter",
];

type SearchbarProps = {
    value: string;
    onChange: (query: string) => void;
    loading: boolean;
};

export default function Searchbar({
    value,
    onChange,
    loading,
}: SearchbarProps) {
    const [placeholder, dangerouslySetPlaceholder] = useState("");
    const placeholderRef = useRef(placeholder);

    const [nextPlaceholderIndex, setNextPlaceholderIndex] = useState(
        Math.floor(Math.random() * placeholderMovies.length),
    );
    const [nextPlaceholder, setNextPlaceholder] = useState(
        placeholderMovies[nextPlaceholderIndex],
    );
    const [buildingPlaceholder, setBuildingPlaceholder] = useState(true);

    function setPlaceholder(placeholderValue: string) {
        dangerouslySetPlaceholder(placeholderValue);
        placeholderRef.current = placeholderValue;
    }

    const userHasSearchedRef = useRef(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const queryValue = e.target.value;

        onChange(queryValue);

        if (!userHasSearchedRef.current) {
            userHasSearchedRef.current = true;
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (buildingPlaceholder) {
            interval = setInterval(() => {
                if (userHasSearchedRef.current) return;

                setPlaceholder(
                    nextPlaceholder!.slice(
                        0,
                        placeholderRef.current.length + 1,
                    ),
                );
            }, 100);
        } else {
            interval = setInterval(() => {
                if (userHasSearchedRef.current) return;

                setPlaceholder(
                    placeholderRef.current.slice(
                        0,
                        placeholderRef.current.length - 1,
                    ),
                );
            }, 100);
        }

        return () => clearInterval(interval);
    }, [buildingPlaceholder]);

    useEffect(() => {
        if (buildingPlaceholder && placeholder === nextPlaceholder) {
            setTimeout(() => setBuildingPlaceholder(false), 3000);
        }

        if (!buildingPlaceholder && placeholder === "") {
            const nextIndex =
                (nextPlaceholderIndex + 1) % placeholderMovies.length;

            setNextPlaceholderIndex(nextIndex);
            setNextPlaceholder(placeholderMovies[nextIndex]);
            setTimeout(() => setBuildingPlaceholder(true), 500);
        }
    }, [placeholder]);

    return (
        <motion.div
            className={cn("w-96", {
                "w-full": userHasSearchedRef.current || value.length > 0,
            })}
            layoutId="searchbar"
        >
            <Input
                before={
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="size-4 text-tertiary"
                    />
                }
                placeholder={`Search for ${userHasSearchedRef.current ? "movies" : placeholder}...`}
                className="w-full"
                value={value}
                onChange={handleChange}
                autoFocus
                after={
                    <div className="h-8 w-8 animate-pulse rounded-full bg-red-300" />
                }
            />
        </motion.div>
    );
}
