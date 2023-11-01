import { useParams } from "react-router-dom";
import callWikidataAPI from "../Common/Function";
import { useEffect, useState } from "react";
import PlayerInfo from "../Common/IPlayerInfo";

export const Joueur = () => {
    const { id } = useParams();
    const [PlayerName, setPlayerName] = useState('');
    const [PlayerCountry, setPlayerCountry] = useState('');
    const [PlayerImage, setPlayerImage] = useState('');
    const [PlayerPosition, setPlayerPosition] = useState('');

    const [DataTeams, setDataTeams] = useState([]);
    const [DataRecompense, setDataRecompense] = useState([]);
    const [DataNomination, setDataNomination] = useState([]);

    useEffect(() => {
        const setDataPlayer = (Data: PlayerInfo) => {
            setPlayerName(Data.name.value)
            setPlayerCountry(Data.countryName.value)
            setPlayerImage(Data.image.value)
            setPlayerPosition(Data.positonName.value)
        }
        const getPlayerInfo = async () => {
            var requeteInfoJoueur: string = `
        PREFIX wdt: <http://www.wikidata.org/prop/direct/>
        PREFIX wd: <http://www.wikidata.org/entity/>
        Select ?name ?image ?countryName ?positonName{
            wd:${id} wdt:P1559 ?name ; 
            wdt:P18 ?image ; 
            wdt:P413 ?postion ;
            wdt:P1532 ?countryID .
            ?countryID wdt:P1448 ?countryName .
            ?postion rdfs:label ?positonName .
            FILTER(LANG(?positonName) = "fr")
          }`;
            var requeteGetTeamPlayer: string = `
          PREFIX wdt: <http://www.wikidata.org/prop/direct/>
          PREFIX wd: <http://www.wikidata.org/entity/>
          SELECT ?teamName{
            wd:${id} wdt:P54 ?team .
            ?team rdfs:label ?teamName .
          FILTER(LANG(?teamName) = "en")
          }`
            var requeteGetRecompensePlayer: string = `
          PREFIX wdt: <http://www.wikidata.org/prop/direct/>
          PREFIX wd: <http://www.wikidata.org/entity/>
          SELECT ?recompenseName{
            wd:${id} wdt:P166 ?recompense.
            ?recompense rdfs:label ?recompenseName.
            FILTER(LANG(?recompenseName) = "en")
        }`
            var requeteGetNominatedPlayer: string = `
        PREFIX wdt: <http://www.wikidata.org/prop/direct/>
        PREFIX wd: <http://www.wikidata.org/entity/>
        SELECT ?nominatedName{
            wd:${id} wdt:P1411 ?nominated.
            ?nominated rdfs:label ?nominatedName.
            FILTER(LANG(?nominatedName) = "en") .
    }
    `
            var DataInfoJoueur = await callWikidataAPI(requeteInfoJoueur);
            var DataJoueurTeam = await callWikidataAPI(requeteGetTeamPlayer);
            var DataJoueurRecompense = await callWikidataAPI(requeteGetRecompensePlayer);
            var DataJoueurNomintation = await callWikidataAPI(requeteGetNominatedPlayer);
            setDataPlayer(DataInfoJoueur.results.bindings[0])
            setDataTeams(DataJoueurTeam.results.bindings)
            setDataRecompense(DataJoueurRecompense.results.bindings)
            setDataNomination(DataJoueurNomintation.results.bindings)
        }
        getPlayerInfo();
    }, []);

    return (
        <div>
            Joueur avec l'id : {id}
            <p>Nom du joueur : {PlayerName}</p>
            <p>Pays du joueur : {PlayerCountry}</p>
            <p>Photo du joueur <img src={PlayerImage} alt="" /></p>
            <p>Posion du joueur : {PlayerPosition}</p>
            <p>Club du joueur</p>
            <table>
                <thead>
                    <tr>
                        <th>Club du joueur</th>
                    </tr>
                </thead>
                <tbody>
                    {DataTeams.map((result: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{result.teamName.value}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <p>Récompense du joueur : </p>
            <table>
                <thead>
                    <tr>
                        <th>Nom récompense</th>
                    </tr>
                </thead>
                <tbody>
                    {DataRecompense.map((result: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{result.recompenseName.value}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <p>Nommination : </p>
            <table>
                <thead>
                    <tr>
                        <th>Nom Nommination</th>
                    </tr>
                </thead>
                <tbody>
                    {DataNomination.map((result: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{result.nominatedName.value}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}