import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { statusOptions } from '../data/campusData'
import { slug } from '../utils/formatters'
import './StatusSelect.css'

export default function StatusSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    const close = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  const selectStatus = (status) => {
    onChange(status)
    setIsOpen(false)
  }

  return <div className="status-dropdown" ref={rootRef}>
    <button className={`status-dropdown-trigger ${slug(value)}`} type="button" onClick={() => setIsOpen((current) => !current)} aria-haspopup="listbox" aria-expanded={isOpen}>
      <span>{value}</span><Icon name="chevronDown" />
    </button>
    {isOpen && <div className="status-dropdown-menu" role="listbox" aria-label="Incident status">
      {statusOptions.map((status) => <button className={status === value ? 'selected' : ''} type="button" role="option" aria-selected={status === value} key={status} onClick={() => selectStatus(status)}>{status}</button>)}
    </div>}
  </div>
}
