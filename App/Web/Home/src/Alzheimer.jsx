import React, { useState, useEffect } from 'react';
import Brain from "./assets/brain.svg";


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
            setScoreColor('text-danger');
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
        <div className="container mt-5" style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#f7f9fc', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px', BorderRadius: '8px' }}>
            
            <div className="text-center mb-4">
                <img src={Brain} alt="Logo" className="logo" style={{ width: '100%', maxWidth: '100px', height: 'auto', margin: '0 auto 20px', display: 'block', transition: 'transform 0.3s' }} 
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>
            
            <h2 className="text-center mb-4" style={{ color: '#444', fontWeight: '700', marginBottom: '30px', textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>Ritvo Autism Asperger Diagnostic Scale-Revised (RAADS-R)</h2>
            
            <div className="description bg-light p-4 rounded mb-4" style={{ fontSize: '1.1em', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)', borderRadius: '8px', marginTop: '20px', textAlign: 'justify' }}>
                <p>The Ritvo Autism Asperger Diagnostic Scale-Revised (RAADS-R) is a tool used to assist the diagnosis of autism spectrum disorders in adults. It's designed to measure the presence and severity of autism-related symptoms. This self-test provides a preliminary measure and is not intended as a diagnostic tool.</p>
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
            <p className={`mt-3 ${scoreColor}`} id="scoreDisplay">
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
                            <td style={{ fontWeight: 'bold' }}>25</td>
                            <td>No indications of autism.</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>50</td>
                            <td>Presence of some traits associated with autism, though it's unlikely to be autism (note: some individuals with autism may have scores as low as 44).</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>65</td>
                            <td>Base threshold for potential autism consideration.</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>90</td>
                            <td>Enhanced signs of autism, though scores this high can also be found in non-autistic individuals.</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>130</td>
                            <td>Average score among individuals with autism, indicating a strong likelihood of autism.</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>160</td>
                            <td>Overwhelming evidence pointing towards autism.</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>227</td>
                            <td>Highest score recorded by individuals with autism in the foundational RAADS-R study by Ritvo.</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>240</td>
                            <td>The absolute maximum score attainable on the RAADS-R scale.</td>
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
                    Ritvo, R. A., Ritvo, E. R., Guthrie, D., Ritvo, M. J., Hufnagel, D. H., McMahon, W., ... & Eloff, J. (2011). The Ritvo Autism Asperger Diagnostic Scale-Revised (RAADS-R): A Scale to Assist the Diagnosis of Autism Spectrum Disorder in Adults: An International Validation Study. Journal of Autism and Developmental Disorders, 41(8), 1076-1089.
                    <a href="https://link.springer.com/article/10.1007/s10803-010-1133-5" target="_blank" rel="noopener noreferrer" style={{ color: '#00E5BD', textDecoration: 'underline' }}>View Source</a>
                </p>
            </footer>
        </div>
    );
};

export default Alzheimer;
