import prisma from '@/prisma/client'
import IssueActions from './IssueActions'
import { Status } from '@prisma/client'
import Pagination from '@/app/components/Pagination'
import IssueTable, { columnNames, IssueQuery } from './IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

interface Props {
    searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
    const statuses = Object.values(Status)
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;

    const orderBy: Record<string, string> | undefined = columnNames
        .includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: 'asc' }
        : undefined;

    const where = { status };

    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const issues = await prisma.issue.findMany({
        where,
        orderBy: orderBy || { createdAt: 'asc' },
        skip: (page - 1) * pageSize,
        take: pageSize
    });

    const issueCount = await prisma.issue.count({ where })

    return (
        <Flex direction="column" gap="3">
            <IssueActions />
            <IssueTable searchParams={searchParams} issues={issues} />
            <Pagination
                itemCount={issueCount}
                pageSize={pageSize}
                currentPage={page}
            />
        </Flex>
    )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: "Issue Tracker - Issues List",
    description: "Browse and manage project issues. Filter by status and sort to view issues as needed.",
    keywords: "issues, issue tracker, project management, issue list, pagination",
    authors: [
        {
            name: "Javlonbek Kosimov",
            url: "https://javy-kosimov.vercel.app/"
        }
    ],
    viewport: "width=device-width, initial-scale=1.0",
    robots: "index, follow",
};


export default IssuesPage