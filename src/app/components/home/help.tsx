// "use client"
import { Spoiler } from "@mantine/core";
import { IoHelpBuoy } from "react-icons/io5";

function Help() {
  return (
    <aside className="side-panel-helper">
      <div>
        <IoHelpBuoy size={28} />
        <section className="contextual-help">
          <h4>AWS Lex & Kendra Chatbot</h4>
          <p>Quick chatbot powered by AWS Kendra and Lex, to answer random questions.</p>
          {/* <span className="subtitle">Question Types</span> */}
          <p>If you ask one of the following questions, Lex will answer:</p>
          <ul>
            <li>What is AWS?</li>
            <li>AWS popular services</li>
            <li>Popular tools in the Back-end development</li>
            <li>Popular tools in the Front-end development</li>
            <li>Popular tools in the Full-stack development</li>
            <li>And Node.js</li>
          </ul>
          <p>
            {/* This question will answer kendra */}
            If the chatbot is unable to find a match, it will use AWS Kendra&apos; data source
            to find an answer to the question. (+300 questions and answers)
          </p>
          <p>
            Example: <i>What is a young giraffe called?</i>
          </p>

          <Spoiler maxHeight={35} showLabel="Show more" hideLabel="Hide" className="spoiler">
            {/* <hr
              style={{
                marginTop: "1.75rem",
                marginBottom: "1em",
              }}
            /> */}
            <p>You can ask any of the questions listed on these websites</p>-{" "}
            <a href="https://kwizzbit.com/50-general-knowledge-quiz-questions-and-answers/">
              50 General Knowledge Quiz Questions and Answers
            </a>
            <br />-{" "}
            <a href="https://www.mentimeter.com/blog/audience-energizers/55-free-trivia-and-fun-quiz-question-templates">
              55 Trivia and Fun Quiz Questions
            </a>
            <br />-{" "}
            <a href="https://www.radiotimes.com/quizzes/pub-quiz-general-knowledge/">
              200 Quiz Questions and Answers
            </a>
            <br />-{" "}
            <a href="https://www.cosmopolitan.com/uk/worklife/a32388181/best-general-knowledge-quiz-questions/">
              105 General Knowledge Quiz Questions
            </a>
          </Spoiler>
          <h3>Technical Details</h3>
          <p>
            Every time a question is asked, the chatbot will call a Lambda function which
            contains the logic about first calling Lex and if it fails, then calling Kendra.
          </p>
          <p>
            For the <b>report</b>, I have used AWS Cloudwatch to monitor the Lex utterances.
            This can be seen at <a href="/report">/report</a>.
          </p>
          <small>To be improved...</small>
        </section>
      </div>
    </aside>
  );
}

export default Help;
