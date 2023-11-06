import { Link, useParams } from "react-router-dom";
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
            setPlayerImage(Data.image?.value)
            setPlayerPosition(Data.positonName.value)
        }
        const getPlayerInfo = async () => {
            var requeteInfoJoueur: string = `
        PREFIX wdt: <http://www.wikidata.org/prop/direct/>
        PREFIX wd: <http://www.wikidata.org/entity/>
        Select ?name ?image ?countryName ?positonName{ 
            wd:${id} wdt:P1559 ?name ; 
                        wdt:P413 ?postion ;
                        wdt:P1532 ?countryID .
                         OPTIONAL {wd:${id} wdt:P18 ?image}. 
                        ?countryID wdt:P1448 ?countryName .
                        ?postion rdfs:label ?positonName .
                        FILTER(LANG(?positonName) = "fr")
                    }`;
            var requeteGetTeamPlayer: string = `
          PREFIX wdt: <http://www.wikidata.org/prop/direct/>
          PREFIX wd: <http://www.wikidata.org/entity/>
          SELECT ?team ?teamName ?leagueName{
            wd:${id} wdt:P54 ?team .
            ?team rdfs:label ?teamName .
            ?team wdt:P118 ?league .
            ?league rdfs:label ?leagueName .
          FILTER(LANG(?teamName) = "en") .
          FILTER(LANG(?leagueName) = "en")
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
            <p className='mt-4 mb-4 flex justify-center items-center text-4xl font-bold'>{PlayerName}</p>
            <img src={PlayerImage} width="200" className="object-cover" alt={PlayerName} />
            <p className="font-bold">{PlayerPosition}</p>
            <p>Représente comme pays en équipe national {PlayerCountry}</p>
            <p className="mt-6 mb-2 font-bold">Liste des clubs où {PlayerName} a jouer : </p>
            <table className="table-auto w-2/3 sm:w-full">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className='px-4 py-2'>Nom du club</th>
                    </tr>
                </thead>
                <tbody>
                    {DataTeams.map((result: any, index: number) => {
                        if (result.leagueName.value === "Premier League") {
                            const clubLink = result.team.value.split("/");
                            const clubID: string = clubLink[clubLink.length - 1]
                            return (
                                <tr key={index} className='border-b border-gray-300 h-12'>
                                    <td className='px-4 py-2 text-center'><Link to={`/Club/${clubID}`} className='text-white-500 hover:underline'>{result.teamName.value}</Link></td>
                                </tr>
                            )
                        } else {
                            return (
                                <tr key={index} className='border-b border-gray-300 h-12'>
                                    <td className='px-4 py-2 text-center'>{result.teamName.value}</td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
            <p className="mt-6 mb-2 font-bold">Les différentes récompense du joueur : </p>
            <table className="table-auto w-2/3 sm:w-full">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-2">Nom des récompenses</th>
                    </tr>
                </thead>
                <tbody>
                    {DataRecompense.map((result: any, index: number) => {
                        return (
                            <tr key={index} className='border-b border-gray-300 h-12'>
                                <td className='px-4 py-2 text-center'>{result.recompenseName.value}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <p className="mt-6 mb-2 font-bold">Voici les différents nommination de {PlayerName} : </p>
            <table className="table-auto w-2/3 sm:w-full">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-2">Nom Nommination</th>
                    </tr>
                </thead>
                <tbody>
                    {DataNomination.map((result: any, index: number) => {
                        return (
                            <tr key={index} className='border-b border-gray-300 h-12'>
                                <td className='px-4 py-2 text-center'>{result.nominatedName.value}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}