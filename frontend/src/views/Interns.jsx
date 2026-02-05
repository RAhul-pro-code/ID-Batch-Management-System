import React from 'react'
import axios from 'axios'

export default function Interns(){
  const [interns, setInterns] = React.useState([])
  const [batches, setBatches] = React.useState([])
  const [form, setForm] = React.useState({firstName:'',lastName:'',email:'',phoneNumber:'',college:'',degree:'',specialization:'',dateOfBirth:'',enrollmentDate:'',address:'',batchId:''})
  const load = async ()=>{ const r=await axios.get('/api/interns'); setInterns(r.data||[]); const br=await axios.get('/api/batches'); setBatches(br.data||[]) }
  React.useEffect(()=>{ load() },[])
  const save = async ()=>{ await axios.post('/api/interns',form); setForm({firstName:'',lastName:'',email:'',phoneNumber:'',college:'',degree:'',specialization:'',dateOfBirth:'',enrollmentDate:'',address:'',batchId:''}); load() }
  const del = async (id)=>{ if(!confirm('Delete?')) return; await axios.delete('/api/interns/'+id); load() }
  return (
    <div className="card">
      <h2>Create Intern</h2>
      <div className="grid">
        <input placeholder="First name" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} />
        <input placeholder="Last name" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input placeholder="Phone" value={form.phoneNumber} onChange={e=>setForm({...form,phoneNumber:e.target.value})} />
        <input placeholder="College" value={form.college} onChange={e=>setForm({...form,college:e.target.value})} />
        <input placeholder="Degree" value={form.degree} onChange={e=>setForm({...form,degree:e.target.value})} />
        <input placeholder="Specialization" value={form.specialization} onChange={e=>setForm({...form,specialization:e.target.value})} />
        <input type="date" placeholder="DOB" value={form.dateOfBirth} onChange={e=>setForm({...form,dateOfBirth:e.target.value})} />
        <input type="date" placeholder="Enrollment" value={form.enrollmentDate} onChange={e=>setForm({...form,enrollmentDate:e.target.value})} />
        <input placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} />
        <select value={form.batchId} onChange={e=>setForm({...form,batchId:e.target.value})}>
          <option value="">-- select batch --</option>
          {batches.map(b=> <option key={b.id} value={b.id}>{b.batchName} ({b.technology})</option>)}
        </select>
      </div>
      <div className="actions"><button onClick={save}>Save Intern</button></div>
      <h2>Interns</h2>
      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Batch</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {interns.map(i=> <tr key={i.id}><td>{i.id}</td><td>{i.firstName} {i.lastName}</td><td>{i.email}</td><td>{i.batch?i.batch.batchName:''}</td><td>{i.status}</td><td><button onClick={()=>del(i.id)}>Delete</button></td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
