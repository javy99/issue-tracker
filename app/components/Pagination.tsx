import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount <= 1) return null;

    return (
        <Flex align="center" gap="2">
            <Text size="2">Page {currentPage} of {pageCount}</Text>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === 1}
                style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
                <DoubleArrowLeftIcon />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === 1}
                style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
                <ChevronLeftIcon />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === pageCount}
                style={{ cursor: currentPage === pageCount ? 'not-allowed' : 'pointer' }}
            >
                <ChevronRightIcon />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === pageCount}
                style={{ cursor: currentPage === pageCount ? 'not-allowed' : 'pointer' }}
            >
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}



export default Pagination