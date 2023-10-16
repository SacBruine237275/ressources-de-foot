import { WBK } from 'wikibase-sdk'

async function callWikidataAPI(requete: string) {
    const wbk = WBK({
        instance: 'https://www.wikidata.org',
        sparqlEndpoint: 'https://query.wikidata.org/sparql'
    })
    const url: string = wbk.sparqlQuery(requete)
    const simplifiedResults: any = await fetch(url).then(res => res.json())
    console.log(simplifiedResults)
    return simplifiedResults;
}
export default callWikidataAPI;
