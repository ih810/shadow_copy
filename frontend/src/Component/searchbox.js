import React from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
        };

    }
    render() {
        console.log("this is from srchbox", this.props);

        const filteredItems = this.props.classrooms.map((i) => {
            console.log(i);
            // return item.title
        })
       
        return (
            <div>
                <Typeahead
                // {/* <i className="fas fa-search"></i>
                    id="basic-example"
                    onChange={(selected) => {
                        this.setState({selected});
                      }}

                    
                    options={filteredItems}
                    
                    placeholder="Choose a state..."
                    selected={this.state.selected}
                />
                
            </div>
        )
    }
}