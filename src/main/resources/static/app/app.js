const base = window.location.origin;

const $ = s => document.querySelector(s);
const show = (sel) => { document.querySelectorAll('main section').forEach(sec => sec.classList.add('hidden')); document.querySelector(sel).classList.remove('hidden'); };

// UI state
let editingBatchId = null;
let editingInternId = null;

// Tabs
$('#tab-batches').addEventListener('click', () => { $('#tab-batches').classList.add('active'); $('#tab-interns').classList.remove('active'); show('#batches-section'); loadBatches(); });
$('#tab-interns').addEventListener('click', () => { $('#tab-interns').classList.add('active'); $('#tab-batches').classList.remove('active'); show('#interns-section'); loadInterns(); loadBatchOptions(); });

function setMessage(msg, err) {
  const el = $('#message'); el.textContent = msg; el.className = err ? 'message error' : 'message ok'; setTimeout(()=>{el.textContent=''; el.className='message';}, 4000);
}

function validateEmail(email){ return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email); }
function validatePhone(p){ return /^\d{7,15}$/.test(p); }

// Batches
async function loadBatches(){
  const res = await fetch(`${base}/api/batches`);
  if(!res.ok) { setMessage('Failed to load batches', true); return; }
  const data = await res.json();
  const tbody = $('#batches-table tbody'); tbody.innerHTML='';
  data.forEach(b=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${b.id}</td>
            <td>${b.batchName}</td>
            <td>${b.technology}</td>
            <td>${b.startDate || ''}</td>
            <td>${b.endDate || ''}</td>
            <td>${b.capacity ?? ''}</td>
            <td>${b.enrolledCount||0}</td>
            <td class="actions"><button data-id='${b.id}' class='edit-batch'>Edit</button> <button data-id='${b.id}' class='del-batch danger'>Delete</button></td>`;
    tbody.appendChild(tr);
  });
  document.querySelectorAll('.del-batch').forEach(btn=>btn.addEventListener('click', async (e)=>{
    const id = e.target.dataset.id; if(!confirm('Delete batch '+id+'?')) return;
    const resp = await fetch(`${base}/api/batches/${id}`, {method:'DELETE'});
    if(resp.ok){ setMessage('Batch deleted'); loadBatches(); loadBatchOptions(); } else setMessage('Failed to delete batch', true);
  }));
  document.querySelectorAll('.edit-batch').forEach(btn=>btn.addEventListener('click', async (e)=>{
    const id = e.target.dataset.id; const resp = await fetch(`${base}/api/batches/${id}`); if(!resp.ok) return setMessage('Failed to load batch', true);
    const b = await resp.json(); const f = $('#batch-form'); f.batchName.value = b.batchName; f.technology.value = b.technology; f.startDate.value = b.startDate; f.endDate.value = b.endDate; f.capacity.value = b.capacity; f.description.value = b.description || '';
    editingBatchId = id; $('#batch-form button').textContent = 'Update Batch'; document.getElementById('tab-batches').scrollIntoView({behavior:'smooth'});
  }));
}

$('#batch-form').addEventListener('submit', async (ev)=>{
  ev.preventDefault(); const form = ev.target; const body = { batchName: form.batchName.value.trim(), technology: form.technology.value.trim(), startDate: form.startDate.value, endDate: form.endDate.value, capacity: Number(form.capacity.value), description: form.description.value };
  if(!body.batchName || !body.technology) return setMessage('Batch name and technology required', true);
  let res;
  if(editingBatchId){ res = await fetch(`${base}/api/batches/${editingBatchId}`, {method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)}); } else { res = await fetch(`${base}/api/batches`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)}); }
  if(res.ok){ setMessage(editingBatchId? 'Batch updated':'Batch created'); form.reset(); editingBatchId=null; $('#batch-form button').textContent='Save Batch'; loadBatches(); loadBatchOptions(); } else { setMessage('Failed to save batch', true); }
});

// Interns
async function loadBatchOptions(){
  const res = await fetch(`${base}/api/batches`); if(!res.ok) return; const data = await res.json(); const sel = $('#batch-select'); sel.innerHTML = '<option value="">-- select batch --</option>';
  data.forEach(b=>{ const opt = document.createElement('option'); opt.value = b.id; opt.textContent = `${b.batchName} (${b.technology})`; sel.appendChild(opt); });
}

async function loadInterns(){
  const res = await fetch(`${base}/api/interns`); if(!res.ok){ setMessage('Failed to load interns', true); return; }
  const data = await res.json(); const tbody = $('#interns-table tbody'); tbody.innerHTML='';
  data.forEach(i=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i.id}</td><td>${i.firstName} ${i.lastName}</td><td>${i.email}</td><td>${i.batch?i.batch.batchName:(i.batchId||'')}</td><td>${i.status}</td><td class="actions"><button data-id='${i.id}' class='edit-intern'>Edit</button> <button data-id='${i.id}' class='del-intern danger'>Delete</button></td>`;
    tbody.appendChild(tr);
  });
  document.querySelectorAll('.del-intern').forEach(btn=>btn.addEventListener('click', async (e)=>{
    const id = e.target.dataset.id; if(!confirm('Delete intern '+id+'?')) return; const resp = await fetch(`${base}/api/interns/${id}`, {method:'DELETE'}); if(resp.ok){ setMessage('Intern deleted'); loadInterns(); } else setMessage('Failed to delete intern', true);
  }));
  document.querySelectorAll('.edit-intern').forEach(btn=>btn.addEventListener('click', async (e)=>{
    const id = e.target.dataset.id; const resp = await fetch(`${base}/api/interns/${id}`); if(!resp.ok) return setMessage('Failed to load intern', true);
    const i = await resp.json(); const f = $('#intern-form'); f.firstName.value=i.firstName||''; f.lastName.value=i.lastName||''; f.email.value=i.email||''; f.phoneNumber.value=i.phoneNumber||''; f.college.value=i.college||''; f.degree.value=i.degree||''; f.specialization.value=i.specialization||''; f.enrollmentDate.value=i.enrollmentDate||''; f.dateOfBirth.value=i.dateOfBirth||''; f.address.value=i.address||''; f.batchId.value = i.batch?i.batch.id:(i.batchId||''); editingInternId=id; $('#intern-save').textContent='Update Intern'; $('#intern-cancel').classList.remove('hidden'); document.getElementById('tab-interns').scrollIntoView({behavior:'smooth'});
  }));
}

$('#intern-form').addEventListener('submit', async (ev)=>{
  ev.preventDefault(); const f = ev.target; const payload = { firstName: f.firstName.value.trim(), lastName: f.lastName.value.trim(), email: f.email.value.trim(), phoneNumber: f.phoneNumber.value.trim(), college: f.college.value.trim(), degree: f.degree.value.trim(), specialization: f.specialization.value.trim(), enrollmentDate: f.enrollmentDate.value, dateOfBirth: f.dateOfBirth.value, address: f.address.value.trim(), batchId: Number(f.batchId.value) };
  // client validations
  if(!payload.firstName || !payload.lastName) return setMessage('Name required', true);
  if(!validateEmail(payload.email)) return setMessage('Invalid email', true);
  if(!validatePhone(payload.phoneNumber)) return setMessage('Invalid phone (digits only, 7-15)', true);
  if(!payload.dateOfBirth || !payload.address) return setMessage('DOB and address required', true);

  let res;
  if(editingInternId){ res = await fetch(`${base}/api/interns/${editingInternId}`, {method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)}); }
  else { res = await fetch(`${base}/api/interns`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)}); }

  if(res.ok || res.status===201){ setMessage(editingInternId? 'Intern updated':'Intern created'); f.reset(); editingInternId=null; $('#intern-save').textContent='Save Intern'; $('#intern-cancel').classList.add('hidden'); loadInterns(); } else if(res.status===400){ const txt = await res.text(); setMessage('Bad request: '+(txt||''), true); } else { const txt = await res.text(); setMessage('Failed: '+(txt||''), true); }
});

$('#intern-cancel').addEventListener('click', ()=>{ $('#intern-form').reset(); editingInternId=null; $('#intern-save').textContent='Save Intern'; $('#intern-cancel').classList.add('hidden'); });

// Initial load
loadBatches();
const apiBase = '/api';

// Tabs
const tabBatches = document.getElementById('tab-batches');
const tabInterns = document.getElementById('tab-interns');
const batchesSection = document.getElementById('batches-section');
const internsSection = document.getElementById('interns-section');

tabBatches.onclick = () => { tabBatches.classList.add('active'); tabInterns.classList.remove('active'); batchesSection.style.display='block'; internsSection.style.display='none'; }
tabInterns.onclick = () => { tabInterns.classList.add('active'); tabBatches.classList.remove('active'); internsSection.style.display='block'; batchesSection.style.display='none'; }

// Batches
const batchForm = document.getElementById('batch-form');
const batchesTableBody = document.querySelector('#batches-table tbody');

async function loadBatches(){
  const res = await fetch(`${apiBase}/batches`);
  const data = await res.json();
  batchesTableBody.innerHTML='';
  data.forEach(b=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${b.id}</td><td>${b.batchName}</td><td>${b.technology}</td><td>${b.startDate} → ${b.endDate}</td><td>${b.capacity}</td><td>${b.enrolledCount}</td><td>
      <button onclick="editBatch(${b.id})">Edit</button>
      <button onclick="deleteBatch(${b.id})">Delete</button>
    </td>`;
    batchesTableBody.appendChild(tr);
  });
}

window.editBatch = async (id) => {
  const res = await fetch(`${apiBase}/batches/${id}`);
  const b = await res.json();
  const f = batchForm;
  f.id.value = b.id; f.batchName.value = b.batchName; f.startDate.value = b.startDate; f.endDate.value = b.endDate; f.technology.value = b.technology; f.capacity.value = b.capacity; f.description.value = b.description || '';
}

window.deleteBatch = async (id) => {
  if(!confirm('Delete batch '+id+'?')) return;
  await fetch(`${apiBase}/batches/${id}`,{method:'DELETE'});
  await loadBatches();
}

batchForm.onsubmit = async (e) => {
  e.preventDefault();
  const f = e.target;
  const payload = {
    batchName: f.batchName.value,
    startDate: f.startDate.value,
    endDate: f.endDate.value,
    technology: f.technology.value,
    capacity: Number(f.capacity.value),
    description: f.description.value
  };
  if(f.id.value){
    await fetch(`${apiBase}/batches/${f.id.value}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  } else {
    await fetch(`${apiBase}/batches`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  }
  f.reset(); f.id.value='';
  await loadBatches();
}

document.getElementById('batch-reset').onclick = ()=>{ batchForm.reset(); batchForm.id.value=''; }

// Interns
const internForm = document.getElementById('intern-form');
const internsTableBody = document.querySelector('#interns-table tbody');

async function loadInterns(){
  const res = await fetch(`${apiBase}/interns`);
  const data = await res.json();
  internsTableBody.innerHTML='';
  data.forEach(i=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i.id}</td><td>${i.firstName} ${i.lastName}</td><td>${i.email}</td><td>${i.batch?i.batch.id:''}</td><td>${i.status}</td><td>
      <button onclick="editIntern(${i.id})">Edit</button>
      <button onclick="deleteIntern(${i.id})">Delete</button>
    </td>`;
    internsTableBody.appendChild(tr);
  });
}

window.editIntern = async (id) => {
  const res = await fetch(`${apiBase}/interns/${id}`);
  const i = await res.json();
  const f = internForm;
  f.id.value = i.id; f.firstName.value = i.firstName; f.lastName.value = i.lastName; f.email.value = i.email; f.phoneNumber.value = i.phoneNumber;
  f.college.value = i.college; f.degree.value = i.degree; f.specialization.value = i.specialization; f.dateOfBirth.value = i.dateOfBirth; f.address.value = i.address; f.enrollmentDate.value = i.enrollmentDate; f.batchId.value = i.batch?i.batch.id:'';
}

window.deleteIntern = async (id) => {
  if(!confirm('Delete intern '+id+'?')) return;
  await fetch(`${apiBase}/interns/${id}`,{method:'DELETE'});
  await loadInterns();
}

internForm.onsubmit = async (e) => {
  e.preventDefault();
  const f = e.target;
  const payload = {
    firstName: f.firstName.value,
    lastName: f.lastName.value,
    email: f.email.value,
    phoneNumber: f.phoneNumber.value,
    college: f.college.value,
    degree: f.degree.value,
    specialization: f.specialization.value,
    dateOfBirth: f.dateOfBirth.value,
    address: f.address.value,
    enrollmentDate: f.enrollmentDate.value,
    batch: { id: Number(f.batchId.value) }
  };
  if(f.id.value){
    await fetch(`${apiBase}/interns/${f.id.value}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  } else {
    await fetch(`${apiBase}/interns`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  }
  f.reset(); f.id.value='';
  await loadInterns();
  await loadBatches();
}

document.getElementById('intern-reset').onclick = ()=>{ internForm.reset(); internForm.id.value=''; }

// init
loadBatches();
loadInterns();
