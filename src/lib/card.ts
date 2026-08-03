import type { Result } from '@/lib/game';
// sharp 0.35 ships declarations, but does not expose them through package exports.
// @ts-expect-error TS7016: remove when sharp exports its bundled declarations.
import sharp from 'sharp';

export function renderCardSvg(result: Result): string { const lines = result.shareCopy.map((line, index) => `<text x="64" y="${220 + index * 44}" font-size="28" fill="#f5f7ff">${escapeXml(line)}</text>`).join(''); return `<?xml version="1.0" encoding="UTF-8"?>\n  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(result.title)}">\n    <defs>\n      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">\n        <stop offset="0%" stop-color="#0f1020" />\n        <stop offset="100%" stop-color="#5932ff" />\n      </linearGradient>\n    </defs>\n    <rect width="1200" height="630" rx="32" fill="url(#bg)" />\n    <text x="64" y="120" font-size="72" font-weight="700" fill="#fff">${escapeXml(result.title)}</text>\n    <text x="64" y="180" font-size="40" fill="#c8d0ff">${escapeXml(result.archetype)}</text>\n    ${lines}\n    <text x="64" y="564" font-size="24" fill="#d8dcff">67speed.com • zero-login nonsense test</text>\n  </svg>`; }

export async function renderCardPng(result: Result): Promise<Buffer> {
  return sharp(Buffer.from(renderCardSvg(result)))
    .png()
    .toBuffer();
}

function escapeXml(value: string): string { return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/'/g, '&apos;'); }
