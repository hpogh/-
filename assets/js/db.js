import { ref, get, set, update, remove, db } from './firebase-config.js';

// Adds a new item
export async function addItem(collection, data){
  const id = Date.now().toString() + '_' + Math.random().toString(36).slice(2,8);
  const r = ref(db, `${collection}/${id}`);
  await set(r, { ...data, id });
  return { id, ...data };
}

export async function updateItem(collection, id, data){
  const r = ref(db, `${collection}/${id}`);
  await update(r, data);
  const snap = await get(r);
  return { id, ...(snap.val()||{}) };
}

export async function deleteItem(collection, id){
  const r = ref(db, `${collection}/${id}`);
  await remove(r);
  return true;
}

export async function getItem(collection, id){
  const r = ref(db, `${collection}/${id}`);
  const snap = await get(r);
  if (!snap.exists()) return null;
  return { id, ...snap.val() };
}

export async function listItems(collection){
  const r = ref(db, collection);
  const snap = await get(r);
  const res = [];
  if (snap.exists()){
    const data = snap.val();
    Object.entries(data).forEach(([k,v])=> res.push({ id: k, ...v }));
  }
  return res;
}
