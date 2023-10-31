import React from 'react'
import twitterlogopath from '../../assets/twitter.png'
import telegramlogopath from '../../assets/telegram.png'

export default function SocialButton({show, social, score, style, room}) {

  const img = social == "twitter" ? twitterlogopath : telegramlogopath;
  const imgSize = social == "twitter" ? 100 : 90;
  const isRoom = room !== null && room !== undefined

  const handleSocial = () => {
    const url = "https://cz3003-space.web.app/"
    const api = social == "twitter" 
      ? "https://twitter.com/intent/tweet/?text=" 
      : `https://t.me/share/url?url=${url}&text=`

    const scoreMsg = score > 0 ? `Beat my ${score ? score : 0} score!` : ""
    const linkMsg =  "Come join me on Space Maze to learn more on SDLC!";
    const roomMsg = isRoom ? `I challenge you! Join room: ${room}` : ""

    const shareMsg = social == "twitter" 
        ? api + encodeURIComponent(isRoom ? `${linkMsg} ${roomMsg}\n${url}`: `${scoreMsg} ${linkMsg}\n\n${url}`)
        : api + encodeURIComponent(isRoom ? `\n${linkMsg}\n\n${roomMsg}` : `\n${linkMsg} ${scoreMsg}`)

    window.open(shareMsg);
  }
  
  let btnStyle = {
    display: `${show ? "block" : "none"}`,
    backgroundColor: "transparent",
    position: "absolute",
    left: `${social == "twitter" ? '-7rem' : '-11.5rem'}`,
    top:`${social == "twitter" ? '-0.8rem' : '-0.5rem'}`,
    border: "none",
    outline: "none",
    width: `${imgSize}px`,
    height: `${imgSize}px`,
    cursor: "pointer",
  }

  btnStyle = {...btnStyle, ...style}

  return (
    <button style={btnStyle} onClick={handleSocial}>
      <img src={img} alt="" width={imgSize} height={imgSize}/>
    </button>
  )
}
