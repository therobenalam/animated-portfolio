'use client';

import { useState, useCallback } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function TerminalContact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = useCallback(
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('sending');

      // For now, log the submission. Replace with Formspree / API route later.
      console.log('[Contact Submit]', form);

      // Simulate network delay
      await new Promise((r) => setTimeout(r, 800));
      setStatus('sent');
    },
    [form]
  );

  const inputClass =
    'w-full bg-transparent border border-white/10 focus:border-cyan-500/50 rounded px-3 py-2 text-gray-200 font-mono text-xs outline-none transition-colors placeholder:text-gray-600';

  return (
    <div className="font-mono text-sm space-y-5">
      <p className="text-green-400 text-xs tracking-widest mb-1">
        {'>'} open /dev/comm_link
      </p>

      {status === 'sent' ? (
        <div className="text-center py-8 space-y-2">
          <p className="text-green-400 text-lg">✓ MESSAGE TRANSMITTED</p>
          <p className="text-gray-500 text-xs">
            Signal received. I&apos;ll get back to you soon.
          </p>
          <button
            onClick={() => {
              setStatus('idle');
              setForm({ name: '', email: '', message: '' });
            }}
            className="mt-4 text-xs text-cyan-400 hover:text-cyan-300 tracking-widest"
          >
            [SEND ANOTHER]
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Name */}
          <div>
            <label className="text-cyan-500 text-[10px] tracking-widest block mb-1">
              {'>'} NAME
            </label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              placeholder="your_name"
              required
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-cyan-500 text-[10px] tracking-widest block mb-1">
              {'>'} EMAIL
            </label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="your@email.com"
              required
              className={inputClass}
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-cyan-500 text-[10px] tracking-widest block mb-1">
              {'>'} MESSAGE
            </label>
            <textarea
              value={form.message}
              onChange={handleChange('message')}
              placeholder="Write your message..."
              required
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-2 rounded border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors text-xs tracking-widest disabled:opacity-50 disabled:cursor-wait"
          >
            {status === 'sending' ? '> TRANSMITTING...' : '> EXECUTE SEND'}
          </button>
        </form>
      )}

      {/* Social links */}
      <div className="border-t border-white/10 pt-4">
        <p className="text-green-400 text-xs tracking-widest mb-2">
          {'>'} ls /social
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'GitHub', url: '#', icon: '◈' },
            { label: 'LinkedIn', url: '#', icon: '◆' },
            { label: 'X / Twitter', url: '#', icon: '◇' },
            { label: 'Email', url: 'mailto:hello@example.com', icon: '◉' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-gray-400 hover:text-cyan-400 tracking-widest transition-colors"
            >
              {link.icon} [{link.label.toUpperCase()}]
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
