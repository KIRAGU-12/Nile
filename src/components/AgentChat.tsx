"use client";

import { useSyncExternalStore, useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  X,
  Minimize2,
  Maximize2,
  Plus,
  Clock,
  History,
  MoreVertical,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import Markdown from "@/components/Markdown";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatMeta {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

interface Snapshot {
  sessions: ChatMeta[]; // sorted by updatedAt desc
  activeId: string | null;
  messages: ChatMessage[];
}

interface AgentChatProps {
  fullPage?: boolean;
  courseCode?: string;
  trigger?: React.ReactNode;
}

const INDEX_KEY = "nile.chats";
const ACTIVE_KEY = "nile.chats.active";
const chatKey = (id: string) => `nile.chat.${id}`;

const EMPTY: Snapshot = {
  sessions: [],
  activeId: null,
  messages: [],
};

function getStorage(): Storage | null {
  if (typeof window === "undefined" || typeof localStorage === "undefined") return null;
  try {
    void localStorage.length;
    return localStorage;
  } catch {
    return null;
  }
}

function newId() {
  return "chat_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
}

function makeMeta(): ChatMeta {
  const now = Date.now();
  return { id: newId(), title: "New chat", createdAt: now, updatedAt: now };
}

function loadIndex(): ChatMeta[] {
  const s = getStorage();
  if (!s) return [];
  try {
    const raw = s.getItem(INDEX_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? (arr as ChatMeta[]) : [];
  } catch {
    return [];
  }
}

function saveIndex(list: ChatMeta[]) {
  const s = getStorage();
  if (!s) return;
  s.setItem(INDEX_KEY, JSON.stringify(list));
}

function loadMessages(id: string): ChatMessage[] {
  const s = getStorage();
  if (!s) return [];
  try {
    const raw = s.getItem(chatKey(id));
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? (arr as ChatMessage[]) : [];
  } catch {
    return [];
  }
}

function saveMessages(id: string, msgs: ChatMessage[]) {
  const s = getStorage();
  if (!s) return;
  s.setItem(chatKey(id), JSON.stringify(msgs));
}

function upsertMeta(meta: ChatMeta) {
  const list = loadIndex().filter((s) => s.id !== meta.id);
  saveIndex([meta, ...list]);
}

function deriveTitle(current: string, msgs: ChatMessage[]) {
  if (current && current !== "New chat") return current;
  const first = msgs.find((m) => m.role === "user");
  if (first && first.content) {
    const t = first.content.replace(/\s+/g, " ").trim().slice(0, 40);
    return t || "New chat";
  }
  return "New chat";
}

function signature(): string {
  const s = getStorage();
  if (!s) return "";
  try {
    const index = s.getItem(INDEX_KEY) ?? "";
    const active = s.getItem(ACTIVE_KEY) ?? "";
    const body = active ? (s.getItem(chatKey(active)) ?? "") : "";
    return index + "\u0000" + active + "\u0000" + body;
  } catch {
    return "";
  }
}

// Module-level cache so repeated renders with unchanged storage return the same
// reference (prevents useSyncExternalStore from looping on a fresh object).
let cacheSig = "";
let cacheSnap: Snapshot = EMPTY;

function computeSnapshot(): Snapshot {
  const sig = signature();
  if (sig === cacheSig && cacheSnap !== EMPTY) return cacheSnap;
  cacheSig = sig;
  if (!sig) {
    cacheSnap = EMPTY;
    return cacheSnap;
  }
  try {
    const index = loadIndex();
    const sorted = [...index].sort((a, b) => b.updatedAt - a.createdAt);
    const active = getStorage()?.getItem(ACTIVE_KEY) ?? "";
    const id =
      (active && sorted.some((s) => s.id === active) ? active : sorted[0]?.id) ?? null;
    const messages = id ? loadMessages(id) : [];
    cacheSnap = { sessions: sorted, activeId: id, messages };
    return cacheSnap;
  } catch {
    cacheSnap = EMPTY;
    return cacheSnap;
  }
}

const noopSubscribe = () => () => {};

export function useNileChats(): Snapshot & {
  createChat: () => void;
  switchTo: (id: string) => void;
  deleteChat: (id: string) => void;
  commitMessages: (id: string, msgs: ChatMessage[]) => void;
  ensureActive: () => string;
  reload: () => void;
} {
  const [, setVersion] = useState(0);
  const reload = () => setVersion((v) => v + 1);
  const snapshot = useSyncExternalStore(noopSubscribe, computeSnapshot, () => EMPTY);
  return {
    ...snapshot,
    createChat() {
      const def = makeMeta();
      saveMessages(def.id, []);
      upsertMeta(def);
      getStorage()?.setItem(ACTIVE_KEY, def.id);
      cacheSig = ""; // invalidate cache; recompute on next read
      reload();
      return def.id;
    },
    switchTo(id: string) {
      getStorage()?.setItem(ACTIVE_KEY, id);
      cacheSig = "";
      reload();
    },
    deleteChat(id: string) {
      const s = getStorage();
      if (s) {
        s.removeItem(chatKey(id));
        const next = loadIndex().filter((m) => m.id !== id);
        saveIndex(next);
        if (s.getItem(ACTIVE_KEY) === id) {
          const sorted = [...next].sort((a, b) => b.updatedAt - a.createdAt);
          s.setItem(ACTIVE_KEY, sorted[0]?.id ?? "");
        }
        // Always keep an active chat so the composer stays usable.
        if (!s.getItem(ACTIVE_KEY)) {
          const def = makeMeta();
          saveMessages(def.id, []);
          upsertMeta(def);
          s.setItem(ACTIVE_KEY, def.id);
        }
        cacheSig = "";
      }
      reload();
    },
    commitMessages(id: string, msgs: ChatMessage[]) {
      saveMessages(id, msgs);
      const list = loadIndex();
      const meta = list.find((m) => m.id === id);
      if (meta) {
        const updated = { ...meta, updatedAt: Date.now(), title: deriveTitle(meta.title, msgs) };
        saveIndex(list.map((m) => (m.id === id ? updated : m)));
      }
      cacheSig = "";
      reload();
    },
    ensureActive(): string {
      const cur = getStorage()?.getItem(ACTIVE_KEY) ?? "";
      const list = loadIndex();
      if (cur && list.some((m) => m.id === cur)) return cur;
      const def = makeMeta();
      saveMessages(def.id, []);
      upsertMeta(def);
      getStorage()?.setItem(ACTIVE_KEY, def.id);
      cacheSig = "";
      reload();
      return def.id;
    },
    reload,
  };
}

function formatTime(ts: number) {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function AgentChat({ fullPage = false, courseCode, trigger }: AgentChatProps) {
  const {
    sessions,
    activeId,
    messages,
    createChat,
    switchTo,
    deleteChat,
    commitMessages,
    ensureActive,
  } = useNileChats();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Always open Nile on a fresh chat (previous chats stay saved in history).
  function openFresh() {
    if (messages.length > 0 || !activeId) createChat();
    setShowHistory(false);
    setOpen(true);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Let other parts of the page (e.g. the "Nile knows this unit" card or a
  // practice question) open the chat panel by dispatching a window event.
  useEffect(() => {
    const handler = () => openFresh();
    window.addEventListener("nile:open-chat", handler);
    return () => window.removeEventListener("nile:open-chat", handler);
  }, [messages.length, activeId]);

  // Full-page mode: land on a fresh chat when the page is opened.
  const ensuredFresh = useRef(false);
  useEffect(() => {
    if (fullPage && !ensuredFresh.current) {
      ensuredFresh.current = true;
      if (messages.length > 0 || !activeId) createChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullPage]);

  function startNewChat() {
    setShowHistory(false);
    createChat();
    setInput("");
  }

  function switchToChat(id: string) {
    if (activeId) commitMessages(activeId, messages);
    switchTo(id);
    setInput("");
  }

  function deleteChatHandler(id: string) {
    if (activeId) commitMessages(activeId, messages);
    deleteChat(id);
  }

  async function send() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    const id = ensureActive();
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    commitMessages(id, newMessages);
    setLoading(true);
    setInput("");
    try {
      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          question: trimmed,
          courseCode,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        commitMessages(id, [
          ...newMessages,
          { role: "assistant", content: json.error || "Sorry, something went wrong." },
        ]);
      } else {
        commitMessages(id, [
          ...newMessages,
          { role: "assistant", content: json.answer || "" },
        ]);
      }
    } catch {
      commitMessages(id, [
        ...newMessages,
        { role: "assistant", content: "Sorry, I could not reach the assistant." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const chatBody = (
    <ChatBody messages={messages} loading={loading} bottomRef={bottomRef} />
  );
  const chatInput = (
    <ChatInput
      input={input}
      setInput={setInput}
      onSend={send}
      onNewChat={startNewChat}
      active={!!activeId}
      loading={loading}
    />
  );

  if (fullPage) {
    return (
      <div className="flex h-[calc(100dvh-13rem)] max-h-[calc(100dvh-13rem)] flex-col">
        <div className="flex flex-1 overflow-hidden">
          <HistorySidebar
            sessions={sessions}
            activeId={activeId}
            onOpen={switchToChat}
            onNew={startNewChat}
            onDelete={deleteChatHandler}
          />
          <div className="flex flex-1 flex-col overflow-hidden">
            {chatBody}
            {chatInput}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={openFresh}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 font-medium text-primary-foreground shadow-lg hover:bg-primary-hover"
      >
        {trigger ?? <span>Ask Nile</span>}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end bg-black/40 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex max-h-[calc(100dvh-2rem)] w-full max-w-md flex-col rounded-t-2xl border bg-card text-card-foreground shadow-xl sm:max-w-lg sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between rounded-t-2xl border-b bg-slate-50 px-4 py-2 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <Bot size={18} className="text-primary" />
                <span className="font-medium">Nile Assistant</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowHistory((s) => !s)}
                  className={
                    "rounded p-1 hover:bg-slate-200 dark:hover:bg-slate-700 " +
                    (showHistory ? "text-primary" : "text-slate-500 dark:text-slate-400")
                  }
                  aria-label="Past chats"
                  title="Past chats"
                >
                  <History size={14} />
                </button>
                <button
                  onClick={() => setCollapsed(!collapsed)}
                  className="rounded p-1 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                  aria-label={collapsed ? "Expand" : "Collapse"}
                >
                  {collapsed ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded p-1 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
            {!collapsed && (
              showHistory ? (
                <FloatingHistory
                  sessions={sessions}
                  activeId={activeId}
                  onOpen={(id) => {
                    if (activeId) commitMessages(activeId, messages);
                    switchTo(id);
                    setShowHistory(false);
                  }}
                  onNew={() => {
                    startNewChat();
                    setShowHistory(false);
                  }}
                />
              ) : (
                <>
                  {chatBody}
                  {chatInput}
                </>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ChatBody({
  messages,
  loading,
  bottomRef,
}: {
  messages: ChatMessage[];
  loading: boolean;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
      {messages.length === 0 ? null : (
        messages.map((m, i) => (
          <div key={i} className="mb-3 flex items-end gap-2">
            {m.role === "assistant" ? (
              <Bot size={16} className="mb-4 shrink-0 text-primary" />
            ) : null}
              <div
                className={
                  m.role === "assistant"
                    ? "prose dark:prose-invert agent-answer max-w-[75%] rounded-tr-xl rounded-tl-xl rounded-br-xl rounded-bl-none bg-slate-100 px-4 py-2 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                    : "prose dark:prose-invert agent-answer max-w-[75%] ml-auto rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-none bg-primary px-4 py-2 text-primary-foreground"
                }
              >
                <Markdown source={m.content} />
              </div>
            {m.role === "user" ? <User size={16} className="mb-4 shrink-0" /> : null}
          </div>
        ))
      )}
      {loading && (
        <div className="mb-3 flex items-end gap-2">
          <Bot size={16} className="shrink-0 text-primary" />
          <div className="rounded-tr-xl rounded-tl-xl rounded-br-xl rounded-bl-none bg-slate-100 px-4 py-2.5 text-slate-900 dark:bg-slate-800">
            <span className="text-sm text-slate-500">Nile is thinking…</span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

function ChatInput({
  input,
  setInput,
  onSend,
  onNewChat,
  active,
  loading,
}: {
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  onNewChat: () => void;
  active: boolean;
  loading: boolean;
}) {
  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };
  return (
    <div className="border-t p-3">
      <div className="mb-2 flex items-center justify-end">
        <button
          type="button"
          onClick={onNewChat}
          className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          aria-label="New chat"
          title="Start a new chat"
        >
          <Plus size={14} /> New chat
        </button>
      </div>
      <div className="flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask Nile… (Enter to send, Shift+Enter for new line)"
          disabled={loading || !active}
          className="min-h-[3rem] flex-1 resize-none rounded-md border bg-background px-3 py-2 text-sm text-foreground outline-none ring-primary focus-within:ring-2 disabled:opacity-60"
          rows={2}
        />
        <button
          onClick={onSend}
          disabled={loading || !input.trim() || !active}
          className="rounded-md bg-primary px-3 py-2 text-primary-foreground hover:bg-primary-hover disabled:opacity-60"
          aria-label="Send"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

function HistorySidebar({
  sessions,
  activeId,
  onOpen,
  onNew,
  onDelete,
}: {
  sessions: ChatMeta[];
  activeId: string | null;
  onOpen: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
}) {
  const [menuId, setMenuId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  return (
    <div className="flex min-h-0 w-56 min-w-[14rem] max-w-xs flex-col border-r bg-slate-50 dark:bg-slate-950">
      <div className="p-3">
        <button
          onClick={onNew}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
        >
          <Plus size={14} />
          New chat
        </button>
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-4">
        {sessions.length === 0 ? (
          <p className="px-2 py-4 text-xs text-slate-500">No chats yet.</p>
        ) : (
          sessions.map((s) => (
            <div key={s.id} className="group relative my-1 flex items-center">
              <button
                onClick={() => onOpen(s.id)}
                className={
                  "my-1 w-full rounded-md px-2.5 py-2 text-left text-sm " +
                  (activeId === s.id
                    ? "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800")
                }
                title={s.title}
              >
                <span className="block max-w-[8rem] truncate">{s.title}</span>
                <span className="mt-0.5 flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                  <Clock size={10} /> {formatTime(s.updatedAt)}
                </span>
              </button>
              <div className="relative ml-1">
                <button
                  onClick={() => setMenuId((m) => (m === s.id ? null : s.id))}
                  className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  aria-label="Chat options"
                  title="Chat options"
                >
                  <MoreVertical size={14} />
                </button>
                {menuId === s.id && (
                  <div className="absolute right-0 top-0 z-20 w-32 rounded-md border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                    <button
                      onClick={() => {
                        setMenuId(null);
                        setConfirmId(s.id);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </nav>

      {confirmId && (
        <DeleteConfirm
          chatTitle={sessions.find((s) => s.id === confirmId)?.title ?? "this chat"}
          onCancel={() => setConfirmId(null)}
          onConfirm={() => {
            onDelete(confirmId);
            setConfirmId(null);
            setMenuId(null);
          }}
        />
      )}
    </div>
  );
}

function FloatingHistory({
  sessions,
  activeId,
  onOpen,
  onNew,
}: {
  sessions: ChatMeta[];
  activeId: string | null;
  onOpen: (id: string) => void;
  onNew: () => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="border-b border-slate-100 p-3 dark:border-slate-800">
        <button
          onClick={onNew}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
        >
          <Plus size={14} /> New chat
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
        {sessions.length === 0 ? (
          <p className="px-2 py-4 text-xs text-slate-500 dark:text-slate-400">
            No chats yet.
          </p>
        ) : (
          sessions.map((s) => (
            <button
              key={s.id}
              onClick={() => onOpen(s.id)}
              className={
                "mb-1 block w-full rounded-md px-3 py-2 text-left text-sm " +
                (activeId === s.id
                  ? "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800")
              }
            >
              <span className="block truncate font-medium">{s.title}</span>
              <span className="mt-0.5 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Clock size={10} /> {formatTime(s.updatedAt)}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

function DeleteConfirm({
  chatTitle,
  onCancel,
  onConfirm,
}: {
  chatTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-red-500" />
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
            Delete chat?
          </h3>
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Are you sure you want to delete &ldquo;{chatTitle}&rdquo;? This cannot be undone.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}
