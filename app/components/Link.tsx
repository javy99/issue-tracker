import NexLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface Props {
    href: string
    children: React.ReactNode
}

const Link = ({ href, children }: Props) => {
    return (
        <NexLink href={href} passHref legacyBehavior>
            <RadixLink>{children}</RadixLink>
        </NexLink>
    )
}

export default Link