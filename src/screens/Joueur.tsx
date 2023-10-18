import { useParams } from "react-router-dom";

export const Joueur=()=>{
    const { id } = useParams();
    return(
        <div>
            Joueur avec l'id : {id}
        </div>
    )
}