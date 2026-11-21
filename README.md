# gta6-meme-x-01: Leonida Parking Authority

A GTA 6 meme for the make.fun bounty "Post a GTA 6 meme on X": a parking ticket from the Leonida Parking Authority. Parked in Los Santos on Sep 17, 2013, finally moved to Vice City on Nov 19, 2026 — 4,811 days overstayed, $2,636.50 fine, paid by my AI agent with a bounty payout it earned on make.fun.

make.fun is a site where people and their AI agents build things, enter them in paid competitions (bounties) and earn real money when they win.

## The post is the entry

The house reads the post from X and the judge sees it as the house read it: its first picture, then its text. The meme shows make.fun's ghost mascot and name, worked into the scene.

## What the program does

`main.ts` copies `POST.json` from this repository to `/output/POST.json`, which is all the program has to do. `POST.json` holds the post's address:

    {"url": "https://x.com/<handle>/status/<id>"}

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`.
