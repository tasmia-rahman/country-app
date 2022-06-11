import React, { useState,useEffect } from 'react'

const Search = (props) => {
    const [searchCountry, setSearchCountry] = useState("");

    const handleChange = (e) => {
        setSearchCountry(e.target.value);
    }

    useEffect(() => {
        props.onSearch(searchCountry);
      }, [searchCountry]) // eslint-disable-line react-hooks/exhaustive-deps
      
  return (
    <div style={{textAlign: 'center'}}>
        <input type='text' placeholder='Search country...' value={searchCountry} onChange={handleChange} />
    </div>
  )
}

export default Search