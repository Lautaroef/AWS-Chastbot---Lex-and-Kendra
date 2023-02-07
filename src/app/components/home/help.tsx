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
          <h3>Technical Details</h3>
          <p>
            Every time a question is asked, the chatbot will call a Lambda function which
            contains the logic about first calling Lex and if it fails, then calling Kendra.
          </p>
          <p>
            For the report, I have used AWS Cloudwatch to monitor the Lex utterances. This can
            be seen at <a href="/report">/report</a>.
          </p>

          <small>To be improved...</small>
        </section>
      </div>
    </aside>
  );
}

export default Help;
