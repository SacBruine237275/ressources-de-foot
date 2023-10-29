import { SearchBar } from "../components/SearchBar";
import { Link } from 'react-router-dom';
import { Club } from "./Club";
import { WBK } from 'wikibase-sdk'
import { useState, useEffect } from "react";
import callWikidataAPI from "../Common/Function";

export const Home = () => {
  const [DataClubName, setDataClubName] = useState([]);
  useEffect(() => {
    const getClubName = async () => {
      var requete: string = `
        PREFIX wdt: <http://www.wikidata.org/prop/direct/>
        PREFIX wd: <http://www.wikidata.org/entity/>
        
        SELECT ?club (SAMPLE(?nom) AS ?nom) {
          ?club wdt:P118 wd:Q9448 ;
                wdt:P31 wd:Q476028 .
          ?club wdt:P1448 ?nom
        }
        GROUP BY ?club`;
      var data = await callWikidataAPI(requete);
      setDataClubName(data.results.bindings)
    }
    getClubName();
  }, []);
  return (
    <div className="flex flex-col pl-4">
      <SearchBar />
      <div className="mb-2">
      <ul>
        {DataClubName.map((clubData: any, index: number) => {
          const partsOfUrl = clubData.club.value.split("/");
          var endString: string = partsOfUrl[partsOfUrl.length - 1];
          return (
            <li className="mb-1"><Link to={`/Club/${endString} `} className="text-lg">{clubData.nom.value}</Link></li>
          );
        })}
      </ul>
      </div>
    </div>
  )
}