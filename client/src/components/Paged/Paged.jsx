import React from "react";
import styles from './Paged.module.css'

export default function Paged({dogsPerPage, allDogs, pagedTotal}){
    const pageNumber = [];
    const paginado = Math.ceil(allDogs/dogsPerPage);

    for (let i = 1; i <= paginado; i++) {
        pageNumber.push(i)
    }

    return(
        <nav>
            <ul className={styles.paged}>
                {pageNumber?.map(number =>(
                    <div className={styles.container} key={number}>
                        <li className={styles.number} key={number}>
                            <a href onClick={()=> pagedTotal(number)} className={styles.total}>{number}</a>                        </li>
                    </div>
                ))}
            </ul>
          </nav>
    )
   }