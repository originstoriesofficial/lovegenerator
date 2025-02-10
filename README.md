# ComfyUI RunPod + Touchdesigner Setup

##  Introduction

This repository contains an automated setup script to deploy **ComfyUI** on a remote **RunPod GPU instance**. The script installs all necessary dependencies, starts ComfyUI, and includes Comfy Manager for easier node management.

##  Features

- Automatic deployment on **RunPod.io**
- Installs **ComfyUI** and required dependencies
- Sets up **Comfy Manager** for custom node management
- Ensures **ComfyUI** runs persistently in the background
- Exports API file for **TouchDesigner** integration

---

##  Installation & Usage

### **Step 1: Deploy a RunPod GPU Instance**

1. Go to [RunPod.io](https://www.runpod.io/)
2. Click **Deploy New Pod**
3. Choose **Secure Cloud** and select **Ubuntu 22.04**
4. Select a GPU with **12GB+ VRAM** (e.g., RTX 3090, A100, RTX 4090)
5. Click **Deploy Pod** and wait 1-2 minutes

### **Step 2: Connect to RunPod via SSH**

1. Open **RunPod.io** → **My Pods** → Click your Pod
2. Copy the SSH command (e.g., `ssh user@your-server-ip`)
3. Open **Terminal** and connect to the pod:
   ```bash
   ssh user@your-server-ip
   ```

### **Step 3: Run the Setup Script**

1. Download the script from GitHub:
   ```bash
   wget [https://raw.githubusercontent.com/Volo97/real-time-comfyui-touchedigner-setup-guide./blob/main/setup_comfyui.sh]
   ``` 
(It's setup_comfyui.sh in the Main folder)

2. Make the script executable:
   ```bash
   chmod +x setup_comfyui.sh
   ```
3. Run the script:
   ```bash
   ./setup_comfyui.sh
   ```

### **Step 4: Access ComfyUI**

1. Find the **Public IP** in **RunPod.io → My Pods → Networking**
2. Open your browser and enter:
   ```
   http://your-server-ip:8188
   ```
3.  **ComfyUI should be running!**

---

## ⚙️ API Integration with TouchDesigner
Touchdesigner allows for the adaptation and editing of output for different devices (projectors, TV screens, etc.)
### **Step 1: Export API File from ComfyUI**

1. Open **ComfyUI** on your browser
2. Import 
3. Click **File → Export as API**
4. Save the file with `.api` extension

### **Step 2: Setup in TouchDesigner**
(download Touchdesigner)
1. Open a new **TouchDesigner** project
2. Import **TDComfyUI.tox**. You can download it from here: **https://github.com/olegchomp/TDComfyUI**
3. Drag and drop the **API file** into the project
4. Set the **Public IP of ComfyUI** in the settings
5. Click **Run Streaming**

In case of doubts you can check the [Tutorial video here](https://www.youtube.com/watch?v=62eARh_gRhE&t=360s) 


---

##  Managing ComfyUI

### **Restart ComfyUI**

```bash
cd /workspace/ComfyUI
python3 main.py --listen
```

### **Keep ComfyUI Running in Background**

```bash
nohup python3 main.py --listen > output.log 2>&1 &
```

### **Check Running Processes**

```bash
ps aux | grep python
```

### **Stop Running Process (If Needed)**

```bash
kill -9 <PID>
```

---

## 🛠 Troubleshooting

### **Fix NumPy Version Conflict**

```bash
pip install numpy==1.23.5
```

### **Fix Port 8188 Already in Use**

```bash
ps aux | grep python
kill -9 <PID>
python3 main.py --listen
```

### **Clear UI Cache**

```bash
rm -rf /workspace/ComfyUI/web/cache
```

---

##  Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---




