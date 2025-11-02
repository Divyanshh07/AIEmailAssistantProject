# 🤖 AI Email Assistant – Email Reply Generator

An **AI-powered web application** that analyzes incoming emails and generates **professional, context-aware replies** using advanced **Natural Language Processing (NLP)** and **prompt-based learning**.  
This system enhances communication efficiency by automating manual email drafting — allowing users to generate replies with customizable tone and real-time preview.  
It also includes a **Chrome Extension** that integrates directly into Gmail for instant AI responses inside your inbox.


---

## 🚀 Features

✅ AI-generated email replies using Gemini/OpenAI API  
✅ Tone customization — *Formal*, *Friendly*, or *Professional*  
✅ Real-time AI reply preview in the web app  
✅ Integrated **Chrome Extension** for Gmail and other email sites  
✅ Full-stack implementation (ReactJS + Spring Boot)  
✅ Modern, responsive UI using **Material UI**  
✅ Secure and fast API communication via **Axios**

---

## 🧠 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | ReactJS, Material UI, Axios |
| **Backend** | Spring Boot, Maven |
| **AI Integration** | Google Gemini API / OpenAI API |
| **Browser Integration** | Chrome Extension (Manifest V3, JS, DOM) |
| **Programming Languages** | Java, JavaScript |
| **Build Tools** | Intellij IDE, Webstorm |
| **Deployment** | Vercel, Render |


---

## 🏗️ Folder Structure

AI-Email-Assistant/
├── frontend/ # ReactJS frontend (UI)
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/ # Spring Boot backend (API)
│ ├── src/main/java/
│ ├── pom.xml
│ └── ...
│
└── README.md

---

## 🧠 How It Works
1. User opens Gmail → clicks **“Generate AI Reply”** button added by the extension.  
2. The extension extracts the email body text.  
3. Sends it (with selected tone) to the backend `/api/email/generate`.  
4. Backend generates a professional AI response using Gemini/OpenAI.  
5. Reply is instantly placed into the Gmail editor for user review.

---

## 📸 Screenshots

Screenshots for AI Email Assistant Web Application
<img width="1920" height="1011" alt="Screenshot (84)" src="https://github.com/user-attachments/assets/70d5c31f-e7b0-4881-8bb0-812e65a86feb" />
AI Reply on gmail
<img width="1920" height="1021" alt="Screenshot (85)" src="https://github.com/user-attachments/assets/0f89ced8-b92f-457a-82b0-eca07c34d97c" />
Generating....
<img width="1920" height="1019" alt="Screenshot (86)" src="https://github.com/user-attachments/assets/a3159331-a008-4d32-879a-a5037b3f70c5" />





