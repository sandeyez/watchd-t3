import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PersonPlaceholderProps = {
    className?: string;
};

function PersonPlaceholder({ className }: PersonPlaceholderProps): JSX.Element {
    return (
        <div className={`${className} aspect-square rounded-full bg-secondary`}>
            <FontAwesomeIcon
                icon={faCircleUser}
                className="text-tertiary h-full w-full"
            />
        </div>
    );
}

export default PersonPlaceholder;
