import React, { useState, useEffect } from "react";
import callWikidataAPI from "../Common/Function";
import { Link } from 'react-router-dom';


export const SearchBar = () => {
  const [DataSearchBar, setDataSearchBar] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const inputChange = async () => {
      if (searchText === "")
        setDataSearchBar([]);
      if (searchText !== "") {
        const requete = `
            PREFIX wdt: <http://www.wikidata.org/prop/direct/>
            PREFIX wd: <http://www.wikidata.org/entity/>
            SELECT ?joueur ?name ?club ?nom {
                {
                  ?joueur wdt:P54 ?club .
                  ?club wdt:P118 wd:Q9448 .
                  ?joueur wdt:P1559 ?name .
                  FILTER(contains(?name, "${searchText}")) .
                }
                UNION
                {
                  ?club wdt:P118 wd:Q9448 ;
                        wdt:P31 wd:Q476028 .
                  ?club wdt:P1448 ?nom .
                  FILTER(contains(?nom, "${searchText}"))
                }
              }`;
        const data = await callWikidataAPI(requete);
        setDataSearchBar(data.results.bindings);
      }
    };

    inputChange();
  }, [searchText]);

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un joueur ou un club"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ul>
        {DataSearchBar.map((result: any, index) => {
          var isJoueur: boolean = !!result.joueur;
          const partsOfUrl = isJoueur ? result.joueur?.value.split("/") : result.club?.value.split("/");
          var endString: string = partsOfUrl[partsOfUrl.length - 1];
          var link = isJoueur ? `/joueur/${endString}` : `/club/${endString}`
          var text = isJoueur ? result.name?.value : result.nom?.value;
          return (
            <li>
              <Link to={link}>{text}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
