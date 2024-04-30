import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PlaceholderPersonProps = {
    className?: string;
};

export default function PlaceholderPerson({
    className,
}: PlaceholderPersonProps): JSX.Element {
    return (
        <div className={`${className} aspect-square rounded-full bg-secondary`}>
            <FontAwesomeIcon
                icon={faCircleUser}
                className="h-full w-full text-tertiary"
            />
        </div>
    );
}
