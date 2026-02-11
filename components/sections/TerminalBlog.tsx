'use client';

import { blogPosts } from '@/data/blog';

export default function TerminalBlog() {
  return (
    <div className="font-mono text-sm space-y-4">
      <p className="text-green-400 text-xs tracking-widest mb-1">
        {'>'} tail -f /var/log/thoughts.log
      </p>
      <p className="text-gray-500 text-xs mb-3">
        Streaming {blogPosts.length} entries...
      </p>

      <div className="space-y-4">
        {blogPosts.map((post, index) => (
          <div
            key={post.id}
            className="rounded border border-white/10 bg-white/[0.02] p-3.5 transition-all duration-300"
            style={{
              animation: `fadeSlideIn 0.4s ease ${index * 0.12}s both`,
            }}
          >
            {/* Date stamp */}
            <p className="text-gray-600 text-[10px] font-mono mb-1 tracking-wider">
              [{post.date}]
            </p>

            {/* Title */}
            <h3 className="text-white text-sm font-bold tracking-wide mb-1.5">
              {post.title}
            </h3>

            {/* Summary */}
            <p className="text-gray-400 text-xs leading-relaxed mb-2">
              {post.summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-magenta-400 text-fuchsia-400/80 bg-fuchsia-500/10 px-1.5 py-0.5 rounded font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Link */}
            {post.url ? (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-green-400 hover:text-green-300 tracking-widest"
              >
                [READ MORE]
              </a>
            ) : (
              <span className="text-[10px] text-gray-600 tracking-widest">
                [COMING SOON]
              </span>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
