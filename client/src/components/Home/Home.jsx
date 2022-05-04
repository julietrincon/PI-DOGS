import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, filterDogsCreated, filterDogTemp, getDogs, orderByName, orderByWeight } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paged from "../Paged/Paged";
import SearchBar from "../SearchBar/SearchBar"
import styles from './Home.module.css';

export default function Home(){
  const dispatch = useDispatch() //Despacho mis acciones.
  const allDogs = useSelector((state) => state.dogs) //Es lo mismo que hacer mapstatetoprops.
  
  //paginado
  const [currentPage, setCurrentPage] = useState(1); //Declaro un estado local.
  const [dogsPerPage, setDogsPerPage] = useState(8); //Cantidad de card por pagina.
  const indexOfLastDog = currentPage * dogsPerPage //Seteo el ultimo caracter 
  const indexOfFirstDog = indexOfLastDog - dogsPerPage
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog) //Declaro constante de los personajes a renderizar depende la pag, 

  const pagedTotal = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const allTemp = useSelector((state) => state.temperaments)

  const [orden, setOrden] = useState('') //Renderiza ordenamiento alfabeticamente.
  const [orden1, setOrden1] = useState('') //Renderiza ordenamiento por peso.
 
  useEffect(()=> {
    dispatch(getDogs());
  },[dispatch])

  useEffect(() => {
    dispatch(getTemperaments())
  },[])

  function handleClick(e){
    dispatch(getDogs());
  }

  function handleFilterCreated(e){
    e.preventDefault();
    dispatch(filterDogsCreated(e.target.value));
  }

  function handleFilterByTemp(e){
    e.preventDefault();
    dispatch(filterDogTemp(e.target.value));
  }

  function handleOrderByName(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1); //Seteo la pagina principal
    setOrden(`Ordenado ${e.target.value}`) //Se modifica el estado local
  }

  function handleOrderByWeight(e){
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrden1(`Ordenado ${e.target.value}`)
  }

  return(
    <div className={styles.home}> 
    <div className={styles.searchContainer}>

    <div className={styles.title}>
        <h1> SINGLE PAGE DOGS </h1>
        </div>

        <div>
        <Link to="/dog"><button className={styles.btn} >Create You Own Dog!</button></Link>
        </div>
        </div>

        <div>
         <SearchBar />
         </div>

        <div>
        <button className={styles.btn} onClick={(e) => handleClick(e)}> 
            Refresh 
        </button>
        </div>
         
    <hr className={styles.line}/>
    <div className={styles.filterContainer}/> 
   
      <select onClick={(e) => handleOrderByName(e)} className={styles.containerFilter}>
      <option value= 'Order by name'>Order by name</option>
        <option value= 'Asc'>A - Z</option>
        <option value= 'Desc'>Z - A</option>
      </select>

      <select onClick={(e) => handleOrderByWeight(e)} className={styles.containerFilter}>
      <option value= 'Order by weight'>Order by weight</option>
        <option value='Weight 1'>Small</option>
        <option value='Weight 2'>Big</option>
      </select>


      <div>
      <select onClick={(e) => handleFilterCreated(e)} className={styles.containerFilter}>
        <option value='Source'>Source</option>
        <option value='All'>All</option>
        <option value='Created'>Created</option>
      </select>
      </div>
      
      <select onClick={(e) => handleFilterByTemp(e)} className={styles.containerFilter}>
        <option value="">Filter by temperament</option>
        {allTemp.map((temp) => (
          <option key={temp.id} value={temp.name}>{temp.name}</option>
        ))}
      </select>

      
      <Paged
      dogsPerPage = {dogsPerPage}
      allDogs = {allDogs.length} //Valor númerico.
      pagedTotal = {pagedTotal}
      />

      
      {
        currentDogs?.map((element) => {
          return(
            <fragment className={styles.card}>
              <Link to={"/dogs/" + element.id}>
                <Card
                      name={element.name}
                      weight={element.weight}
                      image={element.image}
                      key={element.id}
                      temperament={
                        element.temperament
                        ? element.temperament
                        : element.temperaments && element.temperaments.map((temp) => temp.name.concat(" "))
                    }
                    />
              </Link>
            </fragment>
          )
        })}
   </div>
  )
};