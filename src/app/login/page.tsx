import { getServerAuthSession } from "~/server/auth";
import GoogleButton from "./_components/GoogleButton/GoogleButton";
import { permanentRedirect } from "next/navigation";

export default async function Login() {
    const session = await getServerAuthSession();

    if (session) {
        permanentRedirect("/");
    }

    return (
        <div>
            <GoogleButton />
        </div>
    );
}
