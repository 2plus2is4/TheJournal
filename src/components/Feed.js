import React from 'react';

import Card from "./Card";
import Axios from "axios";

export default class Feed extends React.Component {

    countries = 'ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za ';

    state = {
        url: "",
        articles: "",
        status: "nope",
        country: "",
        keyword: "",
        site: "https://the-journal.web.app/",
        pages: 0,
        delayInMs: 8.66,
        intervalId: 0
    };

    getNews(url) {
        this.setState({url: url});
        Axios.get(url).then(res => {
            console.log(res.data);
            var pagesNumber = res.data.totalResults / 20;
            this.setState({articles: res.data, status: "ok", pages: pagesNumber, url: url});
            console.log("finished getshit");
        }).catch(function (err) {
            console.log(err);
        });

        console.log(this.state);
    }

    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }

    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.state.delayInMs);
        this.setState({ intervalId: intervalId });
    }

    Headlines() {
        var url;
        var country;
        Axios.get("https://ipapi.co/json/").then(
            res => {
                
                console.log("ip api test", res.data);
                if (!this.state.country) {
                    country = res.data.country.toLowerCase();
                    if (this.countries.indexOf(country) < 0) {
                        country = 'us';
                    }
                    
                }
                else country = this.state.country;
                this.setState({country: country, url: url});
                url = 'https://newsapi.org/v2/top-headlines?' +
                    'country=' + country + '&' +
                    'apiKey=aa16bc71ee6d4276b235f64657d83784';
                this.getNews(url);
            }
        ).then(res => {
            console.log(res.data);
            const pagesNumber = res.data.totalResults / 20;
            this.setState({articles: res.data, status: "ok", pages: pagesNumber, url: url});
            console.log("finished getnews");
        }).catch(err => {
            console.log(err);
        });

    }

    searchingTopics(keyword) {
        console.log("IM IN");
        var url = 'https://newsapi.org/v2/everything?'
            + 'q=' + keyword
            + '&apiKey=aa16bc71ee6d4276b235f64657d83784';
        this.getNews(url);
    }


    componentDidMount() {
        console.log("MOUNTED");
        this.Headlines();
    }


    componentWillReceiveProps(nextProps) {
        // Any time props.email changes, update state.
        console.log("PROPSCHANGED", this.props, nextProps);
        if (nextProps.country !== this.props.country) {
            this.setState({
                country: nextProps.country
            });

            this.Headlines();
        }else if(nextProps.keyword !== this.props.keyword){
            this.setState({
                keyword: nextProps.keyword
            });
            if(nextProps.keyword!=="")
                this.searchingTopics(nextProps.keyword);
            else
                this.Headlines();
        }
        console.log("AFTERCHANGE", this.state);
        this.scrollToTop();
    }

    render() {

        const news = [];
        if (this.state.status === "ok") {
            for (let i = 0; i < this.state.articles.articles.length; i++) {
                news.push(<Card data={this.state.articles.articles[i]} key={i}/>)
            }
            return (
                <div>
                    {news}
                </div>
            );
        } else if (this.state.status === "nope")
            return (
                <h3>LOADING..</h3>
            );
        else
            return (
                <h3>SMTHISWRNG</h3>
            );

    }

}
