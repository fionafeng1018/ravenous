import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            term:'',
            location:'',
            sortBy:'best_match'
        }

        //has to use this. to change it from a local variable to a member variable
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    //This function is used to change the css style when the user selects a sortby option
    //returns the current CSS class for a sorting option
    getSortByClass(sortByOption){
        if(this.state.sortBy === sortByOption){
            return 'active';
        }
            return '';   
    }
    //This function sets the state of a sorting option
    //his method will be useful when communicating with the Yelp API in the future.
    handleSortByChange(sortByOption){
        this.setState({
            sortBy: sortByOption
        })
    }

    handleTermChange(event){
        this.setState({
            term: event.target.value
        })

    }

    handleLocationChange(event){
        this.setState({
            location: event.target.value
        })
    }

    handleSearch(event){
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);

        event.preventDefault();
    }

    renderSortByOptions(){
        return Object.keys(this.sortByOptions).map(sortByOption => {
        //Object.keys(sortByOptions) output is ['Best Match', 'Highest Rated', 'Most Reviewed']

            let sortByOptionValue = this.sortByOptions[sortByOption];

            return (<li className={this.getSortByClass(sortByOptionValue)} 
                        key={sortByOptionValue} 
                        onClick={this.handleSortByChange.bind(this,sortByOptionValue)}> 
                     {sortByOption}
                   </li>);

        });
    }

    render(){
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input onChange={this.handleTermChange} placeholder="Search Businesses" />
                    <input onChange={this.handleLocationChange} placeholder="Where?" />
                </div>
                <div className="SearchBar-submit">
                    <a onClick={this.handleSearch}>Let's Go</a>
                </div>
            </div>
        )
    }
}

export default SearchBar;