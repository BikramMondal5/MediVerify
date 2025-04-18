<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
=======
# 🧠🔍 NeuraMed - Intelligence that safeguards every pill

NeuraMed is an AI and Blockchain-powered platform designed to detect counterfeit medications and ensure pharmaceutical authenticity. This system enables patients, pharmacists, and healthcare providers to verify the legitimacy of medicine using AI-driven visual analysis and transparent blockchain tracking.


## 🚀 Project Overview

- 🧠 **Artificial Intelligence** that scans and analyzes images of pills and packaging to detect anomalies and forgeries.
- 🔗 **Blockchain technology** to trace the complete lifecycle of a medicine from the manufacturer to the consumer.
- 📱 **Instant QR/Barcode Scan** verification for real-time validation of medicine packages.

## 🌟 Features

- 📷 AI-powered medicine packaging image analysis
- 🔐 Blockchain traceability from factory to pharmacy
- 📦 QR code-based medicine verification
- 📊 Dashboard for doctors, pharmacists, and patients
- 🔄 Real-time verification and transaction logs

## 🛠️ Tech Stack

### 🖥️ Frontend
- **Next.js** – React framework for production-ready UIs  
- **Tailwind CSS** – For rapid UI styling

### ⚙️ Backend
- **Node.js** – Backend runtime environment  
- **Express.js** – API routing  
- **MongoDB** – NoSQL database for storing user and medicine data

### 🤖 AI/ML Component
- **TensorFlow / PyTorch** – Model training  
- **Hugging Face Transformers** – Pre-trained AI models  
- **scikit-learn** – Data preprocessing  
- **Pandas, NumPy** – Data manipulation  
- **Flask / FastAPI** – Hosting AI models via API  
- **NVIDIA CUDA** – GPU acceleration (if supported)

### 🔐 Blockchain Component
- **Solidity** – Smart contract language  
- **Web3.js / ethers.js** – DApp integration  
- **Hardhat / Truffle** – Smart contract development  
- **OpenZeppelin** – Secure contract libraries  
- **IPFS** – Decentralized storage  
- **MetaMask / WalletConnect** – Wallet authentication  
- **Polygon / Optimism** – Layer 2 blockchain scaling

## 📸 How It Works

1. **Scan** – User scans the medicine packaging via the web/mobile interface. 📸
2. **Detect** – The AI model analyzes the image for inconsistencies in shape, color, label, or packaging. 🔍
3. **Verify** – Blockchain is queried to match product data against the official record. ✅
4. **Result** – The system shows whether the medicine is authentic or fake. 🏷️

---

## ⚙️ Prerequisites

- Node.js & npm
- Python 3.x
- MongoDB
- MetaMask Wallet
- Truffle or Hardhat
- CUDA toolkit (optional for GPU)

## 🤝 Contributors

- Aditya Kumar Jha - `Project Lead, Frontend developer`
- Aranya Sen - `Backend developer`
- Subhodeep Roy - `Block-chain developer`
- Bikram Mondal – `Machine Learning Developer`

## 📜 License
This project is licensed under the `Apache-2.0 license`.

>>>>>>> 52fd16042c6e871d3d26bdeba61cb4473c4f3b87
