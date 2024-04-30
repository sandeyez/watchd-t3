"use client";

import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

type EmojiSelectProps = {
    options: Array<{
        label: string;
        emoji: string;
        key: number;
    }>;
    value: number | null;
    onChange: (key: number | null) => void;
};

function EmojiSelect({
    options,
    onChange,
    value,
}: EmojiSelectProps): JSX.Element {
    return (
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
            {options.map(({ label, emoji, key }) => (
                <motion.button
                    key={label}
                    className={cn(
                        "flex h-24 min-w-24 flex-col items-center justify-center gap-4 rounded-lg border-2 border-tertiary bg-primary p-2 transition-colors duration-150",
                        {
                            "bg-tertiary font-bold": value === key,
                        },
                    )}
                    onClick={() =>
                        key === value ? onChange(null) : onChange(key)
                    }
                    whileHover={{ scale: 1.1 }}
                    type="button"
                >
                    <span role="img" className="text-2xl">
                        {emoji}
                    </span>
                    <span className="text-sm">{label}</span>
                </motion.button>
            ))}
        </div>
    );
}

export default EmojiSelect;
