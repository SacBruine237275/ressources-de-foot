import { SearchBar } from "../components/SearchBar";
import { Link } from 'react-router-dom';
import { Club } from "./Club";
import { WBK } from 'wikibase-sdk'


async function getClubName(){
  var requete:string=`
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX wd: <http://www.wikidata.org/entity/>

SELECT ?club (SAMPLE(?nom) AS ?nom) {
  ?club wdt:P118 wd:Q9448 ;
        wdt:P31 wd:Q476028 .
  ?club wdt:P1448 ?nom
}
GROUP BY ?club`;
  const wbk = WBK({
    instance: 'https://www.wikidata.org',
    sparqlEndpoint: 'https://query.wikidata.org/sparql'
  })
  const url:string = wbk.sparqlQuery(requete)
  const simplifiedResults:any = await fetch(url)
  .then(res => res.json())
  console.log(simplifiedResults)
}
export const Home=()=>{
  getClubName();
    return(
        <div>
        <h1>Test page d'acceuil</h1>
        <SearchBar/>
        <ul>
        <li><Link to={`/Club/Tottenham`}>Tottenham</Link></li>
        <li><Link to={`/Club/Asernal`}>Asernal</Link></li>
        <li><Link to={`/Club/City`}>Manchester City</Link></li>
        <li><Link to={`/Club/Liverpool`}>Liverpool</Link></li>
        <li><Link to={`/Club/AstonVilla`}>Aston Villa</Link></li>
        <li><Link to={`/Club/Brighton`}>Brighton</Link></li>
        <li><Link to={`/Club/WestHam`}>West Ham</Link></li>
        <li><Link to={`/Club/Newcastle`}>Newcastle</Link></li>
        <li><Link to={`/Club/CrystalPalace`}>Crystal Palace</Link></li>
        <li><Link to={`/Club/United`}>Manchester United</Link></li>
        <li><Link to={`/Club/Chelsea`}>Chelsea</Link></li>
        <li><Link to={`/Club/Fulham`}>Fulham</Link></li>
        <li><Link to={`/Club/NottmForest`}>Nottm Forest</Link></li>
        <li><Link to={`/Club/Wolves`}>Wolves</Link></li>
        <li><Link to={`/Club/Brentford`}>Brentford</Link></li>
        <li><Link to={`/Club/Everton`}>Everton</Link></li>
        <li><Link to={`/Club/LuttonTown`}>Lutton Town</Link></li>
        <li><Link to={`/Club/Brunley`}>Brunley</Link></li>
        <li><Link to={`/Club/Bournemouth`}>Bournemouth</Link></li>
        <li><Link to={`/Club/SheffieldUnited`}>Sheffield United</Link></li>
        </ul>
      </div>
    )
}