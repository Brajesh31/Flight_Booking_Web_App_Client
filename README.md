# ✈️ Flight Booking Frontend

This is the **frontend** of a flight booking application built using **React** and **Tailwind CSS**. It is optimized for speed, scalability, and production deployment using **Google Cloud Platform (GCP)**.

---

## 🧰 Tech Stack

- **Frontend Framework**: React (Vite or CRA)
- **Styling**: Tailwind CSS
- **Cloud Storage**: GCP Cloud Storage (for hosting static `dist/` files)
- **CDN & Load Balancer**: GCP Cloud CDN + HTTP(S) Load Balancer
- **Serverless Functions**: GCP Cloud Functions (for raising alerts after payment)

---



## 🚀 Features

- Fast, mobile-responsive UI
- Hosted on Cloud Storage as a static site
- Global delivery with GCP CDN
- Load-balanced with GCP HTTP(S) Load Balancer
- Cloud Function integration for post-payment notifications

---

## Project Demonstraion

![image](https://github.com/user-attachments/assets/b7d50a31-15c3-4a3d-81c4-ed7eea9dc962)
- Uploading of dist folders (build folders) in gcp storage

![image](https://github.com/user-attachments/assets/3523a796-6686-44f8-ba6c-9e8db1e900b1)
- Load Balancer

![image](https://github.com/user-attachments/assets/ec918e71-904b-42fa-8f9c-04ebd611ac8c)
- Cloud CDN

![image](https://github.com/user-attachments/assets/62d53621-2e5b-40f4-99d8-04190eccdf42)
- Triggering Cloud Run service after successful payment




## 📁 Project Structure

```bash
├── public/              # Static public assets
├── src/                 # React components & pages
├── dist/                # Production build output (deployed)
├── tailwind.config.js   # Tailwind CSS config
├── vite.config.js       # (or) react-scripts config if using CRA
├── package.json         # Project metadata and scripts
└── README.md            # This file

Last updated: 2026-10-25 23:48 UTC
