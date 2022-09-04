import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css"
import { StyleRegistry } from "styled-jsx";




//Defining a function that fetches data from endpoint
//Can make the function asynchronous but decided against, implemented "catch" to see real time data flow 
//interruptions

const fetchData = () => {
  //I am passing in a URL to a known JSON format object. Pass in your own local host in the Getter URL
  return axios.get("https://rickandmortyapi.com/api/character").then((res) => {
    //show data in the console window to see the data object first. 
    console.log(res);
    //the way this data is formatted requires a destructuring
    const { results } = res.data;
    //We then console log the destructured JSON object and are able to access the datapoints.
    console.log(results);
    return results;

  }).catch((err) => console.error(err))
}

export default function Home() {

  //Bind the data to a useState Hook in React, to ensure that we have the correct timestamps
  const [timestamps, setTimestamps] = React.useState([]);

  //This function runs on page reload, twice. Your fetch data function will run repeatedly while contained 
  //within this functional component.
  useEffect(() => {
    fetchData().then((apiEndpoint) => {
      //setting timestamps equal to the result of the FetchData function
      setTimestamps(apiEndpoint);
    })
  }, [])

  const fourCards = timestamps.slice(0, 4)

  console.log(fourCards)

  return (
    <>
      {/* Parent container */}
      <div className={styles.container}>
        {/* Left hand side of the screen */}
        {/* Change this div to be the Chart */}
        <div>
          <div className={styles.chart}></div>
        </div>
        {/* Right hand side of the screen */}
        <div className={styles.cardContainer}>
          {fourCards.map((person, personIdx) => (
            <div key={personIdx} className={styles.card}>

              <img src={person.image} style={{ width: 40, height: 40, borderRadius: 100 }} />

              <h1 className={styles.cardTitle}>{person.name}</h1>
              {person.gender === "Female" ? <h1 style={{ fontSize: 12 }}>Currently Online ✅</h1> : person.gender === "Male" ? <h1 style={{ fontSize: 12 }}>Currently Offline ❌</h1> : null}
              <p style={{ fontSize: 12 }}>lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
