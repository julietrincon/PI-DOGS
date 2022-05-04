import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogsName } from '../../actions';
import styles from './SearchBar.module.css'
                                                                                                                                        
export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    
    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getDogsName(name));
        setName("")
    }

    return(
        <div>
            <input className={styles.input} type='text' value={name} placeholder='Enter the name...' onChange={(e) => handleInputChange(e)}/>
            <button className={styles.btn} type='submit' onClick={(e)=> handleSubmit(e)}>Search</button>
        </div>
    )
}