# 🎓 Science College Quetta — Website + Student & Teacher Portals

A full-stack college website built with **Node.js, Express, MongoDB, MongoDB Compass and Postman**, ready to deploy on **Vercel**.

**Designed & developed by Salman Sohail & Zain.**

---

## ✅ Already set up for Salman's Vercel account

The Vercel project **science-college-quetta**, its settings and the online MongoDB Atlas database are already created and linked to this folder (see `.vercel/project.json`). To publish, open a terminal in this folder and run:

```bash
npx vercel login
npx vercel --prod
```

That's it — the terminal prints the live link.

---

## ⚡ Get your live Vercel link from scratch (for a new account)

You need two free accounts: **MongoDB Atlas** (the online database) and **Vercel** (the hosting). No GitHub needed.

**Step 1 — Online database (MongoDB Atlas)**
1. Sign up at https://www.mongodb.com/cloud/atlas → **Create** → choose the **Free (M0)** cluster → Create
2. It asks you to create a database user → type a username and password (avoid `@ : /` in the password) → **Create user**
3. Left menu **Network Access** → **Add IP Address** → **Allow access from anywhere** → Confirm
4. Left menu **Database / Clusters** → **Connect** → **Drivers** → copy the string, put your password in it and add the database name after `.net/`:
   ```
   mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/science_college_quetta?retryWrites=true&w=majority
   ```

**Step 2 — Deploy (in the VS Code terminal, inside the project folder)**
```bash
npm install
npx vercel login
npx vercel
```
Answer the questions: *Set up and deploy?* **Y** → pick your account → *Link to existing project?* **N** → project name **science-college-quetta** → directory **./** → *Modify settings?* **N**.

**Step 3 — Add the secret settings, then go live**
```bash
npx vercel env add MONGODB_URI production
npx vercel env add JWT_SECRET production
npm run deploy
```
(Paste your Atlas string for `MONGODB_URI`; type any long random text for `JWT_SECRET`.)

The terminal prints your link, for example **https://science-college-quetta.vercel.app** 🎉

**Step 4 — Open it.** On the first visit the empty database fills itself with the demo data (students, courses, attendance, results…), so you can log in straight away with `salman@scq.edu.pk / student123` or `zain@scq.edu.pk / teacher123`. You don't need to run the seed for the live site.

> 💡 **For the class demo:** open the link once about 5 minutes before presenting so the server is warmed up. Keep `npm run dev` ready on your laptop as a backup in case the classroom internet is slow.

---

## ✨ What's inside

| Part | Features |
|---|---|
| **Home page** | Animated night-sky hero over the Chiltan mountains, orbiting atom, typewriter line, live notice ticker, live stats from the database, departments, portals preview, admissions steps, faculty, campus timeline, testimonials, contact form (saved to MongoDB), light/dark theme with colour ripple |
| **Login / Register** | Student / Teacher switch, demo accounts, password strength meter, teacher access code |
| **Student portal** | Dashboard with charts, enroll/drop courses, submit assignments, see attendance per course, result card + CGPA, announcements, profile & password |
| **Teacher portal** | Dashboard with charts, create/edit/delete courses, see enrolled students, publish & grade assignments, mark attendance, enter results (grade updates live), post announcements, read website inquiries, profile |
| **Backend API** | JWT login, bcrypt passwords, role-based access, 8 MongoDB collections, 40 REST endpoints |
| **Postman** | Ready-made collection that saves tokens & IDs automatically |

---

## 📁 Project structure

```
science-college-quetta/
├── api/index.js            ← Vercel serverless entry (all /api/* requests)
├── server/
│   ├── app.js              ← Express app (routes + middleware)
│   ├── config/db.js        ← MongoDB connection (cached for Vercel)
│   ├── middleware/         ← auth (JWT) + error handling
│   ├── models/             ← User, Course, Assignment, Attendance, Result, Announcement, Contact
│   ├── routes/             ← auth, courses, assignments, attendance, results, announcements, contact, dashboard
│   ├── utils/grade.js      ← grading scale
│   ├── demoData.js         ← demo data (auto-added on first run)
│   └── seed.js             ← npm run seed (reset demo data)
├── public/                 ← the website (HTML, CSS, JS, logo)
│   ├── index.html          ← home page
│   ├── login.html          ← sign in / register
│   ├── student.html        ← student portal
│   ├── teacher.html        ← teacher portal
│   └── 404.html
├── postman/                ← Postman collection + environments
├── local-server.js         ← runs everything on your computer
├── vercel.json             ← Vercel settings
├── .env.example            ← copy to .env
└── package.json
```

---

## 🚀 Run it on your computer (step by step)

### 1. Install the tools (once)
- **Node.js 18 or newer** → https://nodejs.org (LTS version)
- **MongoDB Community Server** → https://www.mongodb.com/try/download/community (tick "Install as a Service")
- **MongoDB Compass** → comes with the installer, or https://www.mongodb.com/products/compass
- **Postman** → https://www.postman.com/downloads

### 2. Open the project folder in VS Code and run in the terminal

```bash
npm install
```

### 3. Create your `.env` file
Copy `.env.example` and rename the copy to `.env`. On Windows:

```bash
copy .env.example .env
```

On Mac/Linux: `cp .env.example .env`

The default value already points to your local MongoDB, so you don't need to change anything to start.

### 4. Fill the database with demo data

```bash
npm run seed
```

You should see `✅ Demo data ready!`

### 5. Start the website

```bash
npm run dev
```

Open **http://localhost:5000** 🎉

### Demo accounts

| Role | Email | Password |
|---|---|---|
| Student | `salman@scq.edu.pk` | `student123` |
| Teacher | `zain@scq.edu.pk` | `teacher123` |

Other students: `hira@`, `ahmed@`, `fatima@`, `bilal@` … (all `@scq.edu.pk`, password `student123`).
**Teacher sign-up code:** `SCQ-TEACHER-2026` (change it in `.env`).

---

## 🧭 See the data in MongoDB Compass

1. Open Compass → **New connection** → paste `mongodb://127.0.0.1:27017` → **Connect**
2. Open the database **science_college_quetta**
3. You'll see the collections: `users`, `courses`, `assignments`, `attendances`, `results`, `announcements`, `contacts`
4. Do something on the website (submit an assignment, send a contact message) → press **Refresh** in Compass and the new document appears.

---

## 📮 Test the API in Postman

1. Postman → **Import** → select all 3 files in the `postman/` folder
2. Top-right environment dropdown → choose **SCQ Local**
3. Open the collection **Science College Quetta API**
4. Run **1. Auth → Login (student)** and **Login (teacher)** first — the tokens are saved automatically
5. Now run any other request. IDs like `courseId`, `assignmentId` and `studentId` are saved automatically too.
6. To run everything at once: click the collection → **Run** → **Run Science College Quetta API**

---

## 🌍 Put it live on Vercel

Vercel can't reach the MongoDB on your laptop, so the live site uses a free **MongoDB Atlas** database.

### A. Create the free Atlas database
1. Go to https://www.mongodb.com/cloud/atlas → sign up → create a **free M0 cluster**
2. **Database Access** → add a user (username + password — remember them)
3. **Network Access** → **Add IP Address** → **Allow access from anywhere** (`0.0.0.0/0`) — Vercel needs this
4. **Connect** → **Drivers** → copy the connection string. It looks like
   `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/`
   Add the database name at the end:
   `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/science_college_quetta?retryWrites=true&w=majority`

### B. Demo data
Nothing to do: the first visit fills an empty database automatically. To **reset** the live data later, temporarily put the Atlas string in your `.env` and run `npm run seed`.
You can also connect Compass to the Atlas string to show the live data in class.

### C. Deploy with GitHub instead of the terminal (alternative)
1. Push the project to GitHub (the `.gitignore` already skips `node_modules` and `.env`)
2. Go to https://vercel.com → **Add New → Project** → import your GitHub repo
3. Framework preset: **Other** (vercel.json already sets this). Leave build settings empty.
4. Open **Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `MONGODB_URI` | your Atlas connection string |
   | `JWT_SECRET` | any long random text |
   | `TEACHER_SIGNUP_CODE` | `SCQ-TEACHER-2026` (or your own) |

5. Click **Deploy**. When it finishes, open `https://YOUR-PROJECT.vercel.app` 🎉
6. Test: `https://YOUR-PROJECT.vercel.app/api/health` should show `"success": true`

To test the live API in Postman, choose the **SCQ Live (Vercel)** environment and change its `baseUrl` to your Vercel URL + `/api`.

---

## 🛠️ If something goes wrong

| Problem | Fix |
|---|---|
| `Database not reachable` | MongoDB isn't running. Windows: open **Services** → start **MongoDB Server**. Or check `MONGODB_URI` in `.env` |
| `Cannot reach the server` on the website | You opened the HTML file directly. Run `npm run dev` and use http://localhost:5000 |
| `Invalid email or password` with demo accounts | Run `npm run seed` to reset the demo data |
| Port 5000 already in use | Change `PORT=5001` in `.env` |
| Vercel site loads but login fails | Check the 3 environment variables in Vercel, then **Redeploy**. Make sure Atlas Network Access allows `0.0.0.0/0` |
| `npm run seed` hangs with Atlas | Wrong password in the connection string, or Network Access not set |
| Vercel link shows `Database not reachable` | Atlas Network Access must allow `0.0.0.0/0`; check the password in `MONGODB_URI`, then `npm run deploy` again |

---

## 🔌 API reference (all under `/api`)

| Method | Route | Who |
|---|---|---|
| GET | `/health` | public |
| POST | `/auth/register`, `/auth/login` | public |
| GET / PUT | `/auth/me`, `/auth/profile`, `/auth/password` | logged in |
| GET | `/courses`, `/courses/mine` | logged in |
| POST / PUT / DELETE | `/courses`, `/courses/:id` | teacher |
| GET | `/courses/:id/students` | teacher |
| POST | `/courses/:id/enroll`, `/courses/:id/unenroll` | student |
| GET / POST | `/assignments` | student (list) / teacher (create) |
| GET / DELETE | `/assignments/:id` | teacher sees all submissions |
| POST | `/assignments/:id/submit` | student |
| PUT | `/assignments/:id/grade/:studentId` | teacher |
| POST | `/attendance` | teacher |
| GET | `/attendance/course/:id` · `/attendance/me` | teacher · student |
| POST | `/results` | teacher |
| GET | `/results/course/:id` · `/results/me` | teacher · student |
| GET | `/announcements/public` | public |
| GET / POST / DELETE | `/announcements`, `/announcements/:id` | logged in / teacher |
| POST | `/contact` | public |
| GET / PATCH | `/contact`, `/contact/:id/read` | teacher |
| GET | `/dashboard/public` · `/dashboard/student` · `/dashboard/teacher` | public · student · teacher |

Grading: Sessional 20 + Mid 30 + Final 50 = 100 → A (85+), A- (80), B+ (75), B (70), B- (65), C+ (61), C (58), C- (55), D (50), F.

---

## ✏️ Make it yours
- College phone, email and address: `public/index.html` (Contact section)
- Colours: `public/css/base.css` (top of file)
- Faculty cards and testimonials: `public/index.html`
- Demo data: `server/seed.js`

---

Made with ❤️ in Quetta by **Salman Sohail** & **Zain**.
