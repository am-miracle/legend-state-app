import React, { useEffect } from "react"

const Card = ({item}) => {
    useEffect(() => {
        item.renders.set(r => r + 1);
    })
    return (
        <div>
            {item.text}
        </div>
    )
}

export default Card;