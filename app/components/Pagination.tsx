'use client'

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount <= 1) return null;

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push('?' + params.toString());
    }

    return (
        <Flex align="center" gap="2">
            <Text size="2">Page {currentPage} of {pageCount}</Text>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === 1}
                style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                onClick={() => changePage(1)}
            >
                <DoubleArrowLeftIcon />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === 1}
                style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                onClick={() => changePage(currentPage - 1)}
            >
                <ChevronLeftIcon />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === pageCount}
                style={{ cursor: currentPage === pageCount ? 'not-allowed' : 'pointer' }}
                onClick={() => changePage(currentPage + 1)}
            >
                <ChevronRightIcon />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === pageCount}
                style={{ cursor: currentPage === pageCount ? 'not-allowed' : 'pointer' }}
                onClick={() => changePage(pageCount)}
            >
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}



export default Pagination