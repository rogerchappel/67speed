import { resultFromId } from '@/lib/game';
import { renderCardPng } from '@/lib/card';

export async function GET(_: Request, { params }: { params: Promise<{ resultId: string }> }) {
  const { resultId } = await params;
  const png = await renderCardPng(resultFromId(resultId.replace(/\.png$/, '')));

  return new Response(new Uint8Array(png), {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=31536000, immutable',
    },
  });
}
