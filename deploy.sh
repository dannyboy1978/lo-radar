#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════
# LO Radar — one-command deploy
# Run on the VPS from /root/loradar:
#   bash deploy.sh
# ═══════════════════════════════════════════════════════════════════════════

set -e
cd "$(dirname "$(readlink -f "$0")")"

echo ""
echo "▸ [1/4] Pulling latest from origin/main…"
git fetch origin main
git reset --hard origin/main

echo ""
echo "▸ [2/4] Rebuilding Docker image…"
docker compose build

echo ""
echo "▸ [3/4] Restarting container…"
docker compose up -d

echo ""
echo "▸ [4/4] Pruning dangling images…"
docker image prune -f

echo ""
echo "✓ Deploy complete at $(date)"
docker compose ps
