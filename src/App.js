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
	}
	
	addItem( e ) {
		// Prevent button click from submitting form.
		e.preventDefault();

		let list      = this.state.list;
		const newItem = document.getElementById(`addInput`);
		const form    = document.getElementById(`addItemForm`);

		// If new task is not empty...
		if (newItem.value !== ``) {
			list.push( newItem.value );
			this.setState( { list } );

			newItem.classList.remove(`is-danger`);
			form.reset();
		} else {

			// Make input field border red as warning.
			newItem.classList.add(`is-danger`);
		}
	}

    render() {
        return(
            <div className="content">
                <div className="container">
                    <section className="section">
                        <ul>
                            { this.state.list.map( item => (
                                <li key={ item }>{ item }</li>
                            ) ) }
                        </ul>
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

ReactDOM.render(<App />, document.getElementById(`app`));