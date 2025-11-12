import { GraphQLClient, gql } from "graphql-request";

// GraphQL client
const graphQLClient = new GraphQLClient("https://api.github.com/graphql", {
headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
},
});

// Get ISO string for today and 7 days ago
function getLast7DaysRange() {
const to = new Date();
const from = new Date();
from.setDate(to.getDate() - 7);

return {
    from: from.toISOString(),
    to: to.toISOString(),
};
}

// Fetch contributions for last 7 days
export async function getWeeklyContributions() {
if (!process.env.GITHUB_USERNAME) throw new Error("GITHUB_USERNAME not set");

const { from, to } = getLast7DaysRange();

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

const variables = {
    login: process.env.GITHUB_USERNAME,
    from,
    to,
};

try {
    const data = await graphQLClient.request(query, variables);
    // Flatten weeks -> days
    return data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
    (week: any) => week.contributionDays
    );
} catch (err) {
    console.error("GraphQL Error:", err);
    return [];
}
}
