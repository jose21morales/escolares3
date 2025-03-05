import React, { useState } from 'react'
import axios from 'axios'

export default function SearchBar({ setResults }) {
    const [input, setInput] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value)
    }
    const handleSearch = async (e) => {
        e.preventDefault()
        if (!input.trim()) return

        try {
            const res = await axios.get(`http://localhost:5000/api/auth/search`,{
                params: {q: input}
            })
            setResults(res.data)
        } catch (error) {
            console.log('Error fetching search: ', error)
        }
    };

/*     useEffect(()=>{
        console.log("Updated results:", results)
    }, [results]) */
  
    return (
        <div>
            <form onSubmit={handleSearch} className="d-flex" role="search" id="search">
                <input
                className="form-control me-2"
                type='text'
                name="search"
                onChange={handleChange}
                placeholder='Buscar...'
                value={input}
                />
                <button className="btn btn-outline-success">Buscar</button>
            </form>
        </div>
    );
}