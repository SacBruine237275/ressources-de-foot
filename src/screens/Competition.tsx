type CompetitionProps={
    id:string
}

export const Competition:React.FC<CompetitionProps>=({id})=>{
    return(
        <div>Je suis une competition avec l'id {id}</div>
    )
}