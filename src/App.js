import React, {useRef} from 'react';
// import './App.css';
import { observable } from '@legendapp/state';
import { enableLegendStateReact, Memo, observer, useObservable } from '@legendapp/state/react'
import Card from './components/Card';
import { configureObservablePersistence, persistObservable } from '@legendapp/state/persist';
import { ObservablePersistLocalStorage } from '@legendapp/state/local-storage';

enableLegendStateReact();

const state = observable({
  players: [
    {id: 1, name: 'Messi', club: 'Paris', country: 'ARG',},
    {id: 2, name: 'Ronaldo', club: 'Manchester', country: 'POR'}
  ],
  voteForM: 0,
  voteForC: 0
})

configureObservablePersistence({
  // Use Local Storage on web
  persistLocal: ObservablePersistLocalStorage
});
persistObservable(state.voteForC, {
  local: 'voteC',
})
persistObservable(state.voteForM, {
  local: 'voteM',
})

function App() {
  const renderCount = ++useRef(0).current;


  const playersData = state.players.get();

  const voteForMessi = () =>  state.voteForM.set(state.voteForM.get() + 1)
  const voteForRonaldo = () => state.voteForC.set(state.voteForC.get() + 1)
  const unVoteForMessi = () =>  state.voteForM.set(state.voteForM.get() - 1)
  const unVoteForRonaldo = () => state.voteForC.set(state.voteForC.get() - 1)



  return (
    <section className='App'>
      <h2>{renderCount}</h2>
      <h2 style={{ marginBottom: "20px"}}>Vote the Best Football player in the world</h2>
      <Memo>
        {() => <h1>Messi: {state.voteForM} - {state.voteForC}: Ronaldo</h1>}
      </Memo>
      <div className='card-container'>
        {
          playersData.map((player) => (
            <div key={player.id} className="card">
              <Card
               player={player}
               increasevoteCount={player.id === 1 ? voteForMessi : voteForRonaldo}
               decreaseVoteCount={player.id === 1 ? unVoteForMessi : unVoteForRonaldo}
              />
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default App;
