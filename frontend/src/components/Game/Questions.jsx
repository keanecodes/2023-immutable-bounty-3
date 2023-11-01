import React, { useState, useEffect } from 'react'
import Questionare from './Questionare';
import axios from 'axios'
import styled from 'styled-components';
import { transfer } from '../../store/immutable';


const Questions = ({tries, setTries, handlePoints,
                     returnDifficulty, handleShowQuestions, 
                     topic, subtopic, progress, setProgress, setRender}) => {

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameEnded, setGameEnded] = useState(false);
    const [loading, setLoading] = useState(false)
    const [txn, setTxn] = useState("")

    useEffect(() => {
        axios.get("/questions",{ params: { topic, subtopic } })
                .then(data => {
                    setQuestions(cleanUp(data));
                });        
    }, []);

    useEffect (() => {
      if(gameEnded === true)
      { 
        if(score === questions.length) {
          setProgress(progress.concat(subtopic));
          let points = handlePoints(returnDifficulty(subtopic))
          
          console.log(tries+" "+questions.length)
          let totalTries = Math.round(tries/questions.length);

          console.log(totalTries)

          setTries(0);
          setRender(true);
        }
      }
    }, [gameEnded])
  
    // const questions = data.questions;
  
    const handleAnswer = (answer) => {
        const newIndex = currentIndex + 1;
  
        setCurrentIndex(newIndex);
        if(answer === questions[currentIndex].correct_answer) {
            setScore(score+1);
        }
  
        if(newIndex >= questions.length) {
            setGameEnded(true);
        }

        setTries(tries+1);
    }
  
    // Extract relevant data
    const cleanUp = (data) => {
      let items = []
      const channel = data.data
  
      channel.forEach(element => {
        let item = {
              correct_answer: element.correct_answer,
              incorrect_answers: [
                element.incorrect_answers[0], 
                element.incorrect_answers[1], 
                element.incorrect_answers[2]
              ],
              question: element.question
          }
          items.push(item);  
        })
      return items;
    }
  
      
    return (
      <div className="sb-task-dialog-container">
        <div className="sb-task-dialog glow-border" aria-modal="true" role="dialog">
          <div className="sb-task-header dashed" data-click onClick={handleShowQuestions}>
            <div className="game-header-title">
              <h2>{subtopic}</h2>
              <div className="sb-meta">Map: The Skeld</div>
            </div>
          </div>
          {gameEnded ? (
            <div style={{textAlign: "center"}}>
              <h1>You got {score}/{questions.length}</h1>
              {/* <p>This question has ___ / 100 NFT free mint left.</p> */}
              <div className="options-selection-container">
                <CenterMintButton
                  onClick={async () => {
                    setLoading(true)
                    const txnHash = await transfer();
                    setLoading(false)
                    setTxn(txnHash)
                    console.log("======== txnHash", txnHash)
                  }} 
                  className="glow-border">
                    {loading ? "Loading" : "Mint now"}
                </CenterMintButton>
              </div>
            </div>
          ): questions.length > 0 ? (
              <Questionare data={questions[currentIndex]} handleAnswer = {handleAnswer}/>
            ) : <div>
                <h1>Loading...</h1>
              </div>
          }
        
        </div>
      </div>
    )
  
  }

  export default Questions;

  const CenterMintButton = styled.button`
    margin: 0 auto;
    width: 100%;
  `