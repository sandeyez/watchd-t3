"use client";

import { signIn } from "next-auth/react";

function GoogleButton(): JSX.Element {
    return (
        <button onClick={() => signIn("google")}>Sign in with Google</button>
    );
}

export default GoogleButton;
