
#  Find-RealEst

**Find-RealEst** is a full-stack real estate platform that simplifies property transactions for both **proprietors** and **tenants**. Proprietors can list their properties, while tenants can explore listings, select suitable properties based on their preferences, and initiate transactions. Additionally, the platform provides a **dashboard** for both parties to track paid and upcoming transactions.

---

##  Features

*  Browse and filter properties as a tenant
*  List new properties as a proprietor
*  Dashboard to manage property listings and transaction history
*  Secure authentication using AWS Cognito
*  Real-time transaction tracking
*  Cloud storage for property images and documents (via AWS S3)
*  Fully responsive and animated UI

---

##  Tech Stack

### Frontend

* **Next.js** – React framework for server-side rendering
* **Redux Toolkit** – State management
* **Tailwind CSS** – Utility-first CSS framework
* **ShadCN/UI** – Pre-built accessible components
* **TypeScript** – Strong typing for better maintainability
* **Framer Motion** – Smooth animations
* **React Hook Form + Zod** – Form management with schema validation

### Backend

* **Node.js** + **Express.js** – RESTful API server
* **AWS EC2** – Server hosting
* **API Gateway** – API management
* **AWS RDS** – Relational database (e.g., PostgreSQL/MySQL)
* **AWS S3** – File/image storage
* **AWS Amplify** – CI/CD and hosting support

### Authentication

* **AWS Cognito** – User sign-up, sign-in, and access control

---

## 📊 System Design

Check out the complete architecture and flow diagrams on Miro:
🔗 [System Design Diagrams](https://miro.com/app/board/uXjVLgjxNpE=/)

---

## 📦 Installation

### Prerequisites

* Node.js (v16+)
* AWS account and services configured
* PostgreSQL/MySQL database (RDS)

### Clone the Repository

```bash
git clone https://github.com/your-username/find-realest.git
cd find-realest
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

> Configure `.env` files in both frontend and backend with appropriate credentials and keys.

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

For any queries or collaborations:

* Linked In – Hoshang Dogra - www.linkedin.com/in/hoshang1406 
* Email – hoshangdogra@gmail.com 


