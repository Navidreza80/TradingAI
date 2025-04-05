"use client";
// Next built in component
import Link from "next/link"
// React built in
import React, { useState, useEffect } from "react";
// Global style
import styles from "./Quiz.module.css";
// Test data
import { allQuestions } from "../data";
// antd components
import { Layout, ConfigProvider } from "antd";
import fa_IR from "antd/locale/fa_IR";

// Test question interface for type safety
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  answer: number;
}
function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

// Function to get random question from data
const getRandomQuestions = (): Question[] => {
  let shuffledQuestions = shuffleArray([...allQuestions]).slice(0, 15);
  return shuffledQuestions.map((q) => {
    let shuffledOptions = shuffleArray([...q.options]);
    return {
      ...q,
      options: shuffledOptions,
      answer: shuffledOptions.indexOf(q.correctAnswer),
    };
  });
};

const Test: React.FC = () => {
  // State to save questions
  const [questions, setQuestions] = useState<Question[]>([]);
  // State to save question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  // State to save uses answer
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  // State to save user score
  const [score, setScore] = useState<number | null>(null);
  // State to save selected review question
  const [selectedReviewQuestions, setSelectedReviewQuestions] = useState<
    number[]
  >([]);
  // antd header layout
  const { Header } = Layout;

  // useEffect to get random question when the components is mounting
  useEffect(() => {
    const selectedQuestions = getRandomQuestions();
    setQuestions(selectedQuestions);
    setUserAnswers(new Array(selectedQuestions.length).fill(null));
  }, []);

  // Function to change users answer
  const handleAnswerChange = (answer: number) => {
    if (userAnswers[currentQuestionIndex] === null) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestionIndex] = answer;
      setUserAnswers(updatedAnswers);
    }
  };

  // Function to change question to next one
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Function to submit users answer
  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        correctAnswers++;
      }
    });
    const percentage =
      ((3 * correctAnswers - (questions.length - correctAnswers)) /
        (3 * questions.length)) *
      100;
    setScore(percentage);
  };
  const toggleQuestion = (index: number) => {
    setSelectedReviewQuestions((prev) => {
      return prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index];
    });
  };

  return (
    <ConfigProvider locale={fa_IR}>
      <Layout className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50">
        <Header></Header>
        <div
          className={`bg-[#eeeeee] dark:bg-[#5c5c5c] ${styles.quizContainer}`}
        >
          {score === null ? (
            <>
              <p className={`text-black dark:text-white ${styles.question}`}>
                {questions[currentQuestionIndex]?.question}
              </p>
              <div className={`text-black dark:text-white ${styles.options}`}>
                {questions[currentQuestionIndex]?.options.map(
                  (option, index) => (
                    <label
                      key={index}
                      className={`${styles.option} ${
                        userAnswers[currentQuestionIndex] !== null
                          ? index === questions[currentQuestionIndex].answer
                            ? styles.correct
                            : userAnswers[currentQuestionIndex] === index
                            ? styles.incorrect
                            : ""
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        style={{ display: "none" }}
                        disabled={userAnswers[currentQuestionIndex] !== null}
                        checked={userAnswers[currentQuestionIndex] === index}
                        onChange={() => handleAnswerChange(index)}
                      />
                      {option}
                    </label>
                  )
                )}
              </div>
              <div className={styles.buttons}>
                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={userAnswers[currentQuestionIndex] === null}
                    className={styles.submitButton}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={userAnswers[currentQuestionIndex] === null}
                    className={styles.navButton}
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className={styles.result}>
              <div className="flex justify-center gap-3">
                <h2 className="text-black dark:text-white font-bold text-[25px]">
                  {score.toFixed(0)}٪
                </h2>
                <h2 className="text-black dark:text-white font-bold text-[20px] my-auto">
                  Your score:
                </h2>
              </div>
              {score > 50 && (
                <div className="flex flex-col flex-wrap mb-8 ">
                  <div className="flex ">
                    <span className="my-auto text-[20px]">🎉</span>
                    <p
                      className={`text-black dark:text-white ${styles.congratulations}`}
                    >
                      Congratulation! you can now start demo trading! now you're
                      one step closer to your goals.
                    </p>
                    <span className="my-auto text-[20px]">🎉</span>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Link href="/trade">
                      <div className="border-[2px] text-[17px] font-bold text-black w-[100px] rounded-[5px] border-black cursor-pointer bg-white">
                        Start demo trading
                      </div>
                    </Link>
                  </div>
                </div>
              )}
              <h3 className="text-black dark:text-white text-right font-bold text-[25px]">
                See answers:
              </h3>

              {questions.map((question, index) => (
                <div key={index}>
                  <p
                    className={`active:bg-blue-400 ${styles.review} ${
                      selectedReviewQuestions.includes(index)
                        ? styles.active
                        : ""
                    }`}
                    onClick={() => toggleQuestion(index)}
                  >
                    <h2 className="text-black dark:text-white text-right font-bold text-[15px] ">
                      {question.question}
                    </h2>
                    <h2>
                      {userAnswers[index] === question.answer ? "✅" : "❌"}
                    </h2>
                  </p>
                  {selectedReviewQuestions.includes(index) && (
                    <div className={styles.reviewDetails}>
                      <p className={`text-white ${styles.question}`}>
                        {question.question}
                      </p>
                      <div className={styles.options}>
                        {question.options.map((option, optionIndex) => (
                          <p
                            key={optionIndex}
                            className={
                              `text-white ${styles.option} ` +
                              (optionIndex === question.answer
                                ? styles.correct
                                : userAnswers[index] === optionIndex
                                ? styles.incorrect
                                : "")
                            }
                          >
                            {option}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </ConfigProvider>
  );
};

export default Test;
