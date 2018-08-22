import React, {Component} from 'react';

class Book extends Component {
    constructor () {
        super();
        this.state = { shelf: 'none' };
    }


    componentDidMount () {
        const { shelf } = this.props;
        this.setState({ shelf });
    };

    changeBookShelf (value) {
        const { updateBookShelf } = this.props;
        updateBookShelf(this.props, value);
        this.setState({ shelf: value });
    };


    render () {
        const { title, authors, imageLinks } = this.props;
        const { thumbnail } = imageLinks;
        const { shelf } = this.state;

        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={ { width: 128, height: 193,
                         backgroundImage: `url(${thumbnail})`,

                         backgroundSize: 'cover'  } }>
                    </div>
                    <div className="book-shelf-changer">
                        <select
                            value={ shelf }
                            onChange={ (event) => this.changeBookShelf(event.target.value) }
                        >
                            <option value="move" disabled>Where should I put it...</option>
                            <option value="currentlyReading">Currently Reading?</option>
                            <option value="wantToRead">Do I Want to Read it?</option>
                            <option value="read">Finished Reading?</option>
                            <option value="none">Goodbye book 😞</option>
                            <option value="move" disabled>you will not be forgotten...</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{ title }</div>
                <div className="book-authors">{ authors }</div>
            </div>
        );
    }
}

export default Book;