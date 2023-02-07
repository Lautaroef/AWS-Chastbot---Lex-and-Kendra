type Conversation = {
  message: string;
  by: string;
  date: string;
};

type APIResponse = {
  statusCode: number;
  message: string;
  transmitter: string;
};

type LambdaResponse = {
  answer: string;
  transmitter: "Lex" | "Kendra" | "Server";
};
