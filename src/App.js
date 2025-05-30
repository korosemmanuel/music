import React, {useEffect} from "react";
import Home from "./components/pages/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./components/pages/Login";
import {ThemeContext, themes} from "./api/Theme";
import musicDB from "./db/music";
import {useDispatch, useSelector} from "react-redux";
import {setPlaylist} from "./action/actions";

const App = () => {

    const {language} = useSelector(state => state.musicReducer);

    const dispatch = useDispatch();
    useEffect(()=>{
        if (language === null || language.includes("any")){
            dispatch(setPlaylist(musicDB))
        }
        else if (language.includes('kenyan_music')){
            alert("No kenyan-music tracks available")
        } else {
            let x = musicDB.filter((item)=>(
                item.lang && language.includes(item.lang.toLowerCase())
            ))
            dispatch(setPlaylist(x))
        }
    },[dispatch, language]);

    return (
        <ThemeContext.Provider value={themes.light}>
            <>
                <Router>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <Route path="/home" component={Home}/>
                    </Switch>
                </Router>
            </>
        </ThemeContext.Provider>
    );
}

export default App;
