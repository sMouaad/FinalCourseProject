import React, { useState, useEffect } from "react";
import Brain from "./assets/brain.svg";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Autism = () => {
  const [questions, setQuestions] = useState([
    "I am a sympathetic person.",
    "I often use words and phrases from movies and television in conversations.",
    "I am often surprised when others tell me I have been rude.",
    "Sometimes I talk to loudly or too softly and I am not aware of it.",
    "I often don't know how to act in social situations.",
    'I can "put myself in other people\'s shoes."',
    'I have a hard time figuring out what some phrases mean, like "you are the apple of my eye".',
    "I only like to talk to people who share my special interests.",
    "I focus on details rather than the overall idea.",
    "I always notice how food feels in my mouth. This is more important to me than how it tastes.",
    "I miss my best friends or family when we are apart for a long time.",
    "Sometimes I offend others by saying what I am thinking, even if I don't mean to.",
    "I only like to think and talk about a few things that interest me.",
    "I'd rather go out to eat in a restaurant by myself than with someone I know.",
    "I cannot imagine what it would be like to be someone else.",
    "I have been told that I am clumsy or uncoordinated.",
    "Others consider me odd or different.",
    "I understand when friends need to be comforted.",
    "I am very sensitive to the way my clothes feel when I touch them. How they feel is more important to me than how they look.",
    "I like to copy the way certain people speak and act. It helps me appear more normal.",
    "It can be very intimidating for me to talk to more than one person at a time.",
    'I have to "act normal" to please other people and make them like me.',
    "Meeting new people is usually easy for me.",
    "I get highly confused when someone interrupts me when I am talking about something I am very interested in.",
    "It is difficult for me to understand how other people are feeling when we are talking.",
    "I like having a converstation with several people, for instance around a dinner table, at school or at work.",
    "I take things too literally, so often I miss what people are trying to say.",
    "It is very difficult for me to understand when someone is embarrased or jealous.",
    "Some ordinary textures that do not bother others feel very offensive when they touch my skin.",
    "I get extremely upset when the way I like to do things is suddenly changed.",
    'I have never wanted or needed to have what other people call an "intimate relationship".',
    "It is difficult for me to start and stop a conversation. I need to keep going until I am finished.",
    "I speak with a normal rhythm.",
    "The same sound, color or texture can suddenly change from very sensitive to very dull.",
    'The phrase "I\'ve got you under my skin" makes me very uncomfortable.',
    "Sometimes the sound of a word or high-pitched noise can be painful to my ears.",
    "I am an understanding type of person.",
    "I do not connect with characters in movies and cannot feel what they feel.",
    "I cannot tell what someone is flirting with me.",
    "I can see in my mind in exact detail things that I am interested in.",
    "I keep lists of things that interest me, even when they have no practical use (for example sports statistics, train schedules, calendar dates, historical facts and dates).",
    "When I feel overwhelmed by my senses, I have to isolate myself to shut them down.",
    "I like to talk things over with my friends.",
    "I cannot tell if someone is interested or bored with what I am saying.",
    "It can be very hard to read someone's face, hand and body movements when they are talking.",
    "The same thing (like clothes or temperature) can feel very different to me at different times.",
    "I feel very comfortable with dating or being in social situations with others.",
    "I try to be as helpful as I can when other people tell me their personal problems.",
    "I have been told that I have an unusual voice (for example flat, monotone, childish, or high-pitched).",
    "Sometimes a thought or a subject gets stuck in my mind and I have to talk about it even if no one is interested.",
    "I do certain things with my hands over and over again (like flapping, twirling sticks or strings, waving things by my eyes).",
    "I have never been interested in what most of the people I know consider interesting.",
    "I am considered a compassionate type of person.",
    "I get along with other people by following a set of specific rules that help me look normal.",
    "It is very difficult for me to work and function in groups.",
    "When I am talking to someone, it is hard to change the subject. If the other persona does so, I can get very upset and confused.",
    "Sometimes I have to cover my ears to block out painful noises (like vacuum cleaners or people talking too much or too loudly).",
    "I can chat and make small talk with people.",
    "Sometimes things that should feel painful are not (for instance when I hurt myself or burn my hand on a stove)",
    "When talking to someone, I have a hard time telling when it is my turn to talk or listen.",
    "I am considerd a loner by those who know me best.",
    "I usually speak in a normal tone.",
    "I like things to be exactly the same day after day and even small changes in my routines upset me.",
    "How to make friends and socialize is a mystery to me.",
    "It calms me to spin around or to rock in a chair when I am feeling stressed.",
    'The phrase, "He wears his heart on his sleeve." does not make sense to me.',
    "If I am in a place where there are many smells, textures to feel, noises or bright lights, I feel anxious or frightened.",
    "I can tell when someone says one thing but means something else.",
    "I like to be by myself as much as I can.",
    "I keep my thoughts stacked in my memory like they are on filing cards, and I pick out the ones I need by looking through the stack and finding the right one (or another unique way).",
    "The same sound sometimes seems very loud or very soft, even though I know it has not changed.",
    "I enjoy spending time eating and talking with my family and friends.",
    "I can't tolerate things I dislike (like smells, textures, sounds or colors).",
    "I don't like to be hugged or held.",
    "When I go somewhere, I have to follow a familiar route or I can get very confused and upset.",
    "It is difficult to figure out what other people expect of me.",
    "I like to have close friends.",
    "People tell me that I give too much detail.",
    "I am often told that I ask embarrasing questions.",
    "I tend to point out other people's mistakes.",
  ]);
  const [specialQuestions] = useState([
    1, 6, 11, 18, 23, 26, 33, 37, 43, 47, 48, 53, 58, 62, 68, 72, 77,
  ]);
  const [scoreDisplay, setScoreDisplay] = useState("");
  const [scoreColor, setScoreColor] = useState("");

  const options = [
    "True now and when I was young",
    "True now only",
    "True only when I was younger than 16",
    "Never true",
  ];

  const calculateScore = () => {
    const questionsCount = questions.length;
    let score = 0;
    let answered = 0;

    const regularScores = [3, 2, 1, 0];
    const specialScores = [0, 1, 2, 3];

    for (let i = 0; i < questionsCount; i++) {
      const selectedOption = document.querySelector(
        `input[name="question_${i}"]:checked`
      );
      if (selectedOption) {
        answered++;
        const optionIndex = Number(selectedOption.value);
        score += specialQuestions.includes(i + 1)
          ? specialScores[optionIndex]
          : regularScores[optionIndex];
      }
    }

    if (answered !== questionsCount) {
      setScoreDisplay("Please answer all the questions!");
      setScoreColor("text-danger");
    } else {
      setScoreDisplay("");
      setScoreColor("");

      let diagnostic = "";
      if (score <= 25) {
        diagnostic = " You are not autistic.";
        setScoreColor("bg-info");
      } else if (score <= 50) {
        diagnostic = " Some autistic traits, but likely not autistic.";
        setScoreColor("bg-info");
      } else if (score <= 65) {
        diagnostic = " Autism is a consideration at this score.";
        setScoreColor("bg-warning");
      } else if (score <= 130) {
        diagnostic = " Strong evidence for autism.";
        setScoreColor("bg-warning");
      } else if (score <= 160) {
        diagnostic = " Very strong evidence for autism.";
        setScoreColor("bg-danger");
      } else if (score <= 227) {
        diagnostic = " One of the highest scores recorded for autism.";
        setScoreColor("bg-danger");
      } else {
        diagnostic = " The maximum possible RAADS–R score.";
        setScoreColor("bg-danger");
      }

      setScoreDisplay(`Your score is: ${score} ${diagnostic}`);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f7f9fc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        BorderRadius: "8px",
      }}
    >
      <Link
        className="flex absolute items-center left-8 text-slate-700 hover:text-green-400 transition-all ease-linear top-4 gap-2 cursor-pointer h-fit"
        to="/"
      >
        <FaArrowLeft /> Go back
      </Link>
      <div className="text-center mb-4 mt-4">
        <img
          src={Brain}
          alt="Logo"
          className="logo"
          style={{
            width: "100%",
            maxWidth: "100px",
            height: "auto",
            margin: "0 auto 20px",
            display: "block",
            transition: "transform 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>

      <h2
        className="text-center mb-4"
        style={{
          color: "#444",
          fontWeight: "700",
          marginBottom: "30px",
          textShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        Ritvo Autism Asperger Diagnostic Scale-Revised (RAADS-R)
      </h2>

      <div
        className="description bg-light p-4 rounded mb-4"
        style={{
          fontSize: "1.1em",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
          borderRadius: "8px",
          marginTop: "20px",
          textAlign: "justify",
        }}
      >
        <p>
          The Ritvo Autism Asperger Diagnostic Scale-Revised (RAADS-R) is a tool
          used to assist the diagnosis of autism spectrum disorders in adults.
          It's designed to measure the presence and severity of autism-related
          symptoms. This self-test provides a preliminary measure and is not
          intended as a diagnostic tool.
        </p>
      </div>

      <div
        id="app"
        style={{
          marginBottom: "30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {questions.map((questionText, index) => (
          <div
            className="question mb-4"
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                color: "#00E5BD",
                fontSize: "1.1em",
                padding: "10px",
                marginBottom: "10px",
              }}
            >{`${index + 1}. ${questionText}`}</p>
            <div
              className="options ml-3"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {options.map((option, optionIndex) => (
                <div
                  className="form-check"
                  key={optionIndex}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question_${index}`}
                    value={optionIndex}
                    id={`option_${index}_${optionIndex}`}
                    style={{ color: "#00E5BD", marginLeft: "5px" }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`option_${index}_${optionIndex}`}
                    style={{ marginLeft: "10px", fontWeight: "600" }}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={calculateScore}
        id="calculateScore"
        className="btn btn-primary mt-3"
        style={{
          backgroundColor: "#00E5BD",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          fontSize: "1.1em",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s",
        }}
      >
        Calculate Score
      </button>
      <p className={`mt-3 ${scoreColor}`} id="scoreDisplay">
        {scoreDisplay}
      </p>

      <div
        className="mt-5"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h3
          className="text-center mt-5"
          style={{ fontSize: "1.1em", marginBottom: "20px" }}
        >
          Meaning of RAADS–R scores
        </h3>
        <table
          className="table table-bordered"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead className="thead-dark">
            <tr>
              <th>Score</th>
              <th>Interpretation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: "bold" }}>25</td>
              <td>No indications of autism.</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>50</td>
              <td>
                Presence of some traits associated with autism, though it's
                unlikely to be autism (note: some individuals with autism may
                have scores as low as 44).
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>65</td>
              <td>Base threshold for potential autism consideration.</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>90</td>
              <td>
                Enhanced signs of autism, though scores this high can also be
                found in non-autistic individuals.
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>130</td>
              <td>
                Average score among individuals with autism, indicating a strong
                likelihood of autism.
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>160</td>
              <td>Overwhelming evidence pointing towards autism.</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>227</td>
              <td>
                Highest score recorded by individuals with autism in the
                foundational RAADS-R study by Ritvo.
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>240</td>
              <td>
                The absolute maximum score attainable on the RAADS-R scale.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        className="cautionary-note mt-5 p-4 text-white rounded"
        style={{ backgroundColor: "#00E5BD", fontSize: "1.1em" }}
      >
        <p
          className="lead text-center"
          style={{
            fontWeight: "bold",
            borderBottom: "2px solid currentColor",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          Important Precaution
        </p>
        <p style={{ textAlign: "justify" }}>
          This test is a self-assessment tool and not a definitive diagnostic
          instrument. The results should be used as a reference and not as a
          final diagnosis. Autism spectrum disorders can only be diagnosed by
          qualified professionals. If your results indicate the possibility of
          an autism spectrum disorder, or if you have concerns about your mental
          well-being, please seek guidance from a medical professional or
          specialist.
        </p>
      </div>

      <footer
        className="mt-5 p-4 bg-light"
        style={{ borderTop: "1px solid #e7e7e7", fontSize: "0.9em" }}
      >
        <p className="text-center">Reference:</p>
        <p className="text-center">
          Ritvo, R. A., Ritvo, E. R., Guthrie, D., Ritvo, M. J., Hufnagel, D.
          H., McMahon, W., ... & Eloff, J. (2011). The Ritvo Autism Asperger
          Diagnostic Scale-Revised (RAADS-R): A Scale to Assist the Diagnosis of
          Autism Spectrum Disorder in Adults: An International Validation Study.
          Journal of Autism and Developmental Disorders, 41(8), 1076-1089.
          <a
            href="https://link.springer.com/article/10.1007/s10803-010-1133-5"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00E5BD", textDecoration: "underline" }}
          >
            View Source
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Autism;
