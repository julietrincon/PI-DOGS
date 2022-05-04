import React from "react";
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {dogDetail} from "../../actions";
import styles from "./Detail.module.css";


export default function Detail(props) {
  console.log(props)
  const dispatch = useDispatch()

  const {id} = useParams()

  useEffect(() => {
      dispatch(dogDetail(id)) //accedo al id por medio de useParams.
  }, [dispatch, id])
  
  const myDog = useSelector((state) => state.detail) // me traigo el estado detail desde el reducer con useSelector

return (
  <div className={styles.bkg}> 
   <div className={styles.container}>
      { 
      myDog.length > 0 ?
      <div className={styles.detailContainer}> 
       <h1 className={styles.title}>{myDog[0].name} </h1>  
       <img className={styles.image} src = {myDog[0].image} alt="Img not found" width="200px" height="250px" />  
       <p className={styles.text}> Temperaments: {!myDog[0].createdInDb? myDog[0].temperament + " " : myDog[0].temperaments.map(el => el.name + (" "))}</p>  
       <p className={styles.text}> Height: {myDog[0].height} Cm</p> 
       <p className={styles.text}> Weight: {myDog[0].weight} Kg </p> 
       <p className={styles.text}> Life span: {myDog[0].createdDb? myDog[0].life_span + "years" : myDog[0].life_span}  </p>
      </div> : <p className={styles.text}> LOADING... </p>                                                          
  }
   </div>
   <div className={styles.back}>
        <Link to="/home"><button className={styles.backbutton}>Back</button></Link>
        </div>
    </div>
  )
}