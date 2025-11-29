# 🤝 Contributing to VeriSight

Thank you for your interest in contributing to **VeriSight**! 🎉✨
We welcome contributions of all kinds — bug fixes, new features, documentation improvements, UI / UX enhancements, or research ideas.

---

## 📦 Getting Started

### **Fork & Clone the Repository**

```bash
git fork https://github.com/<your-username>/verisight.git
cd verisight
git checkout -b feature/<name>
```

e.g.

```
feature/worker-queue
fix/ffmpeg-preview-failure
```

---

## 🔧 Development Setup

### **Backend (FastAPI)**

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.app:app --reload --port 8000
```

### **Frontend (React + Vite)**

```bash
npm install
npm run dev
```

---

## 🧠 Coding Guidelines

### **Commit Naming (Conventional Commits)**

| Prefix     | Meaning                          |
| ---------- | -------------------------------- |
| `feat`     | New feature                      |
| `fix`      | Bug fix                          |
| `docs`     | Documentation-related            |
| `refactor` | Code cleanup / structure changes |
| `test`     | Tests added or updated           |
| `style`    | Format-only changes              |

Example:

```bash
git commit -m "feat: add optical flow visualization support"
```

### **Branch Strategy**

| Branch      | Purpose                                   |
| ----------- | ----------------------------------------- |
| `main`      | Stable production branch                  |
| `dev`       | Integrated development branch             |
| `feature/*` | New features                              |
| `hotfix/*`  | Critical fixes applied directly to `main` |

---

## 📥 Pull Request Process

Before opening a PR:

* Run linting / formatting
* Add screenshots for UI changes
* Reference issues: `Fixes #123`
* Keep PRs concise and scoped

### **Open a Pull Request**

```bash
git push origin feature/<name>
```

Then create a PR on GitHub using the template provided.

### **PR Review Checkpoints**

* [ ] Code builds successfully
* [ ] Tests / pipelines clear
* [ ] No breaking changes
* [ ] Documentation updated if needed

---

## 🧪 Tests

```bash
npm run lint
```

Backend test framework & CI coming soon — contributions welcome!

---

## 🧵 Communication

| Channel       | Purpose                        |
| ------------- | ------------------------------ |
| GitHub Issues | Bug reports, feature requests  |
| Pull Requests | Collaborative review & merging |

---

## 📄 License

Contributions follow the **MIT License**.

---

## ❤️ Thank You

Every contribution helps VeriSight grow. Thank you for supporting fairness, transparency and digital truth.

> Built by **Team VeriSight — MumbaiHacks
