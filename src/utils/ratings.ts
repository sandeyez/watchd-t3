export const ratings = [
    {
        label: "Shitshow",
        emoji: "💩",
        key: 1,
        inline: "a shitshow",
    },
    {
        label: "Meh...",
        emoji: "😕",
        key: 2,
        inline: "meh",
    },
    {
        label: "Okay-ish",
        emoji: "🤷‍♀️",
        key: 3,
        inline: "okay-ish",
    },
    {
        label: "Good one",
        emoji: "🍿",
        key: 4,
        inline: "a good one",
    },
    {
        label: "Iconic",
        emoji: "👑",
        key: 5,
        inline: "iconic",
    },
];

export const ratingsMap = new Map(
    ratings.map(({ key, ...values }) => [key, values]),
);
