import playerSprite from '../../../assets/player.png';
import pBLK from '../../../assets/pBLK.png';
import pBLU from '../../../assets/pBLU.png';
import pGRN from '../../../assets/pGRN.png';
import pORG from '../../../assets/pORG.png';
import pRED from '../../../assets/pRED.png';
import pWHT from '../../../assets/pWHT.png';
import pYLW from '../../../assets/pYLW.png';

import mSKD from '../../../assets/ship.png'
import mMRA from '../../../assets/miraResize.png'
import mPLS from '../../../assets/polusResize.png'
import mASP from '../../../assets/airshipResize1.png'
import mILD from '../../../assets/islandmapResize.png'
import {
  SKELD_PLAYER_START_X,
  SKELD_PLAYER_START_Y,
  SKELD_NPC_START_X,
  SKELD_NPC_START_Y,
  SKELD_NPC_START_X_1,
  SKELD_NPC_START_Y_1,
  SKELD_NPC_START_X_2,
  SKELD_NPC_START_Y_2,
  MIRA_PLAYER_START_X,
  MIRA_PLAYER_START_Y,
  MIRA_NPC_START_X,
  MIRA_NPC_START_Y,
  MIRA_NPC_START_X_1,
  MIRA_NPC_START_Y_1,
  MIRA_NPC_START_X_2,
  MIRA_NPC_START_Y_2,
  POLUS_PLAYER_START_X,
  POLUS_PLAYER_START_Y,
  POLUS_NPC_START_X,
  POLUS_NPC_START_Y,
  POLUS_NPC_START_X_1,
  POLUS_NPC_START_Y_1,
  POLUS_NPC_START_X_2,
  POLUS_NPC_START_Y_2,
  AIRSHIP_PLAYER_START_X,
  AIRSHIP_PLAYER_START_Y,
  AIRSHIP_NPC_START_X,
  AIRSHIP_NPC_START_Y,
  AIRSHIP_NPC_START_X_1,
  AIRSHIP_NPC_START_Y_1,
  AIRSHIP_NPC_START_X_2,
  AIRSHIP_NPC_START_Y_2,
  ISLAND_PLAYER_START_X,
  ISLAND_PLAYER_START_Y,
  ISLAND_NPC_START_X,
  ISLAND_NPC_START_Y,
  ISLAND_NPC_START_X_1,
  ISLAND_NPC_START_Y_1,
  ISLAND_NPC_START_X_2,
  ISLAND_NPC_START_Y_2,
} from "../phaser/constants";

export const spriteIdMap = {
  "npc": {
    label: "player",
    sprite: playerSprite
  },
  "pRED": {
    label: "Red",
    sprite: pRED
  },
  "pBLU": {
    label: "Blue",
    sprite: pBLU
  },
  "pBLK": {
    label: "Black",
    sprite: pBLK
  },
  "pYLW": {
    label: "Yellow",
    sprite: pYLW
  },
  "pGRN": {
    label: "Green",
    sprite: pGRN
  },
  "pORG": {
    label: "Orange",
    sprite: pORG
  },
  "pWHT": {
    label: "White",
    sprite: pWHT
  }
}

export const sceneIdMap = {
  "The Skeld": {
    startX: SKELD_PLAYER_START_X,
    startY: SKELD_PLAYER_START_Y,
    npcX: SKELD_NPC_START_X,
    npcY: SKELD_NPC_START_Y,
    npcX1: SKELD_NPC_START_X_1,
    npcY1: SKELD_NPC_START_Y_1,
    npcX2: SKELD_NPC_START_X_2,
    npcY2: SKELD_NPC_START_Y_2,
    img: mSKD
  },
  "Mira HQ": {
    startX: MIRA_PLAYER_START_X,
    startY: MIRA_PLAYER_START_Y,
    npcX: MIRA_NPC_START_X,
    npcY: MIRA_NPC_START_Y,
    npcX1: MIRA_NPC_START_X_1,
    npcY1: MIRA_NPC_START_Y_1,
    npcX2: MIRA_NPC_START_X_2,
    npcY2: MIRA_NPC_START_Y_2,
    img: mMRA
  },
  "Polus": {
    startX: POLUS_PLAYER_START_X,
    startY: POLUS_PLAYER_START_Y,
    npcX: POLUS_NPC_START_X,
    npcY: POLUS_NPC_START_Y,
    npcX1: POLUS_NPC_START_X_1,
    npcY1: POLUS_NPC_START_Y_1,
    npcX2: POLUS_NPC_START_X_2,
    npcY2: POLUS_NPC_START_Y_2,
    img: mPLS
  },
  "Airship": {
    startX: AIRSHIP_PLAYER_START_X,
    startY: AIRSHIP_PLAYER_START_Y,
    npcX: AIRSHIP_NPC_START_X,
    npcY: AIRSHIP_NPC_START_Y,
    npcX1: AIRSHIP_NPC_START_X_1,
    npcY1: AIRSHIP_NPC_START_Y_1,
    npcX2: AIRSHIP_NPC_START_X_2,
    npcY2: AIRSHIP_NPC_START_Y_2,
    img: mASP
  },
  "Island": {
    startX: ISLAND_PLAYER_START_X,
    startY: ISLAND_PLAYER_START_Y,
    npcX: ISLAND_NPC_START_X,
    npcY: ISLAND_NPC_START_Y,
    npcX1: ISLAND_NPC_START_X_1,
    npcY1: ISLAND_NPC_START_Y_1,
    npcX2: ISLAND_NPC_START_X_2,
    npcY2: ISLAND_NPC_START_Y_2,
    img: mILD
  }
}