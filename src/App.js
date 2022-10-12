import React, {useRef, useState } from 'react';
import './App.css';
// import Card from './components/Card';
import { observable, observe } from '@legendapp/state';
import { enableLegendStateReact, Memo } from '@legendapp/state/react'

enableLegendStateReact();

const state = observable({
  bestPlayers: [
    {id: 1, name: 'Messi', club: 'Paris', country: 'ARG',},
    {id: 2, name: 'Ronaldo', club: 'Manchester', country: 'POR'}
  ],
  isVoted: false,
  voteForM: 0,
  voteForC: 0
})

function App() {
  const renderCount = ++useRef(0).current;

  const playersData = state.bestPlayers.get();
  // const playersId = state.bestPlayers.get().map(playerId => playerId.id);


  const voteForMessi = () =>  state.voteForM.set(state.voteForM.get() + 1)
  const voteForRonaldo = () => state.voteForC.set(state.voteForC.get() + 1)
  const unVoteForMessi = () =>  state.voteForM.set(state.voteForM.get() - 1)
  const unVoteForRonaldo = () => state.voteForC.set(state.voteForC.get() - 1)


  return (
    <div className="App">
      <h2>{renderCount}</h2>
      Vote the Best player in the world
      <Memo>
            <h1>Messi: {state.voteForM} - {state.voteForC}: Ronaldo</h1>
      </Memo>
      {playersData.map((player) => (
        <div key={player.id}>
          <h1>{player.name}</h1>
          <p>{player.country}</p>
          <h3>{player.club}</h3>
          <div>
            <button
            onClick={
               player.id === 1 ? voteForMessi : voteForRonaldo
            }
              >Vote</button>
            <button
              disabled={
                (player.id === 1 && state.voteForM.get() <= 0 ? true : false) ||
                (player.id === 2 && state.voteForC.get() <= 0 ? true : false)
              }
              onClick={
                player.id === 1 ? unVoteForMessi : unVoteForRonaldo
              }>Unvote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App;
