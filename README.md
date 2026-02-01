# Clinic System (Next.js)

Project ini adalah dashboard manajemen klinik yang dibangun dengan Next.js 14+, menggunakan GraphQL untuk pengambilan data dan MSW (Mock Service Worker) untuk simulasi API selama pengembangan.

## 🔑 Login Credentials

Gunakan akun berikut untuk mengakses dashboard:

- **Email**: `admin@rata.id`
- **Password**: `admi123`

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **State & Data Fetching**: TanStack Query (React Query) & GraphQL Request
- **Styling**: Tailwind CSS & Shadcn UI
- **API Mocking**: MSW (Mock Service Worker)
- **Date Handling**: date-fns
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone <repository-url>
cd clinic-system
npm install
```

# Endpoint GraphQL (Diarahkan ke internal API untuk disimulasikan oleh MSW buat file .env.local)

NODE_ENV=development
NEXT_PUBLIC_API_URL=https://api-dev.rata.id/v1/graphql

# Run Project

```bash
npm run dev
```
