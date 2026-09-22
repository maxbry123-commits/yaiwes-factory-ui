"use client";
import { useCallback, useEffect, useState } from "react";
const STORAGE_KEY = "FROMTED_factory_windows";
type SegmentType = "chat" | "ventana" | "boton" | "selector" | "sheet";
type WindowItem = { id: string; type: SegmentType; label: string; enabled: boolean };
const SEGMENT_TYPES: SegmentType[] = ["chat","ventana","boton","selector","sheet"];
function uid(){ return `win_${Date.now()}_${Math.random().toString(36).slice(2,6)}`; }
export default function Step2Page(){
  const [windows,setWindows]=useState<WindowItem[]>([]);
  const [pick,setPick]=useState<SegmentType>("chat");
  const [status,setStatus]=useState("Listo para anadir ventanas.");
  const [hydrated,setHydrated]=useState(false);
  useEffect(()=>{ try{ const raw=localStorage.getItem(STORAGE_KEY); if(raw) setWindows(JSON.parse(raw)); }catch{} setHydrated(true); },[]);
  const save=useCallback((next:WindowItem[])=>{ setWindows(next); localStorage.setItem(STORAGE_KEY,JSON.stringify(next)); console.log("[step-2]",next); },[]);
  const addWindow=useCallback(()=>{ const item={id:uid(),type:pick,label:`${pick} #${windows.length+1}`,enabled:true}; save([...windows,item]); setStatus(`Anadido: ${item.label}`); },[pick,windows,save]);
  const toggle=useCallback((id:string)=>{ save(windows.map(w=>w.id===id?{...w,enabled:!w.enabled}:w)); setStatus(`Toggle ${id}`); },[windows,save]);
  const remove=useCallback((id:string)=>{ save(windows.filter(w=>w.id!==id)); setStatus(`Eliminado ${id}`); },[windows,save]);
  if(!hydrated) return <p className="meta">Cargando…</p>;
  return (
    <main style={{display:"grid",gap:"1rem"}}>
      <div><h1 className="title" style={{fontSize:20,margin:0}}>Paso 2 — Componentes / ventanas</h1>
      <p className="meta" style={{marginTop:4}}>1 ventana = 1 archivo. Tipos: chat, ventana, boton, selector, sheet.</p></div>
      <div className="status-line">{status}</div>
      <section className="panel" style={{display:"flex",flexWrap:"wrap",gap:8,alignItems:"center"}}>
        <label className="name">Tipo <select className="input" style={{width:"auto",marginLeft:8}} value={pick} onChange={e=>setPick(e.target.value as SegmentType)}>{SEGMENT_TYPES.map(t=><option key={t} value={t}>{t}</option>)}</select></label>
        <button type="button" className="btn-primary" onClick={addWindow}>Anadir segmento</button>
      </section>
      <section className="panel">
        <div className="name" style={{marginBottom:8}}>Lista de ventanas ({windows.length})</div>
        {windows.length===0?<p className="meta">Sin ventanas.</p>:(
          <ul style={{listStyle:"none",margin:0,padding:0,display:"grid",gap:8}}>
            {windows.map(w=>(
              <li key={w.id} className="card" style={{display:"flex",gap:12,alignItems:"center",justifyContent:"space-between",borderColor:w.enabled?"var(--blue)":"var(--border)"}}>
                <div><div className="name">{w.label}</div><div className="sub">{w.type} · {w.enabled?"on":"off"}</div></div>
                <div style={{display:"flex",gap:8}}>
                  <button type="button" className="btn-primary" data-selected={w.enabled?"true":"false"} onClick={()=>toggle(w.id)}>{w.enabled?"Desactivar":"Activar"}</button>
                  <button type="button" className="btn-primary" onClick={()=>remove(w.id)}>Quitar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
