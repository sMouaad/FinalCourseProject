import React, { useState, useEffect } from 'react';
import Brain from "./assets/brain.svg";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Alzheimer = () => {
    const [questions, setQuestions] = useState([
        "From time to time, I forget what day of the week it is.",
        "Sometimes when I’m looking for something, I forget what it is that I’m looking for.",
        "My friends and family seem to think I’m more forgetful now than I used to be.",
        "Sometimes I forget the names of my friends.",
        "It’s hard for me to add two-digit numbers without writing them down.",
        "I frequently miss appointments because I forget them.",
        "I rarely feel energetic.",
        "Small problems upset me more than they once did.",
        "It’s hard for me to concentrate for even an hour.",
        "I often misplace my keys, and when I find them, I often can’t remember putting them there.",
        "I frequently repeat myself.",
        "Sometime I get lost, even when I’m driving somewhere I’ve been before.",
        "Sometimes I forget the point I’m trying to make.",
        "To feel mentally sharp, I depend upon caffeine.",
        "It takes longer for me to learn things than it used to."
    ]);
    const [scoreDisplay, setScoreDisplay] = useState('');
    const [scoreColor, setScoreColor] = useState('');

    const options = [
        "True",
        "False"
    ];

    const calculateScore = () => {
        const questionsCount = questions.length;
        let score = 0;
        let answered = 0;

        const Scores = [1, 0];

        for (let i = 0; i < questionsCount; i++) {
            const selectedOption = document.querySelector(`input[name="question_${i}"]:checked`);
            if (selectedOption) {
                answered++;
                const optionIndex = Number(selectedOption.value);
                score += Scores[optionIndex];
            }
        }

        if (answered !== questionsCount) {
            setScoreDisplay("Please answer all the questions!");
            setScoreColor('red');
        } else {
            setScoreDisplay('');
            setScoreColor('');

            let diagnostic = '';
            if (score <= 8) {
                diagnostic = " Your brain is functioning okay. By learning to relax and maintain a healthy diet, your brain can function at even higher levels";
                setScoreColor('bg-info');
            } else if (score <= 12) {
                diagnostic = " Your brain is in danger. Check your diet today. You can reduce brain drain and memory loss with vitamins, brain foods, herbs, yoga and meditation techniques, and appropriate medications.";
                setScoreColor('bg-info');
            } else {
                diagnostic = " Your brain is running on empty. You should see your doctor. You can refuel your brain and prevent further memory loss with food, vitamins, herbs, exercises, and medications.";
                setScoreColor('bg-warning');
            }

            setScoreDisplay(`Your score is: ${score} ${diagnostic}`);
        }
    };

    return (
        <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#f7f9fc', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px', BorderRadius: '8px' }}>
            <Link className="flex absolute items-center left-8 text-slate-700 hover:text-green-400 transition-all ease-linear top-4 gap-2 cursor-pointer h-fit" to="/"><FaArrowLeft /> Go back </Link>
            <div className="text-center mb-4">
                <img src={Brain} alt="Logo" className="logo" style={{ width: '100%', maxWidth: '100px', height: 'auto', margin: '0 auto 20px', display: 'block', transition: 'transform 0.3s' }} 
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>
            
            <h2 className="text-center mb-4" style={{ color: '#444', fontWeight: '700', marginBottom: '30px', textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>ALZHEIMER'S RESEARCH & PREVENTION FOUNDATION MEMORY QUIZ</h2>
            
            <div className="description bg-light p-4 rounded mb-4" style={{ fontSize: '1.1em', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)', borderRadius: '8px', marginTop: '20px', textAlign: 'justify' }}>
                <p>The Memory Quiz can put your mind at ease about misplacing your car keys occasionally, or it can motivate you to consult with your doctor. The question to ask if you seem to be misplacing your car keys more often is “When you find your keys, then do you remember that you put them there in the first place?”</p>
            </div>
            
            <div id="app" style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column' }}>
            {questions.map((questionText, index) => (
                <div className="question mb-4" key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <p style={{ fontWeight: 'bold', color: '#00E5BD', fontSize: '1.1em', padding: '10px', marginBottom: '10px' }}>{`${index + 1}. ${questionText}`}</p>
                    <div className="options ml-3" style={{ display: 'flex', flexDirection: 'column' }}>
                        {options.map((option, optionIndex) => (
                            <div className="form-check" key={optionIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                <input className="form-check-input" type="radio" name={`question_${index}`} value={optionIndex} id={`option_${index}_${optionIndex}`} style={{ color: '#00E5BD', marginLeft: '5px' }}/>
                                <label className="form-check-label" htmlFor={`option_${index}_${optionIndex}`} style={{ marginLeft: '10px', fontWeight: '600' }}>{option}</label>
                            </div>
                        ))}
                    </div>
                </div>
            ))} 
            </div>

            <button onClick={calculateScore} id="calculateScore" className="btn btn-primary mt-3" style={{ backgroundColor: '#00E5BD', border: 'none', borderRadius: '5px' , padding: '10px 20px', fontSize: '1.1em', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s' }}>Calculate Score</button>
            <p className={`mt-3`} id="scoreDisplay" style={{ color: {scoreColor}}}>
                {scoreDisplay}
            </p>
           
            <div className="mt-5" style={{display: 'flex', flexDirection: 'column'}}>
                <h3 className='text-center mt-5' style={{ fontSize: '1.1em', marginBottom: '20px'}}>Meaning of RAADS–R scores</h3>
                <table className="table table-bordered" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead className="thead-dark">
                        <tr>
                            <th>Score</th>
                            <th>Interpretation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>5-8</td>
                            <td>Your brain is functioning okay. By learning to relax and maintain a healthy diet, your brain can function at even higher levels.</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>9-12</td>
                            <td>Your brain is in danger. Check your diet today. You can reduce brain drain and memory loss with vitamins, brain foods, herbs, yoga and meditation techniques, and appropriate medications.</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>12-15</td>
                            <td>Your brain is running on empty. You should see your doctor. You can refuel your brain and prevent further memory loss with food, vitamins, herbs, exercises, and medications.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
           
            <div className="cautionary-note mt-5 p-4 text-white rounded" style={{ backgroundColor: '#00E5BD', fontSize: '1.1em' }}>
                <p className="lead text-center" style={{ fontWeight: 'bold', borderBottom: '2px solid currentColor', paddingBottom: '10px', marginBottom: '20px' }}>Important Precaution</p>
                <p style={{ textAlign: 'justify' }}>This test is a self-assessment tool and not a definitive diagnostic instrument. The results should be used as a reference and not as a final diagnosis. Autism spectrum disorders can only be diagnosed by qualified professionals. If your results indicate the possibility of an autism spectrum disorder, or if you have concerns about your mental well-being, please seek guidance from a medical professional or specialist.</p>
            </div>
           
            <footer className="mt-5 p-4 bg-light" style={{ borderTop: '1px solid #e7e7e7', fontSize: '0.9em' }}>
                <p className="text-center">Reference:</p>
                <p className="text-center">
                The Alzheimer’s Research and Prevention Foundation is a leading global Alzheimer’s disease (AD) prevention organization, funding some of the most significant integrative medicine research on Alzheimer’s prevention , while providing educational outreach to laypeople, healthcare providers and caregivers on the 4 Pillars of Alzheimer’s Prevention®.
                    <a href="https://alzheimersprevention.org/alzheimers-info/memory-quiz/" target="_blank" rel="noopener noreferrer" style={{ color: '#00E5BD', textDecoration: 'underline' }}>View Source</a>
                </p>
            </footer>
        </div>
    );
};

export default Alzheimer;
