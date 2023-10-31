import React, { useState, useEffect } from "react";
import axios from "axios";

const Hints = ({ handleShowHints, topic, subtopic }) => {
  // const dispatch = useDispatch();
  const [hint, setHint] = useState("");
  // const ids = useSelector((state) => (state.form));

  // console.log(level, topic, subtopic); //kne: please try to remove testing console logs where possible

  useEffect(() => {
    // fetch(API_URL)
    //     .then(res => res.json())
    //      .then(data => {
    //          setQuestions(data.results);
    //         // console.log(data);
    //      });
    console.log("calling here");
    axios.get("/hint", { params: { topic, subtopic } }).then((data) => {
      console.log(data.data);
      // console.log(cleanUp(data)); //kne: please try to remove testing console logs where possible
      setHint(data.data);
    });
  }, []);

  return (
    <div className="sb-task-dialog-container">
      <div
        className="sb-task-dialog glow-border"
        aria-modal="true"
        role="dialog"
      >
        <div
          className="sb-task-header dashed"
          data-click
          onClick={handleShowHints}
        >
          <div className="game-header-title">
            <h2>Can you find the Question Master?</h2>
          </div>
        </div>
        <div>
          <h1>{hint}</h1>
        </div>
      </div>
    </div>
  );
};


export default Hints;
