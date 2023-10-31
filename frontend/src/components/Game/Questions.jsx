import React, { useState, useEffect } from 'react'
import Questionare from './Questionare';
import axios from 'axios'


const Questions = ({auth, tries, setTries, handlePoints,
                     returnDifficulty, handleShowQuestions, 
                     topic, subtopic, progress, setProgress, setRender}) => {

    // const dispatch = useDispatch();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameEnded, setGameEnded] = useState(false);

    // const ids = useSelector((state) => (state.form)); 
  
    // console.log(level, topic, subtopic); //kne: please try to remove testing console logs where possible
    
    useEffect(() => {
        // fetch(API_URL)
        //     .then(res => res.json())
        //      .then(data => {
        //          setQuestions(data.results);
        //         // console.log(data);
        //      });
        axios.get("/questions",{ params: { topic, subtopic } })
                .then(data => {
                    // console.log(data);
                    // console.log(cleanUp(data)); //kne: please try to remove testing console logs where possible
                    setQuestions(cleanUp(data));
                });        
    }, []);

    useEffect (() => {
      if(gameEnded === true)
      { 
        if(score === questions.length) {
          // console.log(subtopic); //kne: please try to remove testing console logs where possible
          setProgress(progress.concat(subtopic));
          let id = auth.user.bio.userId;
          let points = handlePoints(returnDifficulty(subtopic))
          axios.post("/user/update/score",{ params: { id, points } });
          // axios.post("/user/update/checkpoint",{ params: { topic, subtopic } });
          
          console.log(tries+" "+questions.length)
          let totalTries = Math.round(tries/questions.length);

          console.log(totalTries)
          axios.post("/user/update/progress",{ params: { topic, subtopic, totalTries, points, id } });

          setTries(0);
          setRender(true);
          // console.log(auth.user.bio.userId); //kne: please try to remove testing console logs where possible
          // console.log(progress); //kne: please try to remove testing console logs where possible
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
              <div className="sb-meta">The Skeld - Room: 12091923094</div>
            </div>
          </div>
          {gameEnded ? (
            <div>
              <h1>You got {score}/{questions.length}</h1>
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