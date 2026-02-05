import React from 'react'
import Batches from './views/Batches'
import Interns from './views/Interns'

export default function App(){
  const [tab, setTab] = React.useState('batches')
  return (
    <div className="app-root">
      <header>
        <h1>IDMS — React UI</h1>
        <nav>
          <button onClick={()=>setTab('batches')} className={tab==='batches'? 'active':''}>Batches</button>
          <button onClick={()=>setTab('interns')} className={tab==='interns'? 'active':''}>Interns</button>
        </nav>
      </header>
      <main>
        {tab==='batches' ? <Batches/> : <Interns/>}
      </main>
    </div>
  )
}
