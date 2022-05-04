import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

//Pagina inicial: deben armar una landing page con 
//Alguna imagen de fondo representativa al proyecto 
//Botón para ingresar al home (Ruta principal)

export default function LandingPage(){
    return(
        <div className={styles.divLanding}>
        <div>
            <h1 className={styles.tittleLandingCard}>Welcome to Doggy Doo 🐾</h1>
            <h2 className={styles.tittleLanding}>This is a responsive single page aplication developed using</h2>
            <h2 className={styles.tittleLanding}>Nodejs, React, Sequelize, Express and Redux.</h2>
            <h2 className={styles.tittleLanding}>It is designed with only css, as an individual project.</h2>
            <Link to = '/home'>
                <button className={styles.btn}>HOME</button>
            </Link>
        </div>
      </div>
    )
};