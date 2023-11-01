import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import callWikidataAPI from "../Common/Function";
import { Link } from 'react-router-dom';
import { count } from 'console';

export const Club = () => {
    const { id } = useParams();

    const [DataClubName, setDataClubName] = useState('');
    const [DataCoachName, setDataCoachName] = useState('');
    const [DataCoachPhoto, setDataCoachPhoto] = useState([]);
    const [DataOwnerName, setDataOwnerName] = useState([]);
    
    const [DataPlayers, setDataPlayers] = useState([]);

    useEffect(() => {
        const getClubInfos = async () => {
            var requete1: string = `
                PREFIX wdt: <http://www.wikidata.org/prop/direct/>
                PREFIX wd: <http://www.wikidata.org/entity/>
                
                select ?clubName ?coach ?owner {
                    wd:${id} wdt:P1448 ?clubName ;
                    OPTIONAL { wd:${id} wdt:P286 ?coach . }
                    OPTIONAL { wd:${id} wdt:P127 ?owner . }
                  } LIMIT 1`;
            var data1 = await callWikidataAPI(requete1);
            if(data1.results.bindings[0].coach != null){
                const coachLink = data1.results.bindings[0].coach.value.split("/");
                const coachID: string = coachLink[coachLink.length - 1];
                var requete2: string = `
                    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
                    PREFIX wd: <http://www.wikidata.org/entity/>
                    
                    select ?coachName ?coachPhoto {
                        wd:${coachID}  rdfs:label ?coachName .
                        OPTIONAL { wd:${coachID}   wdt:P18 ?coachPhoto . } 
                        FILTER(LANG(?coachName) = "en")
                  }  LIMIT 1`;
                var data2 = await callWikidataAPI(requete2);
                setDataCoachName(data2.results.bindings[0].coachName.value)
                if(data2.results.bindings[0].coachPhoto != null)
                 setDataCoachPhoto(data2.results.bindings[0].coachPhoto.value)
            }
            if(data1.results.bindings[0].owner != null){
                const ownerLink = data1.results.bindings[0].owner.value.split("/");
                const ownerID: string = ownerLink[ownerLink.length - 1];
                var requete3: string = `
                    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
                    PREFIX wd: <http://www.wikidata.org/entity/>
                    
                    select ?ownerName {
                        wd:${ownerID} rdfs:label ?ownerName .
                        FILTER(LANG(?ownerName) = "en")
                  } LIMIT 1`;
                var data3 = await callWikidataAPI(requete3);
                setDataOwnerName(data3.results.bindings[0].ownerName.value)
            }
            setDataClubName(data1.results.bindings[0].clubName.value)
        }
        const getClubPlayers = async () => {
            var requete: string = `
                PREFIX wdt: <http://www.wikidata.org/prop/direct/>
                PREFIX wd: <http://www.wikidata.org/entity/>
                
                select ?player ?playerName ?specialityName{
                    ?player wdt:P54 wd:Q5794 ; 
                            wdt:P1559 ?playerName ;
                            wdt:P413 ?speciality .
                    ?speciality rdfs:label ?specialityName
                    FILTER (lang(?specialityName) = "fr")
                  }`;
            var data = await callWikidataAPI(requete);
            setDataPlayers(data.results.bindings)
        }
        getClubInfos();
        getClubPlayers();
    }, []);

    return (
        <div>
            <b>Club avec l'id {id}</b>

            <p>Nom du club : {DataClubName}</p>
            <p>Nom du coach : {DataCoachName}
                <img src= {DataCoachPhoto.toString()} width="200"/>
            </p>
            <p>Nom du propriétaire : {DataOwnerName}</p>

            <b>Joueurs : </b>
            <div className='p-4'>
            <table className='table-auto w-full'>
                <thead>
                    <tr>
                        <th>Nom joueur</th>
                        <th>Poste joueur</th>
                    </tr>
                </thead>
                <tbody>
                {DataPlayers.map((playerInfo: any,index:number) => {
                     const playerLink = playerInfo.player.value.split("/");
                     const playerID: string = playerLink[playerLink.length - 1]
                    return(
                    <tr key={index}>
                        <td><Link to={`/Joueur/${playerID}`}>{playerInfo.playerName.value}</Link></td>
                        <td><Link to={`/Joueur/${playerID}`}>{playerInfo.specialityName.value}</Link></td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
            <p>Elements qu'on peux mettre : </p>
            <ul>
                <li>Emplacement du club (il a un genre de google map dans les données pour club très connus)</li>
                <li>Si le club est déja redescendu ou sont historique</li>
                <li>Nom du stade (pk pas des data dessus)</li>
                <li>Les trophée gagner (élément important)</li>
                <li>Date de création</li>
                <li>Sponsor ???</li>
                <li>Musique d'entré des joueurs si ça existe (pas présent dans tous les club et vraiment pas important)</li>
            </ul>
        </div>
    )
}