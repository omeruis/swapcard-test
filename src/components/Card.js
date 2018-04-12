import React, { Component  } from 'react';

class Card extends Component {

     styles = {
        imageStyles: {
            maxWidth: 280,
            minHeight: 200,
            maxHeight: 200
        },
        trackStyles: {
            minHeight: 130,
            overFlow: 'hidden'
        }
    };

    render() {
        if(this.props.imageURL){
            return (
                <div className="card mt-5" key={this.props.id}>
                    <img
                        className="card-img-top"
                        src={this.props.imageURL}
                        alt="Card image cap"
                        style={this.styles.imageStyles}
                    />
                    <div className="card-body">
                        <h4 className="card-title">{this.props.name}</h4>
                        <p className="card-text"></p>
                        <button
                            href="#"
                            className="btn btn-outline-success"
                            onClick={this.props.onClickHandler}>
                            {this.props.text}
                        </button>
                    </div>
                </div>
            )
        } else {
            return <div className="card mt-5" key={this.props.id}>
                <div className="card-body" style={this.styles.trackStyles}>
                    <h4 className="card-title">{this.props.name}</h4>
                    <p className="card-text" />
                </div>
            </div>;
        }
    }
}

export default Card;