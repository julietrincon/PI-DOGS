import React from 'react';
import styles from './Card.module.css'

export default function Card({image, name, temperament, weight}){
    return(
        
        <div className= {styles.divCard}>
            <img src={image} className={styles.imgCard} alt='Img not found' width="200px" height="250px" />
            <h3 className={styles.tittleDesCard}>{name.toUpperCase()}</h3>
            <h3 className={styles.desCard}>Weight: {weight} kg.</h3>
            <h3 className={styles.desCard}>Temperament: {temperament}.</h3>
        </div>
    );
}