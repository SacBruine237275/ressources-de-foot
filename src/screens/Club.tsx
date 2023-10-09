
type ClubProps={
    id:string
}

export const Club:React.FC<ClubProps>=({id})=>{
    return(
        <div>
            <p>Club avec l'id {id}</p>
        </div>
    )
}