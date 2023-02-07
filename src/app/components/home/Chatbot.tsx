"use client";
import { useRef } from "react";
import dayjs from "dayjs";

type Props = {
  conversation: Conversation[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  conversationRef: React.RefObject<HTMLDivElement>;
};

function Chatbot({
  conversation,
  onSubmit,
  inputValue,
  setInputValue,
  isLoading,
  inputRef,
  conversationRef,
}: Props) {
  return (
    <>
      <div className="chat-messages" ref={conversationRef}>
        {conversation.map(({ message, date, by }, i) => (
          <div key={i} className={`chat-bubble ${by !== "You" ? "chat-left" : "chat-right"}`}>
            <span className="sender">{by}</span>
            <p>{message}</p>
            <sub>{dayjs(date).format("HH:mm a")}</sub>
          </div>
        ))}

        {isLoading && (
          <div className="stage">
            <div className="dot-flashing"></div>
          </div>
        )}
      </div>
      <div className="chat-form">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Write your question here..."
            autoComplete="off"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Ask</button>
        </form>
      </div>
    </>
  );
}

export default Chatbot;
