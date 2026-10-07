import { useMemo, useRef, useState } from 'react'
import Icon from '../components/Icon'
import './ChatPage.css'
import './ChatAttachments.css'
import './IconPolish.css'

const messageText = (message) => typeof message === 'string' ? message : message.text
const previewText = (message) => {
  if (typeof message === 'string') return message
  if (message.text) return message.text
  return message.attachment?.kind === 'video' ? 'Video attachment' : 'Photo attachment'
}

export default function ChatPage({ messages, onSendMessage }) {
  const [activeThread, setActiveThread] = useState(messages[0].id)
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')
  const [attachment, setAttachment] = useState(null)
  const [attachmentError, setAttachmentError] = useState('')
  const fileInputRef = useRef(null)
  const thread = messages.find((item) => item.id === activeThread) ?? messages[0]
  const visibleThreads = useMemo(() => messages.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())), [messages, query])

  const chooseAttachment = (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) { setAttachmentError('Image or video files only.'); return }
    if (file.size > 25 * 1024 * 1024) { setAttachmentError('The attachment must be 25 MB or smaller.'); return }
    const reader = new FileReader()
    reader.onload = () => { setAttachment({ kind: file.type.startsWith('video/') ? 'video' : 'image', url: reader.result, name: file.name }); setAttachmentError('') }
    reader.onerror = () => setAttachmentError('Unable to read this file. Please try another one.')
    reader.readAsDataURL(file)
  }

  const sendMessage = (event) => {
    event.preventDefault()
    if (!draft.trim() && !attachment) return
    onSendMessage(activeThread, { text: draft.trim(), attachment })
    setDraft('')
    setAttachment(null)
    setAttachmentError('')
  }

  return <section className="chat-workspace">
    <aside className="conversation-panel">
      <div className="conversation-heading"><div><h2>Chats</h2><p>Recent Chats</p></div><button className="new-chat-button" type="button"><Icon name="plus" /> Create New Chat</button></div>
      <label className="chat-search"><Icon name="search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" /><span className="chat-search-filter">Messages <Icon name="chevronDown" /></span></label>
      <div className="conversation-list">
        {visibleThreads.map((item, index) => <button className={item.id === activeThread ? 'conversation-card active' : 'conversation-card'} type="button" key={item.id} onClick={() => setActiveThread(item.id)}>
          <span className="chat-avatar"><Icon name="account" /></span>
          <span className="conversation-copy"><strong>{item.name}</strong><small>{item.online ?? 'Active recently'}</small><p>{previewText(item.preview)}</p></span>
          <time>{item.time ?? (index < 2 ? '1 minute ago' : '3 days ago')}</time>{item.unread > 0 && <b className="unread-badge">{item.unread}</b>}
        </button>)}
        {visibleThreads.length === 0 && <div className="state-box">No conversations found.</div>}
      </div>
    </aside>
    <article className="message-panel">
      <header className="message-header"><span className="chat-avatar"><Icon name="account" /></span><div><h2>{thread.name}</h2><p>{thread.online ?? 'Active recently'}</p></div><button className="chat-menu" type="button" aria-label="Conversation options"><Icon name="more" /></button></header>
      <div className="message-history"><div className="date-divider"><span>Today</span></div>{thread.messages.map((message, index) => {
        const media = typeof message === 'object' ? message.attachment : null
        return <div className={index % 2 ? 'message-group outgoing' : 'message-group'} key={`${previewText(message)}-${index}`}>
          {index % 2 === 0 && <span className="chat-avatar small"><Icon name="account" /></span>}
          <div className="message-content">{media && <div className="sent-media">{media.kind === 'video' ? <video src={media.url} controls preload="metadata" /> : <img src={media.url} alt={media.name || 'Chat attachment'} />}</div>}{messageText(message) && <p className="chat-bubble">{messageText(message)}</p>}<time>{index % 2 ? 'Delivered ✓' : 'Just now'}</time></div>
        </div>
      })}</div>
      <form className="message-composer attachment-composer" onSubmit={sendMessage}>
        {attachment && <div className="attachment-preview"><div>{attachment.kind === 'video' ? <video src={attachment.url} /> : <img src={attachment.url} alt="Attachment preview" />}</div><span><strong>{attachment.name}</strong><small>{attachment.kind === 'video' ? 'Video ready to send' : 'Photo ready to send'}</small></span><button type="button" onClick={() => setAttachment(null)} aria-label="Remove attachment"><Icon name="close" /></button></div>}
        {attachmentError && <p className="attachment-error">{attachmentError}</p>}
        <div className="composer-row"><input ref={fileInputRef} className="attachment-input" type="file" accept="image/*,video/*" onChange={chooseAttachment} /><button className="attach-button" type="button" onClick={() => fileInputRef.current?.click()} aria-label="Attach photo or video"><Icon name="paperclip" /></button><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Type a message here" /><button className="send-button" type="submit" aria-label="Send message"><Icon name="send" /></button></div>
      </form>
    </article>
  </section>
}
