import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { passportInstance, fetchAuth } from "../immutable";

export default function Toolbar({setTab}) {
  const [user, setUser] = useState(undefined)
  const navigate = useNavigate()

  const checkUserLoggedIn = async () => {
    const userProfile = await passportInstance.getUserInfo();
    Boolean(userProfile !== undefined) && setUser(() => {
      setTab('game')
      navigate("/game")
      return {
        nickname: userProfile?.nickname,
        email: userProfile?.email,
        // accessToken: accessToken,
        // idToken: idToken,
        sub: userProfile?.sub,
      }
    });
  };
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const menuClick = async () => {
    await fetchAuth() && checkUserLoggedIn();
  }

  const logOut = async () => {
    Boolean(user !== undefined) 
      && await passportInstance.logout();
    setTab('home')
    navigate('/')
  }

  const handleTabClick = (e) => {
    setTab(e.currentTarget.attributes.href.textContent)
  }

  return (
    <div className="toolbar">
      <Link to='game' onClick={handleTabClick}>Game</Link>
      <Link to='redeem' onClick={handleTabClick}>Redeem</Link>
      <div className="logo" onClick={user === undefined ? menuClick : null}>
        <LogoLink to='game' className="logo-link" />
      </div>
      <Link onClick={logOut} className="sb-login-link" data-team-name={user?.email ?? '-'}/>
    </div>
  );
}

const LogoLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: block;
  border: none;
`
