import AWS from "aws-sdk";
import AWS_CONFIG from "@/config/aws";
import Reports from "./ReportsTable";

// AWS.config.region = AWS_CONFIG.region;
// AWS.config.credentials = new AWS.Credentials({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
// });

const getLexUtterances = async () => {
  const lexModelsV2 = new AWS.LexModelsV2({
    apiVersion: "2020-08-07",
    region: AWS_CONFIG.region,
  });

  const params: AWS.LexModelsV2.Types.ListAggregatedUtterancesRequest = {
    botId: "UOI2YOMYMR",
    botAliasId: "TSTALIASID",
    localeId: "en_US",
    sortBy: {
      attribute: "MissedCount", // "HitCount" | "MissedCount"
      order: "Descending", // "Ascending" | "Descending"
    },
    aggregationDuration: {
      relativeAggregationDuration: {
        timeDimension: "Weeks", // "Hours" | "Days" | "Weeks"
        timeValue: 2, // Max weeks is 2, max available data is 15 days.
      },
    },
    // nextToken: undefined,
  };

  const data = await lexModelsV2.listAggregatedUtterances(params).promise();

  return data as AWS.LexModelsV2.Types.ListAggregatedUtterancesResponse;
};

export default async function Page() {
  const data = await getLexUtterances();

  const utterances = data.aggregatedUtterancesSummaries ?? [];

  return <Reports data={utterances} />;
}
