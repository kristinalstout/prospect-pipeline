"use client"

const Search = ({setSearchValue}) => {

    function handleChange(e){
        setSearchValue(e.target.value)
    }

    return (
        <form className="search-bar">
            <input 
                type="text"
                id="search"
                placeholder="Search jobs, customers, tasks"
                onChange={handleChange}
                />
            <button className="glass" type="submit">
                🔎
            </button>
        </form>
    );
};

export default Search;