// 미리보기 섹션 래퍼: 콘텐츠 카드 + 우상단 버튼 2개.
//   - 말풍선: 자연어 수정 요청 입력 후 재생성 ("더 짧게" 등)
//   - 회전 화살표: 요청 없이 그대로 다시 생성
// onRegen(idx, feedback) 형태로 호출한다. feedback이 빈 문자열이면 일반 재생성.

import { useState } from "react";
import { RotateCw, MessageSquare } from "lucide-react";

export default function PreviewSection({ idx, onRegen, onEdit, loading, accent, children }) {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const submit = () => {
    onRegen(idx, feedback.trim());
    setFeedback("");
    setOpen(false);
  };

  return (
    <div style={{ position: "relative", marginBottom: 18 }}>
      {children}

      <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 6 }}>
        {onEdit && <button onClick={onEdit} title="직접 편집" style={{width:26,height:26,borderRadius:"50%",border:"none",cursor:"pointer",color:accent}}>✏</button>}
        <button
          onClick={() => setOpen((o) => !o)}
          title="AI 수정 요청"
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            border: "none",
            background: open ? accent : "rgba(0,0,0,0.05)",
            color: open ? "#fff" : accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <MessageSquare size={13} />
        </button>
        <button
          onClick={() => onRegen(idx, "")}
          disabled={loading}
          title="AI 재생성"
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            border: "none",
            background: "rgba(0,0,0,0.05)",
            color: accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <RotateCw size={13} className={loading ? "spin" : ""} />
        </button>
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: 44,
            right: 10,
            width: 260,
            background: "#fff",
            border: "1px solid #E3E1DA",
            borderRadius: 10,
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
            padding: 12,
            zIndex: 10,
          }}
        >
          <div style={{ fontSize: 11.5, color: "#6B6A61", marginBottom: 6 }}>
            어떻게 고칠까요? (예: 더 짧게, 더 캐주얼하게)
          </div>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
            }}
            placeholder="예: 첫 문장만 더 강하게, 이모지 빼고"
            style={{
              width: "100%",
              height: 54,
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #E3E1DA",
              fontSize: 12.5,
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <button
              onClick={submit}
              disabled={loading || !feedback.trim()}
              style={{
                flex: 1,
                padding: "7px 0",
                borderRadius: 8,
                border: "none",
                background: feedback.trim() ? accent : "#E3E1DA",
                color: "#fff",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: feedback.trim() ? "pointer" : "not-allowed",
              }}
            >
              이 요청으로 수정
            </button>
            <button
              onClick={() => setOpen(false)}
              style={{
                padding: "7px 12px",
                borderRadius: 8,
                border: "1px solid #E3E1DA",
                background: "#fff",
                color: "#6B6A61",
                fontSize: 12.5,
                cursor: "pointer",
              }}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
