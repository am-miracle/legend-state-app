import React from "react";
import { Computed, observer} from '@legendapp/state/react'

const Card = observer((props) => {
    const { player, increasevoteCount, decreaseVoteCount } = props

    return (
        <section className="container">
            <h1 className="text">{player.name}</h1>
            <h3 className="normal-text">{player.country}</h3>
            <p className="normal-text">{player.club}</p>
            <Computed>
               {() => <button className="button" onClick={() => increasevoteCount(player.id)}>Vote</button>}
            </Computed>
            <Computed>
                {() => <button className="button normal" onClick={() => decreaseVoteCount(player.id)}>Unvote</button>}
            </Computed>
        </section>
    )
});

export default Card;