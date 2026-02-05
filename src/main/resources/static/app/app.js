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
