import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bulma/bulma';

class App extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            list: [
                `Go to the store`,
                `Wash the dishes`,
                `Learn some code`
            ]
		};
		this.addItem = this.addItem.bind( this );
		this.removeItem = this.removeItem.bind( this );
	}
	
	addItem( e ) {
		// Prevent button click from submitting form.
		e.preventDefault();

		let list      = this.state.list;
		const newItem = document.getElementById( `addInput` );
		const form    = document.getElementById( `addItemForm` );

		// If new task is not empty...
		if (newItem.value !== ``) {
			list.push( newItem.value );
			this.setState( { list } );

			newItem.classList.remove( `is-danger` );
			form.reset();
		} else {

			// Make input field border red as warning.
			newItem.classList.add( `is-danger` );
		}
	}

	removeItem(item) {
		let list = this.state.list;

		// Filter list with tasks not matching given item.
		list = list.filter( ( task ) => task !== item );
		this.setState( { list } );
	}

    render() {
        return(
            <div className="content">
                <div className="container">
                    <section className="section">
						<List list={this.state.list} removeItem={ this.removeItem } />
                    </section>
                    <hr />
					<section className="section">
						<form className="form" id="addItemForm">
							<input
								type="text"
								className="input"
								id="addInput"
								placeholder="Something that needs ot be done..."
							/>
							<button className="button is-info" onClick={ this.addItem }>Add Item</button>
					</form>
					</section>
                </div>
            </div>
        )
    }
}

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filtered: []
		};
		this.handleChange = this.handleChange.bind( this );
	}

	componentDidMount() {
		this.setState( {
			filtered: this.props.list
		} );
	}

	componentWillReceiveProps(nextProps) {
		this.setState( {
			filtered: nextProps.list
		} );
	}

	handleChange(e) {
		// Get current list.
		let list = this.props.list;

		// If the search bar isn't empty...
		if (e.target.value !== ``) {

			// Filter list based on search term.
			list = list.filter( item => {

				// Change current item and search term to lowercase.
				const lc = item.toLowerCase();
				const filter = e.target.value.toLowerCase();

				// Check if current item include search term.
				return lc.includes(filter);
			});
		}

		this.setState( { filtered: list } );
	}

	render() {
		return (
			<div>
				<input type="text" className="input" onChange={ this.handleChange } placeholder="Search..." />
				<ul>
					{ this.state.filtered.map( item => (
						<li key={ item }>{ item } &nbsp;
							<span
								className="delete"
								onClick={ () => this.props.removeItem( item ) }
							/>
						</li>
					) ) }
				</ul>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById(`app`));