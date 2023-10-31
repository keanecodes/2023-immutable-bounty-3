import React, { useState, useEffect } from 'react';
import { 
  getSubtopicsDifficulty, 
  getWorldsInfoQuestions
} from '../../store/questions'
import Questions from './Questions';
import Hints from './Hints';
import { 
  getCollision,
  getCollision1,
  getCollision2 
} from "./phaser/scene";
import { NONE } from 'phaser';

import axios from 'axios'

export default function GameWorldStation({ setRender }) {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestions, setOptionsOverlay]  = useState(false)
  const [subtopics, setSubtopics] = useState([])
  const [worldQns, setWorldQns] = useState({})
  const [showHints, setHintsOverlay]  = useState(false)
  let showQsn = false;

  const [topic, setTopic] = useState('')
  const [subtopic, setSubtopic] = useState('')
  const [difficulty, setDifficulty] = useState([])

  const [tries, setTries] = useState(0);
  const [points, setPoints] = useState(0)
  const [progress, setProgress] = useState([])
  const handleShowQuestions = () => setOptionsOverlay(!showQuestions)
  const handleShowHints = () => setHintsOverlay(!showHints)

  const onLoad = async () => {
     // const worldQns = await getWorldsInfoQuestions(auth?.world)
     const worldQns = await getWorldsInfoQuestions("The Skeld")
     setWorldQns(worldQns)
     // setSubtopics(Object.keys(worldQns[auth?.world].subtopics))
     setSubtopics(Object.keys(worldQns["The Skeld"]?.subtopics))
    //  const diffi = await getSubtopicsDifficulty(
     const diffi = await getSubtopicsDifficulty(
       worldQns["The Skeld"]["topic_path"], 
       Object.keys(worldQns["The Skeld"].subtopics));
       // worldQns[auth?.world]["topic_path"], 
       // Object.keys(worldQns[auth?.world].subtopics));
     setDifficulty(diffi)
  }

  useEffect(() => {
    onLoad();
  }, []);

  const handleQuestions = (topic, subtopic) => {
    setTopic(topic);
    setSubtopic(subtopic);

    // setDifficulty(level);
    if (getCollision()==true && subtopics[0]==subtopic){
      showQsn=true;
      // console.log("1"+ getCollision());
      handleShowQuestions();
    }
    else if (getCollision1()==true && subtopics[1]==subtopic){
      showQsn=true;
      // console.log("2" + getCollision1());
      handleShowQuestions();
    }
    else if (getCollision2()==true && subtopics[2]==subtopic){
      showQsn=true;
      //console.log("3" + getCollision2());
      handleShowQuestions();
    }
    else{
      showQsn=false;
      handleHints(topic, subtopic);
    }
  }

  const handleHints = (topic, subtopic) => {
    setTopic(topic);
    setSubtopic(subtopic);
    // console.log("handling hints");
    handleShowHints();
  }

  const handlePoints = (level) => {
    switch(level){
      case "easy": 
        // setPoints(50);
        return 50;

      case "medium": 
        // setPoints(100);
        return 100;

      case "hard": 
        // setPoints(150);
        return 150;

      default: 
        return 0;
    }
  }

  const handleNextTopic = () => {
    // const newIndex = currentIndex + 1;

    console.log(progress+" "+subtopics.length)

    // if(newIndex >= topicsPaths.length) {
    //   return;
    //   setCurrentIndex(newIndex-1);
    //     //setGameEnded(true);
    // }

    // if(progress.length >= subtopics.length) {
    //   setProgress([]);
    //   // setCurrentIndex(newIndex);
    //   if (auth?.worlds.findIndex(w => w = auth?.world)+1 < auth?.worlds.length)
    //     setAuth({
    //       ...auth, 
    //       world: auth?.worlds[auth?.worlds.findIndex(w => w = auth?.world)+1]
    //     })
    // }

    
  }

  const returnDifficulty = (stopic) => {
    return difficulty.find((e) => {
      return e.subtopic === stopic
         })?.difficulty
  }


  return (
    <div className="sb-categoryList">
      <div className="sb-category sb-table" data-id="The Deck" data-sb="true" data-type="sb-category" data-unsorted="true">
          <h2><sb-var data-var="id">{worldQns["The Skeld"]?.topic}</sb-var></h2>
          {
           subtopics.length > 0 ?  
            subtopics.map((stopic, index) => (
              progress.find((e) => e === stopic ) ? 
              (
                <div key={`${worldQns["The Skeld"]?.topic}-${subtopic}-${index}`} data-id="misc-magic" data-sb="true" data-type="sb-task" data-solved="true" data-description="file -P name=1000 -m flag.mgc the_flag.txt" data-label="easy" data-click="setTaskActive/true" data-submit="submitFlag" className="sb-task glow-border" style={{cursor: "default"}}>
                  <sb-task-details role="button">
                    <h4><sb-var data-var="name">{stopic}</sb-var></h4>
                    <sb-meta>
                      <sb-var data-var="label">{returnDifficulty(stopic)}</sb-var>
                    </sb-meta>
                  </sb-task-details>
                  <sb-task-stats>
                    <h3>Completed</h3>
                  </sb-task-stats>
                </div>
              ): 
              (
                <div key={`${worldQns["The Skeld"]?.topic}-${subtopic}-${index}`} data-id="misc-magic" data-sb="true" data-type="sb-task" data-name="Requirement Analysis" data-description="file -P name=1000 -m flag.mgc the_flag.txt" data-label="easy" data-click="setTaskActive/true" data-submit="submitFlag" className="sb-task glow-border" 
                  onClick={() => handleQuestions(worldQns["The Skeld"]["topic_path"], stopic)} >
                  <sb-task-details role="button">
                    <h4><sb-var data-var="name">{stopic}</sb-var></h4>
                    <sb-meta>
                    <sb-var data-var="label">{returnDifficulty(stopic)}</sb-var>
                    </sb-meta>
                  </sb-task-details>
                  <sb-task-stats>
                    <h3><sb-var data-var="points">{handlePoints(returnDifficulty(stopic))}</sb-var>pt</h3>
                  </sb-task-stats>
                </div>
              )
            )
          ) : <h1>Loading...</h1>
          }
          <div v-if="showQsn">
          { showQuestions ? <Questions  tries={tries} 
                                        setTries={setTries} 
                                        handlePoints={handlePoints} 
                                        setRender={setRender} 
                                        // auth={auth} 
                                        handleShowQuestions={handleShowQuestions} 
                                        // topic={worldQns[auth?.world]["topic_path"]} 
                                        topic={worldQns["The Skeld"]["topic_path"]} 
                                        subtopic={subtopic} 
                                        progress={progress} 
                                        setProgress={setProgress}
                                        returnDifficulty={returnDifficulty}/> : null } 
          </div>
          <div v-else>
          { showHints ? <Hints  setRender={setRender} 
                                handleShowHints={handleShowHints} 
                                topic={worldQns["The Skeld"]["topic_path"]} 
                                subtopic={subtopic} /> : null } 
          </div>
          
      </div>
    </div>
      // </sb-content>
    // </div>
  )
}



