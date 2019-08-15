import React from 'react';
import Logo from '../TheJournal.png'

export default class NavBar extends React.Component {


    state = {
        search: "",

    }

    submitted = (e) => {
        e.preventDefault();
        this.props.searchField(this.state.search)
    };
    changed = (e) => {
        this.setState({[e.target.id]: e.target.value});
    };

    clicked = (e) =>{
        console.log("countryChange", e.target.id);
        this.props.changeCountry(e.target.id);
    };

    returnHome = (e) =>{
        this.props.return();
    };

    render() {

        const countries = 'ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za ';
        const list = [];
        for (let i = 0; i < countries.length; i+=3) {
            list.push(
                <button className="dropdown-item" onClick={this.clicked} key={i} id={countries.substr(i,2)}>{
                    countries.substr(i,2)
                }</button>
            )
        }




        return (
            <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light MyNavBar">
                <a className="navbar-brand" href="#" onClick={this.returnHome}>
                    <img src={Logo} width="130" height="30" alt=""/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">My Blog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item dropdown float-right">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Change Country
                            </a>
                            <div className="dropdown-menu scrollable-menu" aria-labelledby="navbarDropdown">
                                {list}
                            </div>
                        </li>
                    </ul>
                </div>
                <form className="form-inline" onSubmit={this.submitted}>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                           id={"search"} onChange={this.changed}/>
                    <button className="btn btn-outline-secondary my-2 my-sm-0 " type="submit">Search</button>
                </form>
            </nav>
        )
    }
}
