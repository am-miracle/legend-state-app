import React from "react"

const Card = (props) => {
    const { player, increasevoteCount, decreaseVoteCount } = props

    return (
        <section className="container">
            <h1 className="text">{player.name}</h1>
            <h3 className="normal-text">{player.country}</h3>
            <p className="normal-text">{player.club}</p>
            <button className="button" onClick={() => increasevoteCount(player.id)}>Vote</button>
            <button className="button normal" onClick={() => decreaseVoteCount(player.id)}>Unvote</button>
        </section>
    )
};

export default Card;