import callWikidataAPI from "../Common/Function"
//chose qu'on vas réutilser à plusieurs endroit par exemple la barre de recherche qu'on voudras surement mettre sur plusieurs écrans mais pas forcement au même endroit
export const SearchBar = () => {

    const inputChange = async (event: any) => {
        var text = event.target.value;
        if (text !== "") {
            var requete: string = `
            PREFIX wdt: <http://www.wikidata.org/prop/direct/>
            PREFIX wd: <http://www.wikidata.org/entity/>
            SELECT ?joueur ?name ?club ?nom {
                {
                  ?joueur wdt:P54 ?club .
                  ?club wdt:P118 wd:Q9448 .
                  ?joueur wdt:P1559 ?name .
                  FILTER(contains(?name, "${text}")) .
                }
                UNION
                {
                  ?club wdt:P118 wd:Q9448 ;
                        wdt:P31 wd:Q476028 .
                  ?club wdt:P1448 ?nom .
                  FILTER(contains(?nom, "${text}"))
                }
              }
              
            `
            var temp = await callWikidataAPI(requete)
        }
    }
    return (
        <div>
            <input type="text" placeholder="Rechercher un joueur ou un club" onChange={inputChange} />
        </div>
    )
}