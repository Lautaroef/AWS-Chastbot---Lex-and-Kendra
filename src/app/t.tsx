const AWS = require("aws-sdk");

const lex = new AWS.LexRuntimeV2();
const kendra = new AWS.Kendra();

// Function for calling Lex services and returning the message
const getLexResponse = async (lexParams) => {
  const lexResponse = await lex.postText(lexParams).promise();

  const failed = lexResponse.sessionState.intent.state === "Failed";
  const answer = lexResponse.messages[0].content;

  if (!failed && answer) {
    return {
      transmitter: "Lex",
      answer,
    };
  }

  return null;
};

exports.handler = async (event) => {
  const parsedBody = JSON.parse(event.body);

  const question = parsedBody.question;
  const sessionId = parsedBody.sessionId;

  if (question.length < 2) {
    return "Please enter a valid question";
  }

  try {
    // First, attempt to use Amazon Lex to answer the question
    const lexParams = {
      botId: "UOI2YOMYMR",
      botAliasId: "TSTALIASID",
      localeId: "en_US",
      sessionId,
      text: question, // "What is the capital of Argentina?"
    };

    const lexResult = await getLexResponse(lexParams);
    if (lexResult) {
      return lexResult;
    }

    // If Amazon Lex was not able to fulfill the question, attempt to use Amazon Kendra
    const kendraParams = {
      IndexId: "34b53faa-8c85-43e0-a629-337be10f49e9",
      QueryText: question,
      QueryResultTypeFilter: "QUESTION_ANSWER", // DOCUMENT | QUESTION_ANSWER | ANSWER
    };

    const kendraResponse = await kendra.query(kendraParams).promise();

    if (kendraResponse.ResultItems.length > 0) {
      const answer = kendraResponse.ResultItems[0].DocumentExcerpt.Text;
      return {
        transmitter: "Kendra",
        answer,
      };
    }

    // If neither Amazon Lex nor Amazon Kendra were able to answer the question, return an error message
    return "Can't find an answer to that";
  } catch (error) {
    // Return the error message
    return error;
  }
};

/*

const AWS = require('aws-sdk');

const lex = new AWS.LexRuntimeV2();

// Function for calling Lex services and returning the message
const getLexOrKendraResponse = async (lexParams) => {
  const lexResponse = await lex.recognizeText(lexParams).promise();


  const failed = lexResponse.sessionState.intent.state === "Failed";
  const answer = lexResponse.messages[0].content;
  
  if (!failed && answer) {
    return {
      transmitter: "Lex",
      answer,
    };
  }
};

exports.handler = async (event) => {
  const parsedBody = JSON.parse(event.body);
  
  const question = parsedBody.question;
  const sessionId = parsedBody.sessionId;

  
  if (question.length < 2){
    return 'Please enter a valid question';
  }
 
  try {
    // First, attempt to use Amazon Lex to answer the question
    const lexParams = {
      botId: "UOI2YOMYMR",
      botAliasId: "TSTALIASID",
      localeId: "en_US",
      sessionId,
      text: question, // "What is the capital of Argentina?"
    };

    return await getLexOrKendraResponse(lexParams);
  } catch (error) {
    // If Amazon Lex was not able to fulfill the question, return an error message
    return "Can\'t find an answer to that";
  }
};

*/
