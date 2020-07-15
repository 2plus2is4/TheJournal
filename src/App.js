import React from 'react';
import NavBar from "./components/NavBar";
import Feed from "./components/Feed";
import ScrollButton from './components/ScrollButton';
import Axios from "axios";
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Card from "./components/Card";

export default class App extends React.Component {

    state = {
        url: "",
        articles: "",
        keyword: "",
        country: ""
    };
    searching = (keyword) => {
        this.setState({keyword: keyword});
    };

    changeCountry = (country) => {
        this.setState({country: country})
    };

    return = () =>{
        this.setState({keyword: ""})
    };

    getFeed = (props) => {
        return (
            <Feed
                keyword={this.state.keyword} country={this.state.country}
                {...props}
            />
        );
    };

    render() {

        return (
            <BrowserRouter>
                <div className="App">
                    <NavBar searchField={this.searching} changeCountry={this.changeCountry} return={this.return}/>
                    <Route exact path="/"
                           render={this.getFeed} />
                    <Route path={""} />
                    <ScrollButton scrollStepInPx="50" delayInMs="8.66"/>
                    {/*<Feed keyword={this.state.keyword} country={this.state.country}/>*/}
                </div>
            </BrowserRouter>
        );
    }
}
