import { useState, useRef } from "react";

const NOTES_KEY = "100xdev-notes";

function loadNotes() {
  try { return JSON.parse(localStorage.getItem(NOTES_KEY)) || {}; }
  catch { return {}; }
}

function saveNotes(notes) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function toDateStr(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const LANGUAGES = ["javascript","typescript","python","bash","sql","html","css","json","jsx","tsx","java","cpp","go","rust"];

export default function NotesTab() {
  const today = new Date();
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const [notes, setNotes] = useState(loadNotes);
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const updateNotes = (updated) => {
    setNotes(updated);
    saveNotes(updated);
  };

  const addBlock = (type) => {
    if (!selectedDate) return;
    const block = { id: Date.now().toString(), type, content: "", language: "javascript" };
    const prev = notes[selectedDate] || [];
    updateNotes({ ...notes, [selectedDate]: [...prev, block] });
  };

  const updateBlock = (id, changes) => {
    const updated = (notes[selectedDate] || []).map(b => b.id === id ? { ...b, ...changes } : b);
    updateNotes({ ...notes, [selectedDate]: updated });
  };

  const deleteBlock = (id) => {
    const updated = (notes[selectedDate] || []).filter(b => b.id !== id);
    updateNotes({ ...notes, [selectedDate]: updated });
  };

  const moveBlock = (id, dir) => {
    const blocks = [...(notes[selectedDate] || [])];
    const idx = blocks.findIndex(b => b.id === id);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= blocks.length) return;
    [blocks[idx], blocks[newIdx]] = [blocks[newIdx], blocks[idx]];
    updateNotes({ ...notes, [selectedDate]: blocks });
  };

  const exportDay = () => {
    const dayNotes = notes[selectedDate] || [];
    let md = `# Notes — ${selectedDate}\n\n`;
    dayNotes.forEach(b => {
      if (b.type === "text") md += `${b.content}\n\n`;
      else if (b.type === "code") md += `\`\`\`${b.language || ""}\n${b.content}\n\`\`\`\n\n`;
      else if (b.type === "image") md += `![${b.name || "image"}](${b.src || ""})\n\n`;
    });
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `notes-${selectedDate}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const selectedBlocks = notes[selectedDate] || [];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20, alignItems: "start" }}>

      {/* ── Calendar ── */}
      <div style={{ background: "#1e293b", borderRadius: 12, padding: 16, border: "1px solid #334155" }}>
        {/* Month nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <button onClick={prevMonth} style={navBtn}>‹</button>
          <span style={{ fontWeight: 700, color: "#f8fafc", fontSize: 14 }}>{MONTH_NAMES[currentMonth]} {currentYear}</span>
          <button onClick={nextMonth} style={navBtn}>›</button>
        </div>

        {/* Day-of-week headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
          {DAY_NAMES.map(d => (
            <div key={d} style={{ textAlign: "center", fontSize: 10, color: "#475569", fontWeight: 700, padding: "3px 0" }}>{d}</div>
          ))}
        </div>

        {/* Date cells */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
          {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const ds = toDateStr(currentYear, currentMonth, day);
            const hasNotes = !!(notes[ds] && notes[ds].length);
            const isToday = ds === todayStr;
            const isSel = ds === selectedDate;
            return (
              <button key={day} onClick={() => setSelectedDate(ds)} style={{
                padding: "7px 0", border: "none", borderRadius: 6, cursor: "pointer", position: "relative",
                background: isSel ? "#3b82f6" : isToday ? "#1e3a5f" : "transparent",
                color: isSel ? "#fff" : isToday ? "#60a5fa" : "#cbd5e1",
                fontSize: 12, fontWeight: isSel || isToday ? 700 : 400, transition: "all 0.15s"
              }}>
                {day}
                {hasNotes && (
                  <span style={{
                    position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)",
                    width: 4, height: 4, borderRadius: "50%",
                    background: isSel ? "#fff" : "#10b981", display: "block"
                  }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #334155", display: "flex", gap: 14, fontSize: 11, color: "#64748b" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} /> has notes
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 14, height: 14, borderRadius: 3, background: "#1e3a5f", display: "inline-block" }} /> today
          </span>
        </div>

        {/* All dates with notes */}
        {Object.keys(notes).filter(d => notes[d].length > 0).length > 0 && (
          <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #334155" }}>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 6 }}>NOTES ON</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 160, overflowY: "auto" }}>
              {Object.keys(notes).filter(d => notes[d].length > 0).sort().reverse().map(d => (
                <button key={d} onClick={() => setSelectedDate(d)} style={{
                  padding: "5px 8px", borderRadius: 6, border: "none", textAlign: "left",
                  background: d === selectedDate ? "#1e3a5f" : "transparent",
                  color: d === selectedDate ? "#60a5fa" : "#94a3b8",
                  fontSize: 12, cursor: "pointer", display: "flex", justifyContent: "space-between"
                }}>
                  <span>{d}</span>
                  <span style={{ color: "#475569" }}>{notes[d].length} block{notes[d].length !== 1 ? "s" : ""}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Notes Editor ── */}
      <div>
        {!selectedDate ? (
          <div style={{ background: "#1e293b", borderRadius: 12, padding: 48, border: "1px solid #334155", textAlign: "center", color: "#64748b" }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>📅</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#94a3b8" }}>Select a date to view or add notes</div>
          </div>
        ) : (
          <div>
            {/* Date header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#f8fafc" }}>
                  {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </h2>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>
                  {selectedBlocks.length} block{selectedBlocks.length !== 1 ? "s" : ""} saved
                  {selectedDate === todayStr && <span style={{ marginLeft: 8, color: "#10b981", fontWeight: 700 }}>· Today</span>}
                </div>
              </div>
              {selectedBlocks.length > 0 && (
                <button onClick={exportDay} style={{
                  padding: "8px 14px", borderRadius: 8, border: "1px solid #334155",
                  background: "#1e293b", color: "#94a3b8", cursor: "pointer", fontSize: 12, fontWeight: 600
                }}>⬇ Export .md</button>
              )}
            </div>

            {/* Blocks */}
            {selectedBlocks.map((block, idx) => (
              <NoteBlock
                key={block.id}
                block={block}
                isFirst={idx === 0}
                isLast={idx === selectedBlocks.length - 1}
                onUpdate={updateBlock}
                onDelete={deleteBlock}
                onMove={moveBlock}
              />
            ))}

            {/* Add block buttons */}
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {[
                { type: "text",  label: "＋ Text Note",   color: "#3b82f6" },
                { type: "code",  label: "＋ Code Block",  color: "#10b981" },
                { type: "image", label: "＋ Screenshot",  color: "#f59e0b" },
              ].map(({ type, label, color }) => (
                <button key={type} onClick={() => addBlock(type)} style={{
                  padding: "9px 18px", borderRadius: 8,
                  border: `1px dashed ${color}44`,
                  background: `${color}11`,
                  color, cursor: "pointer", fontSize: 13, fontWeight: 600,
                  transition: "all 0.15s"
                }}>{label}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Individual Note Block ── */
function NoteBlock({ block, isFirst, isLast, onUpdate, onDelete, onMove }) {
  const fileInputRef = useRef();
  const [collapsed, setCollapsed] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onUpdate(block.id, { src: ev.target.result, name: file.name });
    reader.readAsDataURL(file);
  };

  const typeLabel = block.type === "text" ? "📝 TEXT" : block.type === "code" ? "💻 CODE" : "🖼 IMAGE";
  const accentColor = block.type === "text" ? "#3b82f6" : block.type === "code" ? "#10b981" : "#f59e0b";

  return (
    <div style={{
      background: "#1e293b", borderRadius: 10, marginBottom: 10,
      border: `1px solid #334155`, borderLeft: `3px solid ${accentColor}`, overflow: "hidden"
    }}>
      {/* Block toolbar */}
      <div style={{
        padding: "7px 10px", background: "#0f172a",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: collapsed ? "none" : "1px solid #1e293b"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: accentColor, fontWeight: 700 }}>{typeLabel}</span>
          {block.type === "code" && (
            <select value={block.language || "javascript"} onChange={e => onUpdate(block.id, { language: e.target.value })} style={{
              background: "#1e293b", border: "1px solid #334155", color: "#94a3b8",
              borderRadius: 4, padding: "2px 6px", fontSize: 11, cursor: "pointer"
            }}>
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button onClick={() => onMove(block.id, -1)} disabled={isFirst} style={iconBtn(isFirst)}>↑</button>
          <button onClick={() => onMove(block.id,  1)} disabled={isLast}  style={iconBtn(isLast)}>↓</button>
          <button onClick={() => setCollapsed(c => !c)} style={iconBtn(false)}>{collapsed ? "▼" : "▲"}</button>
          <button onClick={() => onDelete(block.id)} style={{ ...iconBtn(false), color: "#ef4444" }}>×</button>
        </div>
      </div>

      {/* Block body */}
      {!collapsed && (
        <>
          {block.type === "text" && (
            <textarea
              value={block.content}
              onChange={e => onUpdate(block.id, { content: e.target.value })}
              placeholder="Write your notes here... (supports markdown)"
              style={{
                width: "100%", minHeight: 110, background: "#1e293b", border: "none",
                color: "#e2e8f0", padding: "12px 14px", fontSize: 14, resize: "vertical",
                fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.7,
                outline: "none", boxSizing: "border-box"
              }}
            />
          )}

          {block.type === "code" && (
            <div style={{ position: "relative" }}>
              <textarea
                value={block.content}
                onChange={e => onUpdate(block.id, { content: e.target.value })}
                placeholder={`// ${block.language || "code"} here...`}
                spellCheck={false}
                onKeyDown={e => {
                  if (e.key === "Tab") {
                    e.preventDefault();
                    const s = e.target.selectionStart;
                    const val = e.target.value;
                    onUpdate(block.id, { content: val.slice(0, s) + "  " + val.slice(e.target.selectionEnd) });
                    setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = s + 2; }, 0);
                  }
                }}
                style={{
                  width: "100%", minHeight: 140, background: "#020817", border: "none",
                  color: "#a5f3fc", padding: "12px 14px", fontSize: 13, resize: "vertical",
                  fontFamily: "'Courier New', 'Fira Code', monospace", lineHeight: 1.7,
                  outline: "none", boxSizing: "border-box", tabSize: 2
                }}
              />
              <div style={{
                position: "absolute", top: 8, right: 10,
                fontSize: 10, color: "#334155", fontWeight: 700, pointerEvents: "none"
              }}>{block.language}</div>
            </div>
          )}

          {block.type === "image" && (
            <div style={{ padding: 14 }}>
              {block.src ? (
                <div>
                  <img src={block.src} alt={block.name || "screenshot"} style={{
                    maxWidth: "100%", borderRadius: 8, border: "1px solid #334155", display: "block"
                  }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                    <span style={{ fontSize: 11, color: "#64748b" }}>📎 {block.name || "image"}</span>
                    <button onClick={() => fileInputRef.current?.click()} style={{
                      padding: "4px 10px", borderRadius: 6, border: "1px solid #334155",
                      background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 11
                    }}>Replace</button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={e => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = ev => onUpdate(block.id, { src: ev.target.result, name: file.name });
                    reader.readAsDataURL(file);
                  }}
                  onDragOver={e => e.preventDefault()}
                  style={{
                    border: "2px dashed #334155", borderRadius: 8, padding: 36,
                    textAlign: "center", cursor: "pointer", color: "#64748b",
                    transition: "border-color 0.2s"
                  }}
                >
                  <div style={{ fontSize: 34, marginBottom: 8 }}>🖼</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8" }}>Click or drag & drop to upload</div>
                  <div style={{ fontSize: 11, marginTop: 4 }}>PNG, JPG, GIF, WebP supported</div>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ── Style helpers ── */
const navBtn = {
  background: "#334155", border: "none", color: "#e2e8f0",
  borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 18, lineHeight: 1
};

const iconBtn = (disabled) => ({
  background: "none", border: "none", cursor: disabled ? "not-allowed" : "pointer",
  color: disabled ? "#334155" : "#64748b", fontSize: 14, padding: "2px 5px",
  borderRadius: 4, transition: "color 0.15s"
});
