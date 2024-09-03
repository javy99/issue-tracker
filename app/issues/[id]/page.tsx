import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import AuthProvider from '@/app/auth/Provider'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'
import { Metadata } from 'next'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
    const session = await getServerSession(authOptions);

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: '1', sm: '5' }} gap="5">
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            {session && (
                <Box>
                    <Flex direction="column" gap="4">
                        <AssigneeSelect issue={issue} />
                        <EditIssueButton issueId={issue.id} />
                        <DeleteIssueButton issueId={issue.id} />
                    </Flex>
                </Box>
            )}
        </Grid>
    )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue) {
        return {
            title: "Issue Tracker - Issue Not Found",
            description: "The issue you are looking for does not exist.",
            viewport: "width=device-width, initial-scale=1.0",
            robots: "noindex, nofollow",
        };
    }

    return {
        title: `Issue Tracker - ${issue.title || 'Issue Details'}`,
        description: issue.description || 'View detailed information about the issue.',
        authors: [
            {
                name: "Javlonbek Kosimov",
                url: "https://javy-kosimov.vercel.app/"
            }
        ],
        viewport: "width=device-width, initial-scale=1.0",
        robots: "index, follow",
    }
}

export default IssueDetailPage