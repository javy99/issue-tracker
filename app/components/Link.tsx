import { Link as RadixLink } from "@radix-ui/themes";
import NexLink from "next/link";

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