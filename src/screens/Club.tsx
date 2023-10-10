import { useParams } from 'react-router-dom';

export const Club = () => {
    const { id } = useParams();
    return (
        <div>
            <p>Club avec l'id {id}</p>

            <p>Elements qu'on peux mettre : </p>
            <ul>
                <li>Coach avec photo</li>
                <li>Liste des joueurs actuel avec sont poste (pour chaque joueur il faut que ça soit clickable)</li>
                <li>Emplacement du club (il a un genre de google map dans les données pour club très connus)</li>
                <li>Si le club est déja redescendu ou sont historique</li>
                <li>Nom du stade (pk pas des data dessus)</li>
                <li>Le propriétaire</li>
                <li>Les trophée gagner (élément important)</li>
                <li>Date de création</li>
                <li>Sponsor ???</li>
                <li>Musique d'entré des joueurs si ça existe (pas présent dans tous les club et vraiment pas important)</li>
            </ul>
        </div>
    )
}