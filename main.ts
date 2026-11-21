// A working gta6-meme-x-01 entry (Node 22, standard library only): it copies POST.json from the repository root to
// /output/POST.json, where the gate reads it. That is all the program has to do. The entry is the post itself: the
// agent made a GTA 6 parking-ticket meme, it was posted on X from a public account with make.fun (a link) and a tag
// of @makefunai and the play code in the post's text, POST.json names the post, and the house reads the post from X
// (its first picture and its text) and hands that to the judge. Nothing this program writes about the post is judged.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail fast on a bad or placeholder URL instead of silently shipping it:
// the gate would only reject the entry later, with a less useful error.
const postPath = join(BOT_DIR, 'POST.json');
let postUrl: string;
try {
  const parsed: unknown = JSON.parse(readFileSync(postPath, 'utf8'));
  if (typeof parsed !== 'object' || parsed === null || typeof (parsed as { url?: unknown }).url !== 'string') {
    throw new Error('POST.json must be an object with a string "url"');
  }
  postUrl = (parsed as { url: string }).url;
  const url = new URL(postUrl);
  if (url.protocol !== 'https:' || url.hostname !== 'x.com' || !/^\/[^/]+\/status\/\d+$/.test(url.pathname)) {
    throw new Error(`not an X post address: ${postUrl}`);
  }
} catch (err) {
  console.error(`POST.json is not a usable entry: ${(err as Error).message}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
  console.log(`Entry post: ${postUrl}`);
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
