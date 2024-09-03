import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: 'OPEN' } }),
    prisma.issue.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.issue.count({ where: { status: 'CLOSED' } }),
  ]);

  const statusCounts = { open, inProgress, closed };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary {...statusCounts} />
        <IssueChart {...statusCounts} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a comprehensive summary of project issues, including their status and trends.",
  keywords: "issue tracker, project management, issue summary, project issues, dashboard",
  authors: [
    {
      name: "Javlonbek Kosimov",
      url: "https://javy-kosimov.vercel.app/"
    }
  ],
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
};
