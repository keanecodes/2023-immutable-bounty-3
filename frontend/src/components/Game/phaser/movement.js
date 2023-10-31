import { 
  PLAYER_SPEED, 
  SKELD_SHIP_HEIGHT, 
  SKELD_SHIP_WIDTH, 
  MIRA_SHIP_HEIGHT, 
  MIRA_SHIP_WIDTH, 
  POLUS_SHIP_HEIGHT, 
  POLUS_SHIP_WIDTH, 
  AIRSHIP_SHIP_HEIGHT, 
  AIRSHIP_SHIP_WIDTH, 
  ISLAND_SHIP_HEIGHT, 
  ISLAND_SHIP_WIDTH, 
} from './constants';
import { 
  skeldMapBounds,
  miraMapBounds,
  polusMapBounds,
  airshipMapBounds,
  islandMapBounds,
 } from './mapBounds';

 const findMapConstant = (map, type) => {
  switch(map) {
    case "The Skeld":
      return type === "bound" ? skeldMapBounds : [SKELD_SHIP_WIDTH, SKELD_SHIP_HEIGHT];
    case "Mira HQ":
      return type === "bound" ? miraMapBounds : [MIRA_SHIP_WIDTH, MIRA_SHIP_HEIGHT];
    case "Polus":
      return type === "bound" ? polusMapBounds : [POLUS_SHIP_WIDTH, POLUS_SHIP_HEIGHT];
    case "Airship":
      return type === "bound" ? airshipMapBounds : [AIRSHIP_SHIP_WIDTH, AIRSHIP_SHIP_HEIGHT];
    case "Island":
      return type === "bound" ? islandMapBounds : [ISLAND_SHIP_WIDTH, ISLAND_SHIP_HEIGHT];
    default:
      return type === "bound" ? skeldMapBounds : [SKELD_SHIP_WIDTH, SKELD_SHIP_HEIGHT];
  }
}

const isWithinMovementBoundaries = (x, y, map) => {
  const mapBounds = findMapConstant(map, "bound");
  return !mapBounds[y] ? true : !mapBounds[y].includes(x);
};

export const movePlayer = (keys, player, map, isProf) => {//added isProf as a parameter
  const [SHIP_WIDTH, SHIP_HEIGHT] = findMapConstant(map, "ship");

  const absPlayerX = player.x + SHIP_WIDTH / 2;
  const absPlayerY = player.y + SHIP_HEIGHT / 2 + 20;
  if (keys.includes('ArrowUp') && isProf == true) {
    player.y = player.y - PLAYER_SPEED;
  }
  else if(keys.includes('ArrowUp') && isWithinMovementBoundaries(absPlayerX, absPlayerY - PLAYER_SPEED,map)){
    player.y = player.y - PLAYER_SPEED;
  }


  if(isProf == true && keys.includes('ArrowDown')) {
    player.y = player.y + PLAYER_SPEED;
  }
  else if (keys.includes('ArrowDown') && isWithinMovementBoundaries(absPlayerX, absPlayerY + PLAYER_SPEED,map)){
    player.y = player.y + PLAYER_SPEED;
  }
  
  if(isProf == true && keys.includes('ArrowLeft')) {
    player.x = player.x - PLAYER_SPEED;
    player.list[0].flipX = true;
  }
  else if (keys.includes('ArrowLeft') && isWithinMovementBoundaries(absPlayerX - PLAYER_SPEED, absPlayerY,map)){
    player.x = player.x - PLAYER_SPEED;
    player.list[0].flipX = true;
  }
  
  if(isProf == true && keys.includes('ArrowRight')) {
    player.x = player.x + PLAYER_SPEED;
    player.list[0].flipX = true;
  }
  else if (keys.includes('ArrowRight') && isWithinMovementBoundaries(absPlayerX + PLAYER_SPEED, absPlayerY,map)){
    player.x = player.x + PLAYER_SPEED;
    player.list[0].flipX = false;
  }
};