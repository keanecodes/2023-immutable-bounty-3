import React from 'react';

const Questionare = ({ handleAnswer, data: {question, correct_answer, incorrect_answers}}) => {


const shuffledAnswer = [correct_answer, ... incorrect_answers].sort(() => Math.random() -0.5);
    return ( 
    <div>

        <div>
            <h2 dangerouslySetInnerHTML={{__html: question}}/>
            <div className="options-selection-container">

            {shuffledAnswer.map(answer => (
                <button key={`${question}-${answer}-btn`} className={`${correct_answer === answer ? "bg-purple-300" : 'bg-white-300'}
                glow-border `} onClick={() => handleAnswer(answer)} answer={answer} 
                    dangerouslySetInnerHTML = 
                    {{__html: answer}}
                />
            
            ))} 
              
            </div>
          </div>
    </div>
    )
}

export default Questionare;