import React from "react";

export default class Card extends React.Component {

    state = {
        image: this.props.data.urlToImage
    };

    componentWillReceiveProps(nextProps) {
        // Any time props.email changes, update state.
        if (nextProps.data.urlToImage !== this.props.data.urlToImage) {
            this.setState({
                image: nextProps.data.urlToImage
            });
        }
    }

    render() {
        var newImg;
        if(this.state.image.charAt(4)!=='s'){
            newImg = this.state.image.substr(0,4) + 's' + this.state.image.substr(5);
            console.log(newImg);
        }else
            newImg= this.state.image;


        return newImg==null ?
            (
                <div className="card mb-3">
                    <div className="card-body">
                        <h3 className="card-title">{this.props.data.title}</h3>
                        <a href={this.props.data.url}>
                            <h6 className="card-subtitle mb-2 text-muted">{this.props.data.source.name}</h6>
                        </a>
                        <p className="card-text">{this.props.data.description}</p>
                        <p className="card-text"><small className="text-muted">{this.props.data.author}</small></p>
                        <a href="#" className="card-link">read more</a>
                    </div>
                </div>
            ) : (
                <div className="card mb-3">
                    <img src={this.props.data.urlToImage} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h3 className="card-title">{this.props.data.title}</h3>
                        <a href={this.props.data.url}>
                            <h6 className="card-subtitle mb-2 text-muted">{this.props.data.source.name}</h6>
                        </a>
                        <p className="card-text">{this.props.data.description}</p>
                        <p className="card-text"><small className="text-muted">{this.props.data.author}</small></p>
                        <a href="#" className="card-link">read more</a>
                    </div>
                </div>
            )
    }

}
