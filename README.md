
# 🧳 **TravelBook**

*A modern Travel and Accommodation Booking Platform built with React, TypeScript, and Vite.*

---

## 📋 Table of Contents

* [Overview](#overview)
* [Technologies & Dependencies](#technologies-dependencies)
* [Demo](#demo)
* [Login Information](#login-information)
* [Public Pages](#public-pages)
* [User Pages](#user-pages)
* [Admin Pages](#admin-panel)
* [Starting Point](#starting-point)
* [Project Scrum Board](#project-scrum-board)
* [Scripts](#scripts)
* [Getting Started](#getting-started)
* [Contact](#contact)
* [Acknowledgement](#acknowledgement)


---

## 🚀 Overview

**TravelBook** (*Travel-and-Accommodation-Booking-Platform*) is a modern, private React-based booking application designed for performance, scalability, and a seamless developer experience.

It provides a complete end-to-end solution for managing hotels, rooms, bookings, and users — supporting both **user** and **admin** dashboards with **dark/light theme** toggle.

### ✨ Core Highlights

* Built with **React 19 + TypeScript**
* Powered by **Vite** for lightning-fast builds
* Beautiful **Material UI (MUI)** components with **Dark/Light Theme** support
* **Redux Toolkit**  for state management
* **React Query** for efficient API data fetching and caching
* **Formik + Yup** for robust form handling and validation
* **JWT Authentication** for secure access
* **Leaflet / Mapbox** maps integration for location-based features
* **Axios** for HTTP requests
* **React Router DOM v7** for dynamic routing
* **Day.js** for date/time handling
* **js-cookie** for session persistence

---

## 🧠 Technologies & Dependencies

| Category               | Key Libraries                                |
| ---------------------- | -------------------------------------------- |
| **Frontend Framework** | React 19 + TypeScript                        |
| **Tooling**            | Vite, Storybook, Vitest                      |
| **UI / UX**            | Material UI (MUI), Emotion Styled Components |
| **Theme Support**      | 🌙 Dark / ☀️ Light theme                    |
| **State Management**   | Redux Toolkit, redux-persist                 |
| **Data Fetching**      | React Query (TanStack)                       |
| **Routing**            | React Router DOM v7                          |
| **Forms & Validation** | Formik + Yup                                 |
| **Maps**               | Mapbox                                       |
| **Auth**               | JWT + js-cookie                              |
| **Testing**            | Vitest, Testing Library                      |
| **PDF/Canvas Tools**   | jsPDF, html2canvas                           |
| **Date Handling**      | Day.js                                       |

---

## 🎥 Demo

📽️ Watch the demo video here:
[**TravelBook Demo**](https://drive.google.com/file/d/1ZB8NOVaaYNrOlkLEpjvMHw3e36a2SUNZ/view?usp=sharing)

---

## 🔐 Login Information

| Role      | Username | Password |
| --------- | -------- | -------- |
| **User**  | user     | user     |
| **Admin** | admin    | admin    |

---

## 🌐 Public Pages

* **Login Page**
![Login Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/1-LoginDark.png?raw=true)
![Login Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/1-LoginLight.png?raw=true)

  
* **Unauthorized Access**
![Unauthorized Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/12-unauthorizedDark.png?raw=true)

* **Not Found**
![Not Found Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/11-NotFoundDark.png?raw=true)


---

## 👤 User Pages

* **Home Page**
![Home Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/2-HomeUserDark.png?raw=true)
![Home Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/2-HomeUserLight.png?raw=true)
![Home Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/2-HomeUserDarkCollapseMidScreen.png?raw=true)

* **Search Page**
![Search Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/5-SearchDark.png?raw=true)
![Search Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/5-SearchLight.png?raw=true)
  

* **Hotel Details**
![Hotel Details Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/3-HotelDetailsDark.png?raw=true)
![Hotel Details Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/3-HotelDetailsLight.png?raw=true)

* **Rooms Page**
![Rooms Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/6-RoomsDark.png?raw=true)
![Rooms Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/6-RoomsLight.png?raw=true)

* **Destination Page**
![Destination Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/4-DestinationDark.png?raw=true)
![Destination Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/4-DestinationLight.png?raw=true)

* **Cart Page**
![Cart Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/7-CartDark.png?raw=true)
![Cart Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/7-CartLight.png?raw=true)

* **Checkout Page**
![Checkout Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/8-CheckoutDark.png?raw=true)
![Checkout Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/8-CheckoutLight.png?raw=true)
  
* **Booking Confirmation Page**
![Booking Confirmation Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/9-BookingDark.png?raw=true)
![Booking Confirmation Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/9-BookingLight.png?raw=true)  

---

## 🛠️ Admin Panel

* **Cities Management**
![Cities Management Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/10-AdminCitiesDark.png?raw=true)
![Cities Management Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/10-AdminCitiesDarkDelete.png?raw=true)
![Cities Management Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/10-AdminCitiesDarkEdit.png?raw=true)

* **Hotels Management**
![Hotels Management Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/10-AdminHotelsDark.png?raw=true)

* **Hotel Rooms Management**
![Hotel Rooms Management Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/10-AdminRoomsDark.png?raw=true)
![Hotel Rooms Management Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/10-AdminRoomsDarkNEW.png?raw=true)

* **Stats Dashboard**
![Stats Dashboard Page](https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform/blob/main/src/assets/READMEIMAGES/10-AdminSTATSDark.png?raw=true)

---

## 🧩 Starting Point

The initial UX layout was designed in [**Excalidraw**](https://excalidraw.com/#json=E95OwtS_yCQIeY6z2C1y2,hVOE2l7QvJXilwsDqrIqDg).

---

## 📊 Project Scrum Board

Project managed using **Agile Scrum** methodology — tracked via **Trello** for sprint and task management.

**Trello Board**: [**Trello Board**](https://trello.com/invite/b/68eb2c22e95190a593c480f1/ATTI867f496a78c9b69377aff803f8f15f0f79C770F9/bahaa-travel-and-accommodation-booking-platform)

---

## 🧾 Scripts

| Command                   | Description                              |
| ------------------------- | ---------------------------------------- |
| `npm run dev`             | Start development server with hot reload |
| `npm run build`           | Build production files                   |
| `npm run preview`         | Preview production build locally         |
| `npm run storybook`       | Run Storybook for UI component previews  |
| `npm test`                | Run unit tests using Vitest              |

---

## ⚙️ Getting Started

### 1️⃣ Clone the Frontend Repository

```bash
git clone https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-Platform
cd Travel-and-Accommodation-Booking-Platform
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Development Server

```bash
npm run dev
```

### 4️⃣ Clone the Backend Repository

```bash
git clone https://github.com/BahaaAbbas/Travel-and-Accommodation-Booking-BE
```

Follow its setup instructions to start the backend server.

### 5️⃣ Configure API URL

Create a `.env` file in your root directory and add:

```
VITE_API_URL="http://localhost:5000/api/"
VITE_MAPTILER_API_KEY="ADD MAPTILER API KEY HERE"
```

---

## 📫 Contact

**Author:** Bahaa Abbas

📧 **Email:** [bahaaisl566@gmail.com](mailto:bahaaisl566@gmail.com)

💻 **GitHub:** [github.com/BahaaAbbas](https://github.com/BahaaAbbas)

🔗 **LinkedIn:** [linkedin.com/in/bahaaabbas](https://www.linkedin.com/in/bahaaabbas/)

---

## 🙏 Acknowledgement

A heartfelt thank you to **Foothill Technology Solutions** for the opportunity to participate in this internship cycle.
Your guidance and mentorship were instrumental in shaping the **TravelBook** project.

