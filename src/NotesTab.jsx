import { useState, useRef } from "react";

const NOTES_KEY = "100xdev-notes";
function loadNotes() { try { return JSON.parse(localStorage.getItem(NOTES_KEY)) || {}; } catch { return {}; } }
function saveNotes(n) { localStorage.setItem(NOTES_KEY, JSON.stringify(n)); }
function toDateStr(y, m, d) { return `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`; }

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const LANGUAGES   = ["javascript","typescript","python","bash","sql","html","css","json","jsx","tsx","java","cpp","go","rust"];

/* ─── Inline markdown tokenizer ─── */
function parseInline(text) {
  if (!text) return null;
  const tokens = [];
  const re = /(\*\*[^*\n]+?\*\*|\*[^*\n]+?\*|`[^`\n]+?`|~~[^~\n]+?~~)/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) tokens.push({ t: "txt", v: text.slice(last, m.index) });
    const s = m[0];
    if (s.startsWith("**"))      tokens.push({ t: "b",    v: s.slice(2,-2) });
    else if (s.startsWith("~~")) tokens.push({ t: "del",  v: s.slice(2,-2) });
    else if (s.startsWith("*"))  tokens.push({ t: "i",    v: s.slice(1,-1) });
    else if (s.startsWith("`"))  tokens.push({ t: "code", v: s.slice(1,-1) });
    last = m.index + s.length;
  }
  if (last < text.length) tokens.push({ t: "txt", v: text.slice(last) });
  return tokens.map((tk, i) => {
    if (tk.t === "b")    return <strong key={i}>{tk.v}</strong>;
    if (tk.t === "i")    return <em key={i}>{tk.v}</em>;
    if (tk.t === "del")  return <del key={i}>{tk.v}</del>;
    if (tk.t === "code") return <code key={i} style={{ background:"#1e293b", padding:"1px 5px", borderRadius:3, fontFamily:"monospace", fontSize:"0.88em", color:"#a5f3fc", border:"1px solid #334155" }}>{tk.v}</code>;
    return tk.v;
  });
}

/* ─── Block-level markdown renderer ─── */
function renderMarkdown(text) {
  if (!text?.trim()) return <p style={{ color:"#475569", fontStyle:"italic" }}>Nothing written yet…</p>;
  const lines = text.split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") { out.push(<div key={i} style={{ height:10 }} />); i++; continue; }

    if (trimmed.startsWith("### ")) { out.push(<h3 key={i} style={{ margin:"14px 0 4px", fontSize:16, fontWeight:700, color:"#f1f5f9", borderBottom:"1px solid #1e293b", paddingBottom:4 }}>{parseInline(trimmed.slice(4))}</h3>); i++; continue; }
    if (trimmed.startsWith("## "))  { out.push(<h2 key={i} style={{ margin:"18px 0 6px", fontSize:20, fontWeight:800, color:"#f8fafc" }}>{parseInline(trimmed.slice(3))}</h2>); i++; continue; }
    if (trimmed.startsWith("# "))   { out.push(<h1 key={i} style={{ margin:"20px 0 8px", fontSize:26, fontWeight:900, color:"#f8fafc", borderBottom:"2px solid #334155", paddingBottom:6 }}>{parseInline(trimmed.slice(2))}</h1>); i++; continue; }

    if (trimmed.startsWith("> ")) {
      out.push(
        <blockquote key={i} style={{ margin:"8px 0", padding:"8px 14px", borderLeft:"3px solid #3b82f6", background:"#1e293b", borderRadius:"0 6px 6px 0", color:"#94a3b8", fontStyle:"italic" }}>
          {parseInline(trimmed.slice(2))}
        </blockquote>
      );
      i++; continue;
    }

    if (trimmed === "---" || trimmed === "___" || trimmed === "***") {
      out.push(<hr key={i} style={{ border:"none", borderTop:"1px solid #334155", margin:"16px 0" }} />);
      i++; continue;
    }

    if (trimmed.match(/^[-*+] /)) {
      const items = [];
      while (i < lines.length && lines[i].trim().match(/^[-*+] /)) {
        items.push(<li key={i} style={{ marginBottom:3 }}>{parseInline(lines[i].trim().slice(2))}</li>);
        i++;
      }
      out.push(<ul key={`ul${i}`} style={{ margin:"6px 0 6px 18px", padding:0, color:"#cbd5e1", lineHeight:1.7 }}>{items}</ul>);
      continue;
    }

    if (trimmed.match(/^\d+\. /)) {
      const items = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\. /)) {
        items.push(<li key={i} style={{ marginBottom:3 }}>{parseInline(lines[i].trim().replace(/^\d+\. /,""))}</li>);
        i++;
      }
      out.push(<ol key={`ol${i}`} style={{ margin:"6px 0 6px 18px", padding:0, color:"#cbd5e1", lineHeight:1.7 }}>{items}</ol>);
      continue;
    }

    out.push(<p key={i} style={{ margin:"4px 0", lineHeight:1.75, color:"#cbd5e1" }}>{parseInline(line)}</p>);
    i++;
  }
  return out;
}

/* ─── Main NotesTab ─── */
export default function NotesTab() {
  const today    = new Date();
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const [notes,        setNotes]        = useState(loadNotes);
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [currentYear,  setCurrentYear]  = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [viewMode,     setViewMode]     = useState("edit"); // "edit" | "preview"

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay    = new Date(currentYear, currentMonth, 1).getDay();

  const updateNotes = (u) => { setNotes(u); saveNotes(u); };

  const addBlock = (type) => {
    if (!selectedDate) return;
    const block = { id: Date.now().toString(), type, content: "", language: "javascript" };
    updateNotes({ ...notes, [selectedDate]: [...(notes[selectedDate] || []), block] });
  };

  const updateBlock = (id, ch) => {
    const updated = (notes[selectedDate] || []).map(b => b.id === id ? { ...b, ...ch } : b);
    updateNotes({ ...notes, [selectedDate]: updated });
  };

  const deleteBlock = (id) => updateNotes({ ...notes, [selectedDate]: (notes[selectedDate] || []).filter(b => b.id !== id) });

  const moveBlock = (id, dir) => {
    const blocks = [...(notes[selectedDate] || [])];
    const idx = blocks.findIndex(b => b.id === id);
    const ni  = idx + dir;
    if (ni < 0 || ni >= blocks.length) return;
    [blocks[idx], blocks[ni]] = [blocks[ni], blocks[idx]];
    updateNotes({ ...notes, [selectedDate]: blocks });
  };

  const exportDay = () => {
    const day = notes[selectedDate] || [];
    let md = `# Notes — ${selectedDate}\n\n`;
    day.forEach(b => {
      if (b.type === "text")  md += `${b.content}\n\n`;
      if (b.type === "code")  md += `\`\`\`${b.language||""}\n${b.content}\n\`\`\`\n\n`;
      if (b.type === "image") md += `![${b.name||"image"}](${b.src||""})\n\n`;
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([md], { type:"text/markdown" }));
    a.download = `notes-${selectedDate}.md`;
    a.click();
  };

  const prevMonth = () => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y=>y-1); } else setCurrentMonth(m=>m-1); };
  const nextMonth = () => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y=>y+1); } else setCurrentMonth(m=>m+1); };

  const selectedBlocks = notes[selectedDate] || [];

  return (
    <div style={{ display:"grid", gridTemplateColumns:"288px 1fr", gap:20, alignItems:"start" }}>

      {/* ── Calendar sidebar ── */}
      <div style={{ background:"#1e293b", borderRadius:12, padding:16, border:"1px solid #334155" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <button onClick={prevMonth} style={navBtn}>‹</button>
          <span style={{ fontWeight:700, color:"#f8fafc", fontSize:14 }}>{MONTH_NAMES[currentMonth]} {currentYear}</span>
          <button onClick={nextMonth} style={navBtn}>›</button>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2, marginBottom:4 }}>
          {DAY_NAMES.map(d => <div key={d} style={{ textAlign:"center", fontSize:10, color:"#475569", fontWeight:700, padding:"3px 0" }}>{d}</div>)}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2 }}>
          {Array.from({ length:firstDay }, (_,i) => <div key={`e${i}`}/>)}
          {Array.from({ length:daysInMonth }, (_,i) => {
            const day = i+1, ds = toDateStr(currentYear, currentMonth, day);
            const has = !!(notes[ds]?.length), isToday = ds===todayStr, isSel = ds===selectedDate;
            return (
              <button key={day} onClick={() => { setSelectedDate(ds); setViewMode("edit"); }} style={{
                padding:"7px 0", border:"none", borderRadius:6, cursor:"pointer", position:"relative",
                background: isSel?"#3b82f6": isToday?"#1e3a5f":"transparent",
                color: isSel?"#fff": isToday?"#60a5fa":"#cbd5e1",
                fontSize:12, fontWeight:isSel||isToday?700:400, transition:"all .15s"
              }}>
                {day}
                {has && <span style={{ position:"absolute", bottom:2, left:"50%", transform:"translateX(-50%)", width:4, height:4, borderRadius:"50%", background:isSel?"#fff":"#10b981", display:"block" }}/>}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop:12, paddingTop:10, borderTop:"1px solid #334155", display:"flex", gap:14, fontSize:11, color:"#64748b" }}>
          <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:6, height:6, borderRadius:"50%", background:"#10b981", display:"inline-block" }}/> has notes</span>
          <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:14, height:14, borderRadius:3, background:"#1e3a5f", display:"inline-block" }}/> today</span>
        </div>

        {Object.keys(notes).filter(d=>notes[d]?.length).length > 0 && (
          <div style={{ marginTop:12, paddingTop:10, borderTop:"1px solid #334155" }}>
            <div style={{ fontSize:11, color:"#64748b", fontWeight:700, marginBottom:6 }}>NOTES ON</div>
            <div style={{ display:"flex", flexDirection:"column", gap:4, maxHeight:160, overflowY:"auto" }}>
              {Object.keys(notes).filter(d=>notes[d]?.length).sort().reverse().map(d => (
                <button key={d} onClick={() => { setSelectedDate(d); setViewMode("edit"); }} style={{
                  padding:"5px 8px", borderRadius:6, border:"none", textAlign:"left",
                  background:d===selectedDate?"#1e3a5f":"transparent",
                  color:d===selectedDate?"#60a5fa":"#94a3b8",
                  fontSize:12, cursor:"pointer", display:"flex", justifyContent:"space-between"
                }}>
                  <span>{d}</span>
                  <span style={{ color:"#475569" }}>{notes[d].length} block{notes[d].length!==1?"s":""}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Editor / Preview panel ── */}
      <div>
        {!selectedDate ? (
          <div style={{ background:"#1e293b", borderRadius:12, padding:48, border:"1px solid #334155", textAlign:"center" }}>
            <div style={{ fontSize:44, marginBottom:12 }}>📅</div>
            <div style={{ fontSize:15, fontWeight:600, color:"#94a3b8" }}>Select a date to start taking notes</div>
          </div>
        ) : (
          <div>
            {/* ── Toolbar ── */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <div>
                <h2 style={{ margin:0, fontSize:18, fontWeight:700, color:"#f8fafc" }}>
                  {new Date(selectedDate+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
                </h2>
                <div style={{ fontSize:12, color:"#64748b", marginTop:3 }}>
                  {selectedBlocks.length} block{selectedBlocks.length!==1?"s":""} saved
                  {selectedDate===todayStr && <span style={{ marginLeft:8, color:"#10b981", fontWeight:700 }}>· Today</span>}
                </div>
              </div>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                {/* Edit / Preview toggle */}
                <div style={{ display:"flex", background:"#0f172a", borderRadius:8, border:"1px solid #334155", overflow:"hidden" }}>
                  {["edit","preview"].map(mode => (
                    <button key={mode} onClick={() => setViewMode(mode)} style={{
                      padding:"7px 16px", border:"none", cursor:"pointer", fontSize:12, fontWeight:600,
                      background: viewMode===mode ? "#3b82f6" : "transparent",
                      color: viewMode===mode ? "#fff" : "#64748b",
                      transition:"all .15s"
                    }}>{mode==="edit" ? "✏️ Edit" : "👁 Preview"}</button>
                  ))}
                </div>
                {selectedBlocks.length > 0 && (
                  <button onClick={exportDay} style={{ padding:"7px 14px", borderRadius:8, border:"1px solid #334155", background:"#1e293b", color:"#94a3b8", cursor:"pointer", fontSize:12, fontWeight:600 }}>
                    ⬇ .md
                  </button>
                )}
              </div>
            </div>

            {/* ── EDIT MODE ── */}
            {viewMode === "edit" && (
              <div>
                {selectedBlocks.map((block, idx) => (
                  <NoteBlock key={block.id} block={block}
                    isFirst={idx===0} isLast={idx===selectedBlocks.length-1}
                    onUpdate={updateBlock} onDelete={deleteBlock} onMove={moveBlock}
                  />
                ))}
                <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
                  {[
                    { type:"text",  label:"＋ Text Note",  color:"#3b82f6" },
                    { type:"code",  label:"＋ Code Block", color:"#10b981" },
                    { type:"image", label:"＋ Screenshot",  color:"#f59e0b" },
                  ].map(({ type, label, color }) => (
                    <button key={type} onClick={() => addBlock(type)} style={{
                      padding:"9px 18px", borderRadius:8, border:`1px dashed ${color}55`,
                      background:`${color}11`, color, cursor:"pointer", fontSize:13, fontWeight:600
                    }}>{label}</button>
                  ))}
                </div>
              </div>
            )}

            {/* ── PREVIEW MODE ── */}
            {viewMode === "preview" && (
              <div style={{ background:"#1e293b", borderRadius:12, border:"1px solid #334155", overflow:"hidden" }}>
                {/* Doc title bar */}
                <div style={{ padding:"16px 24px 12px", borderBottom:"1px solid #334155", background:"#0f172a" }}>
                  <div style={{ fontSize:22, fontWeight:900, color:"#f8fafc" }}>
                    {new Date(selectedDate+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}
                  </div>
                  <div style={{ fontSize:12, color:"#475569", marginTop:4 }}>
                    {selectedBlocks.length} block{selectedBlocks.length!==1?"s":""} · Last saved locally
                  </div>
                </div>

                {/* Rendered blocks */}
                <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:16 }}>
                  {selectedBlocks.length === 0 ? (
                    <div style={{ textAlign:"center", padding:"40px 0", color:"#475569" }}>
                      <div style={{ fontSize:32, marginBottom:8 }}>📝</div>
                      <div style={{ fontSize:14 }}>No blocks yet — switch to Edit to add notes</div>
                    </div>
                  ) : (
                    selectedBlocks.map(block => <PreviewBlock key={block.id} block={block} />)
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Preview renderer for a single block ─── */
function PreviewBlock({ block }) {
  if (block.type === "text") {
    return (
      <div style={{ fontSize:14, lineHeight:1.8, color:"#cbd5e1" }}>
        {renderMarkdown(block.content)}
      </div>
    );
  }

  if (block.type === "code") {
    return (
      <div style={{ borderRadius:10, overflow:"hidden", border:"1px solid #334155" }}>
        {/* Code header */}
        <div style={{ background:"#0a0f1a", padding:"8px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #1e293b" }}>
          <div style={{ display:"flex", gap:6 }}>
            <span style={{ width:10, height:10, borderRadius:"50%", background:"#ef4444", display:"inline-block" }}/>
            <span style={{ width:10, height:10, borderRadius:"50%", background:"#f59e0b", display:"inline-block" }}/>
            <span style={{ width:10, height:10, borderRadius:"50%", background:"#10b981", display:"inline-block" }}/>
          </div>
          <span style={{ fontSize:11, color:"#64748b", fontWeight:700, letterSpacing:1 }}>{(block.language||"code").toUpperCase()}</span>
        </div>
        {/* Code body */}
        <pre style={{
          margin:0, padding:"14px 16px", background:"#020817",
          color:"#a5f3fc", fontSize:13, fontFamily:"'Courier New', monospace",
          lineHeight:1.7, overflowX:"auto", whiteSpace:"pre-wrap", wordBreak:"break-word"
        }}>
          {block.content || <span style={{ color:"#334155", fontStyle:"italic" }}>// empty block</span>}
        </pre>
      </div>
    );
  }

  if (block.type === "image") {
    if (!block.src) return (
      <div style={{ background:"#0f172a", borderRadius:10, padding:20, textAlign:"center", color:"#475569", border:"1px dashed #334155" }}>
        🖼 No image uploaded
      </div>
    );
    return (
      <div>
        <img src={block.src} alt={block.name||"screenshot"} style={{ maxWidth:"100%", borderRadius:10, border:"1px solid #334155", display:"block" }}/>
        {block.name && <div style={{ fontSize:11, color:"#475569", marginTop:6, textAlign:"center" }}>📎 {block.name}</div>}
      </div>
    );
  }

  return null;
}

/* ─── Edit block ─── */
function NoteBlock({ block, isFirst, isLast, onUpdate, onDelete, onMove }) {
  const fileInputRef = useRef();
  const [collapsed, setCollapsed] = useState(false);

  const accentColor = block.type==="text" ? "#3b82f6" : block.type==="code" ? "#10b981" : "#f59e0b";
  const typeLabel   = block.type==="text" ? "📝 TEXT"  : block.type==="code" ? "💻 CODE"  : "🖼 IMAGE";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onUpdate(block.id, { src:ev.target.result, name:file.name });
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ background:"#1e293b", borderRadius:10, marginBottom:10, border:`1px solid #334155`, borderLeft:`3px solid ${accentColor}`, overflow:"hidden" }}>
      {/* Toolbar */}
      <div style={{ padding:"7px 10px", background:"#0f172a", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:collapsed?"none":"1px solid #1e293b" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:11, color:accentColor, fontWeight:700 }}>{typeLabel}</span>
          {block.type==="code" && (
            <select value={block.language||"javascript"} onChange={e=>onUpdate(block.id,{language:e.target.value})} style={{ background:"#1e293b", border:"1px solid #334155", color:"#94a3b8", borderRadius:4, padding:"2px 6px", fontSize:11, cursor:"pointer" }}>
              {LANGUAGES.map(l=><option key={l} value={l}>{l}</option>)}
            </select>
          )}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
          <button onClick={()=>onMove(block.id,-1)} disabled={isFirst}  style={iconBtn(isFirst)}>↑</button>
          <button onClick={()=>onMove(block.id, 1)} disabled={isLast}   style={iconBtn(isLast)}>↓</button>
          <button onClick={()=>setCollapsed(c=>!c)}                      style={iconBtn(false)}>{collapsed?"▼":"▲"}</button>
          <button onClick={()=>onDelete(block.id)}                       style={{...iconBtn(false),color:"#ef4444"}}>×</button>
        </div>
      </div>

      {/* Body */}
      {!collapsed && (
        <>
          {block.type==="text" && (
            <textarea value={block.content} onChange={e=>onUpdate(block.id,{content:e.target.value})}
              placeholder={"Write notes here...\n\nSupports markdown:\n# Heading  **bold**  *italic*  `code`\n- bullet list\n> blockquote"}
              style={{ width:"100%", minHeight:120, background:"#1e293b", border:"none", color:"#e2e8f0", padding:"12px 14px", fontSize:14, resize:"vertical", fontFamily:"'Segoe UI',sans-serif", lineHeight:1.7, outline:"none", boxSizing:"border-box" }}
            />
          )}
          {block.type==="code" && (
            <div style={{ position:"relative" }}>
              <textarea value={block.content} onChange={e=>onUpdate(block.id,{content:e.target.value})}
                placeholder={`// ${block.language||"code"} here…`} spellCheck={false}
                onKeyDown={e => {
                  if (e.key==="Tab") {
                    e.preventDefault();
                    const s=e.target.selectionStart, v=e.target.value;
                    onUpdate(block.id,{content:v.slice(0,s)+"  "+v.slice(e.target.selectionEnd)});
                    setTimeout(()=>{e.target.selectionStart=e.target.selectionEnd=s+2;},0);
                  }
                }}
                style={{ width:"100%", minHeight:140, background:"#020817", border:"none", color:"#a5f3fc", padding:"12px 14px", fontSize:13, resize:"vertical", fontFamily:"'Courier New',monospace", lineHeight:1.7, outline:"none", boxSizing:"border-box" }}
              />
              <div style={{ position:"absolute", top:8, right:10, fontSize:10, color:"#334155", fontWeight:700, pointerEvents:"none" }}>{block.language}</div>
            </div>
          )}
          {block.type==="image" && (
            <div style={{ padding:14 }}>
              {block.src ? (
                <div>
                  <img src={block.src} alt={block.name||"screenshot"} style={{ maxWidth:"100%", borderRadius:8, border:"1px solid #334155", display:"block" }}/>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8 }}>
                    <span style={{ fontSize:11, color:"#64748b" }}>📎 {block.name||"image"}</span>
                    <button onClick={()=>fileInputRef.current?.click()} style={{ padding:"4px 10px", borderRadius:6, border:"1px solid #334155", background:"transparent", color:"#94a3b8", cursor:"pointer", fontSize:11 }}>Replace</button>
                  </div>
                </div>
              ) : (
                <div onClick={()=>fileInputRef.current?.click()}
                  onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>onUpdate(block.id,{src:ev.target.result,name:f.name});r.readAsDataURL(f);}}
                  onDragOver={e=>e.preventDefault()}
                  style={{ border:"2px dashed #334155", borderRadius:8, padding:36, textAlign:"center", cursor:"pointer", color:"#64748b" }}>
                  <div style={{ fontSize:34, marginBottom:8 }}>🖼</div>
                  <div style={{ fontSize:13, fontWeight:600, color:"#94a3b8" }}>Click or drag & drop</div>
                  <div style={{ fontSize:11, marginTop:4 }}>PNG, JPG, GIF, WebP</div>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display:"none" }}/>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const navBtn = { background:"#334155", border:"none", color:"#e2e8f0", borderRadius:6, padding:"4px 12px", cursor:"pointer", fontSize:18, lineHeight:1 };
const iconBtn = (disabled) => ({ background:"none", border:"none", cursor:disabled?"not-allowed":"pointer", color:disabled?"#334155":"#64748b", fontSize:14, padding:"2px 5px", borderRadius:4 });
