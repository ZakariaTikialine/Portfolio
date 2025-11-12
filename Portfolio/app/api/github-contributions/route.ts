import { NextResponse } from "next/server";
import { GraphQLClient, gql } from "graphql-request";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

export async function GET() {
if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
    return NextResponse.json({ error: "GITHUB_TOKEN or GITHUB_USERNAME not set" }, { status: 500 });
}

const graphQLClient = new GraphQLClient("https://api.github.com/graphql", {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
});

const today = new Date();
const from = new Date();
from.setDate(today.getDate() - 6); // last 7 days including today

const query = gql`
    query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
            weeks {
            contributionDays {
                date
                contributionCount
            }
            }
        }
        }
    }
    }
`;

const variables = { login: GITHUB_USERNAME, from: from.toISOString(), to: today.toISOString() };

try {
    const data = await graphQLClient.request(query, variables);
    const flatDays = data.user.contributionsCollection.contributionCalendar.weeks
    .flatMap((week: any) => week.contributionDays)
    .map((day: any) => ({
        date: new Date(day.date).toISOString().split("T")[0], // keep ISO date
        commits: day.contributionCount,
    }));

    // Generate last 7 dates
    const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - 6 + i);
    const isoDate = d.toISOString().split("T")[0];
    const dayData = flatDays.find((f: any) => f.date === isoDate);
    return {
        date: d.toLocaleDateString("en-US", { weekday: "short" }),
        commits: dayData ? dayData.commits : 0,
        lines: Math.floor(Math.random() * 50 + 10),
    };
    });

    return NextResponse.json(last7Days);
} catch (err) {
    console.error("GitHub API Error:", err);
    return NextResponse.json({ error: "Failed to fetch contributions" }, { status: 500 });
}
}