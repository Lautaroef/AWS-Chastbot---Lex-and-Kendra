"use client";
import * as AWS from "aws-sdk";
import AWS_CONFIG from "../config/aws";

import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Chatbot from "./components/home/Chatbot";
import Help from "./components/home/help";

// Set the AWS credentials
AWS.config.region = AWS_CONFIG.region;
AWS.config.credentials = new AWS.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
});

function App() {
  const date = new Date();
  const [inputValue, setInputValue] = useState<string>("");
  const [conversation, setConversation] = useState([
    {
      message: "👋 Welcome to the chat! Ask me a question.",
      by: "Lex",
      date: date.toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sessionId = new Date().getTime().toString();
  const inputRef = useRef<HTMLInputElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of conversation window on new message
  useEffect(() => {
    conversationRef.current?.scrollTo(0, conversationRef.current?.scrollHeight);
  }, [conversation]);

  const pushConversation = (conversation: Conversation) => {
    setConversation((prev) => [...prev, conversation]);
  };

  // Call the Lambda function from my API to get the response from Lex or Kendra
  const getResponse = async (question: string) => {
    const params = {
      question,
      sessionId,
    };

    setIsLoading(true);
    const { data }: { data: APIResponse } = await axios
      .get("/api/get-lambda-response", {
        params,
      })
      .finally(() => setIsLoading(false));

    return data;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate input
    if (!inputValue) {
      return inputRef.current?.focus();
    }
    if (inputValue.length < 2) {
      return pushConversation({
        message: "Please enter a valid question",
        by: "Lex",
        date: date.toISOString(),
      });
    }

    // Add the user's question to the conversation
    pushConversation({
      message: inputValue,
      by: "You",
      date: date.toISOString(),
    });

    // Call the Lambda function to get the response from Lex or Kendra
    getResponse(inputValue).then((data) => {
      pushConversation({
        message: data.message,
        by: data.transmitter,
        date: date.toISOString(),
      });
    });
    setInputValue("");
    inputRef.current?.focus();
  };
  return (
    <main className="container">
      <div className="chat-container">
        <div className="chat-header">
          <h3>Chatbot with Lex and Kendra</h3>
        </div>
        <Chatbot
          conversation={conversation}
          onSubmit={onSubmit}
          inputValue={inputValue}
          setInputValue={setInputValue}
          isLoading={isLoading}
          inputRef={inputRef}
          conversationRef={conversationRef}
        />
      </div>
      <Help />
    </main>
  );
}

export default App;
