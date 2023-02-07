import AWS_CONFIG from "@/config/aws";
import AWS from "aws-sdk";

AWS.config.region = AWS_CONFIG.region;
AWS.config.credentials = new AWS.Credentials({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY!,
});

const kendra = new AWS.Kendra();

function Kendra() {
  // Call the kendra service, it had as a data source a faq document in S3
  const params: AWS.Kendra.Types.QueryRequest = {
    IndexId: "34b53faa-8c85-43e0-a629-337be10f49e9",
    QueryText: "What brand of beer does Homer Simpson drink?",
    QueryResultTypeFilter: "QUESTION_ANSWER",
  };

  kendra
    .query(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    })
    .promise();
  return (
    <div>
      <h1>Kendra</h1>
    </div>
  );
}

export default Kendra;
