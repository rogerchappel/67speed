import { resultFromId } from '@/lib/game';
import { renderCardSvg } from '@/lib/card';
export async function GET(_: Request, { params }: { params: Promise<{ resultId: string }> }) { const { resultId } = await params; const svg = renderCardSvg(resultFromId(resultId.replace(/\.png$/, ''))); return new Response(svg, { headers: { 'content-type': 'image/svg+xml', 'cache-control': 'public, max-age=31536000, immutable' } }); }
