"use client"






import React, { useState, useEffect } from "react";
import styles from "./Quiz.module.css";
import { useRouter } from "next/navigation";
import { allQuestions } from '../data';

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
    answer: number;
}

function shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
}

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
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
    const [score, setScore] = useState<number | null>(null);
    const [selectedReviewQuestions, setSelectedReviewQuestions] = useState<number[]>([]);
    const router = useRouter();

    useEffect(() => {
        const selectedQuestions = getRandomQuestions();
        setQuestions(selectedQuestions);
        setUserAnswers(new Array(selectedQuestions.length).fill(null));
    }, []);

    const handleAnswerChange = (answer: number) => {
        if (userAnswers[currentQuestionIndex] === null) {
            const updatedAnswers = [...userAnswers];
            updatedAnswers[currentQuestionIndex] = answer;
            setUserAnswers(updatedAnswers);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        questions.forEach((question, index) => {
            if (userAnswers[index] === question.answer) {
                correctAnswers++;
            }
        });
        const percentage = (((3 * correctAnswers) - (questions.length - correctAnswers)) / (3 * questions.length)) * 100;
        setScore(percentage);
    };

    const toggleQuestion = (index: number) => {
        setSelectedReviewQuestions((prev) => {
            return prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index];
        });
    };

    return (
        <div className={`bg-white dark:bg-black p-8 h-[100%] ${styles.holder}`}>
            <div className={`bg-[#eeeeee] dark:bg-[#5c5c5c] ${styles.quizContainer}`}>
                {score === null ? (
                    <>
                        <p className={`text-black dark:text-white ${styles.question}`}>{questions[currentQuestionIndex]?.question}</p>
                        <div className={`text-black dark:text-white ${styles.options}`}>
                            {questions[currentQuestionIndex]?.options.map((option, index) => (
                                <label
                                    key={index}
                                    className={`${styles.option} ${userAnswers[currentQuestionIndex] !== null
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
                            ))}
                        </div>
                        <div className={styles.buttons}>
                            {currentQuestionIndex === questions.length - 1 ? (
                                <button onClick={handleSubmit} disabled={userAnswers[currentQuestionIndex] === null} className={styles.submitButton}>
                                    ارسال
                                </button>
                            ) : (
                                <button onClick={handleNext} disabled={userAnswers[currentQuestionIndex] === null} className={styles.navButton}>
                                    بعدی
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className={styles.result}>
                        <div className="flex justify-center gap-3">
                            <h2 className="text-black dark:text-white font-bold text-[25px]">{score.toFixed(0)}٪</h2>
                            <h2 className="text-black dark:text-white font-bold text-[20px] my-auto">:نمره شما</h2>
                        </div>
                        {score > 50 && (
                            <div className="flex flex-col flex-wrap mb-8 ">
                                <div className="flex ">
                                    <span className="my-auto text-[20px]">🎉</span>
                                    <p className={`text-black dark:text-white ${styles.congratulations}`}>تبریک! ، شما هم اکنون آماده‌ی دمو زدن هستید و یک قدم دیگر به هدفتان نزیک تر شدید </p>
                                    <span className="my-auto text-[20px]">🎉</span>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <div onClick={() => router.push("/trade")} className="border-[2px] text-[17px] font-bold text-black w-[100px] rounded-[5px] border-black cursor-pointer bg-white">شروع ترید</div>
                                </div>
                            </div>
                        )}
                        <h3 className="text-black dark:text-white text-right font-bold text-[25px]">:بررسی پاسخ‌ها</h3>

                        {questions.map((question, index) => (
                            <div key={index}>
                                <p
                                    className={`active:bg-blue-400 ${styles.review} ${selectedReviewQuestions.includes(index) ? styles.active : ""}`}
                                    onClick={() => toggleQuestion(index)}
                                >
                                    <h2 className="text-black dark:text-white text-right font-bold text-[15px] ">{question.question}</h2>
                                    <h2>{userAnswers[index] === question.answer ? "✅" : "❌"}</h2>
                                </p>
                                {selectedReviewQuestions.includes(index) && (
                                    <div className={styles.reviewDetails}>
                                        <p className={styles.question}>{question.question}</p>
                                        <div className={styles.options}>
                                            {question.options.map((option, optionIndex) => (
                                                <p
                                                    key={optionIndex}
                                                    className={
                                                        `${styles.option} ` +
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
        </div>
    );
};

export default Test;