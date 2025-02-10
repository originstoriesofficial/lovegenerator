#!/bin/bash

echo "🚀 Starting ComfyUI Setup on RunPod..."

# Update and upgrade system packages
echo "🔄 Updating system packages..."
apt update && apt upgrade -y

# Install required dependencies
echo "📦 Installing dependencies..."
apt install -y git python3 python3-pip ffmpeg

# Clone ComfyUI repository
echo "📂 Cloning ComfyUI repository..."
cd /workspace || exit
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI || exit

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
pip install -r requirements.txt

# Start ComfyUI
echo "🚀 Starting ComfyUI..."
nohup python3 main.py --listen > output.log 2>&1 &

# Install ComfyUI Manager
echo "🔧 Installing Comfy Manager..."
cd /workspace/ComfyUI || exit
git clone https://github.com/ltdrdata/ComfyUI-Manager.git custom_nodes/ComfyUI-Manager

# Restart ComfyUI
echo "🔄 Restarting ComfyUI..."
nohup python3 main.py --listen > output.log 2>&1 &

echo "✅ ComfyUI is successfully installed and running!"
