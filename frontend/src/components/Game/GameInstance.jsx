import React, { useEffect, useState } from "react";
import Phaser from "phaser";
import MyGame from "./phaser/scene";

export default function GameInstance({setGame, game }) {
  // const auth = useRecoilValue(userAuth)
  const [instanceRoom, setInstanceRoom] = useState("00000000")
  const [instanceWorld, setInstanceWorld] = useState("The Skeld")
  useEffect(() => {
    // if (game == null && auth.isAuthenticated) {
    if (game == null) {
      const user = {
        "displayName": "",
        "playerStartY": 100,
        "sprite": "pWHT",
        "playerStartX": 330,
        "userId": "b2ZmdFPAbWbbT78Eh0Wdrqraggp2",
        "email": "USER@eMAIL.COM",
        "score": 50,
        "lastLoginOn": "2023-10-31T13:23:32.134Z",
        roomNum: '00000000',
        world: "The Skeld",
        worlds: "",
        topics: "Requirements Engineering"
      }
      // const user = {
      //   ...auth?.user?.bio,
      //   roomNum: auth?.roomNum,
      //   world: auth?.world,
      //   worlds: auth?.worlds,
      //   topics: auth?.topics
      // }
      // if (user.roomNum == auth?.roomNum) {
        var instance = new Phaser.Game({
          
          type: Phaser.AUTO,
          parent: "phaser",
          width: 800,
          height: 600,
          scene: MyGame,
          physics: {
            default: "arcade",
            gravity: { y: 0 },
          },
          callbacks: {
            postBoot: function (game) {
              setGame(game);
              setInstanceRoom(user?.roomNum)
              setInstanceWorld(user?.world)
            },
          },
        });
      // }
      instance.config.user = user;
    // } else if (game && (instanceRoom != auth?.roomNum || instanceWorld != auth?.world)) {
    } else if (game) {
      game.destroy(true)
      setGame(null)
    }
    // }
  // }, [game]);
  }, []);

  if (import.meta.hot) {
    import.meta.hot.accept(() => {});

    import.meta.hot.dispose(() => {
      window.location.reload();
    });
  }

  return <></>;
}
