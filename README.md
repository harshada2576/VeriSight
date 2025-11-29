# VeriSight

VeriSight is an autonomous agent designed to **detect and verify multimedia authenticity at scale**.  
It safeguards digital truth by combining advanced AI pipelines with human-in-the-loop verification.

---

## 🚀 Features

- **Automated Crawling**  
  - Proactively scans platforms like **YouTube** and **X (Twitter)** using targeted keywords  
  - Supports **direct user uploads** for verification

- **Multi-Modal AI Analysis**  
  - **FFmpeg preprocessing**: splits video into frames and audio tracks  
  - **Vision Transformers (ViTs)**: detect visual artifacts  
  - **CNN-based audio models**: identify inconsistencies in sound  
  - Generates a **confidence score** for authenticity

- **Provenance Layer**  
  - Reverse image search to trace original sources  
  - Strengthens credibility with source verification

- **Human-in-the-Loop Dashboard**  
  - Fact-checkers review AI-generated evidence  
  - Enables **verifiable, signed alerts** to newsrooms and platforms  
  - Ensures **timely and trusted intervention**

- **Scalable & Compliant Infrastructure**  
  - **FastAPI backend** for secure communication  
  - **React + Tailwind CSS dashboard** for intuitive UI  
  - **PostgreSQL database** for structured storage  
  - Cloud-native deployment, adhering to **MeitY advisories**

---

## 🛠️ Tech Stack

| Layer              | Technology |
|--------------------|------------|
| Preprocessing      | FFmpeg |
| AI Models          | PyTorch (ViTs + CNNs) |
| Provenance         | Reverse Image Search |
| Backend            | FastAPI |
| Frontend           | React + Tailwind CSS |
| Database           | PostgreSQL |
| Deployment         | Scalable Cloud Infrastructure |

---

## 📊 Workflow

1. **Ingest video** (crawl or upload)  
2. **Preprocess** with FFmpeg → frames + audio  
3. **Analyze** with PyTorch AI stack → confidence score  
4. **Trace provenance** via reverse image search  
5. **Fact-checker review** in dashboard  
6. **Dispatch signed alert** to newsrooms/platforms  

---

## ✅ Compliance

- Adheres to **MeitY advisories** for digital content verification  
- Designed for **scalability, transparency, and trustworthiness**

---

## 📌 Status

- Demo-ready solution  
- Built for real-world deployment to safeguard digital truth

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
