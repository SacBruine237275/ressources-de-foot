import { useParams } from "react-router-dom";

export const Joueur=()=>{
    const { id } = useParams();
    var requeteInfoJoueur:string=`
    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
    PREFIX wd: <http://www.wikidata.org/entity/>
        Select ?name ?image ?countryName ?positonName{
        wd:${id} wdt:P1559 ?name ; 
        wdt:P18 ?image ; 
        wdt:P413 ?postion ;
        wdt:P1532 ?countryID .
        ?countryID wdt:P1448 ?countryName .
        ?postion rdfs:label ?positonName .
        FILTER(LANG(?positonName) = "en")
      }`;
      var requeteGetTeamPlayer:string=`
      PREFIX wdt: <http://www.wikidata.org/prop/direct/>
      PREFIX wd: <http://www.wikidata.org/entity/>
      SELECT ?teamName{
        wd:${id} wdt:P54 ?team .
        ?team rdfs:label ?teamName .
      FILTER(LANG(?teamName) = "en")
      }`
      var requeteGetRecompensePlayer:string=`
      PREFIX wdt: <http://www.wikidata.org/prop/direct/>
      PREFIX wd: <http://www.wikidata.org/entity/>
      SELECT ?recompenseName{
        wd:${id} wdt:P166 ?recompense.
        ?recompense rdfs:label ?recompenseName.
        FILTER(LANG(?recompenseName) = "en")
    }`
    var requeteGetNominatedPlayer:string=`
    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
    PREFIX wd: <http://www.wikidata.org/entity/>
    SELECT ?nominatedName{
        wd:${id} wdt:P1411 ?nominated.
        ?nominated rdfs:label ?nominatedName.
        FILTER(LANG(?nominatedName) = "en") .
}
`
    return(
        <div>
            Joueur avec l'id : {id}
        </div>
    )
}