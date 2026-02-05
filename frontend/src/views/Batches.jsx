import React from 'react'
import axios from 'axios'

export default function Batches(){
  const [batches, setBatches] = React.useState([])
  const [form, setForm] = React.useState({batchName:'',technology:'',startDate:'',endDate:'',capacity:0,description:''})
  const load = async ()=>{ const r=await axios.get('/api/batches'); setBatches(r.data||[]) }
  React.useEffect(()=>{ load() },[])
  const save = async ()=>{ await axios.post('/api/batches',form); setForm({batchName:'',technology:'',startDate:'',endDate:'',capacity:0,description:''}); load() }
  const del = async (id)=>{ if(!confirm('Delete?')) return; await axios.delete('/api/batches/'+id); load() }
  return (
    <div className="card">
      <h2>Create Batch</h2>
      <div className="grid">
        <input placeholder="Batch name" value={form.batchName} onChange={e=>setForm({...form,batchName:e.target.value})} />
        <input placeholder="Technology" value={form.technology} onChange={e=>setForm({...form,technology:e.target.value})} />
        <input type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})} />
        <input type="date" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})} />
        <input type="number" placeholder="Capacity" value={form.capacity} onChange={e=>setForm({...form,capacity:Number(e.target.value)})} />
        <input placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
      </div>
      <div className="actions"><button onClick={save}>Save</button></div>
      <h2>Existing Batches</h2>
      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Tech</th><th>Start</th><th>End</th><th>Capacity</th><th>Enrolled</th><th>Action</th></tr></thead>
        <tbody>
          {batches.map(b=> <tr key={b.id}><td>{b.id}</td><td>{b.batchName}</td><td>{b.technology}</td><td>{b.startDate}</td><td>{b.endDate}</td><td>{b.capacity}</td><td>{b.enrolledCount}</td><td><button onClick={()=>del(b.id)}>Delete</button></td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
