# CTF Nexus Control

A comprehensive Capture The Flag (CTF) platform built with modern web technologies. This application provides a user-friendly interface for managing CTF challenges, user profiles, and leaderboards.

## ✨ Features

- **User Authentication**: Secure sign-up and login with email/password
- **Challenge Management**: Create, read, update, and delete CTF challenges
- **User Roles**: Differentiate between regular users and administrators
- **Leaderboard**: Track user scores and rankings
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui and Tailwind CSS

## 🚀 Tech Stack

- **Frontend**: 
  - React 18
  - TypeScript
  - Vite
  - shadcn/ui
  - Tailwind CSS
  - React Hook Form
  - Radix UI Primitives

- **Backend**:
  - Supabase (Authentication & Database)
  - PostgreSQL (via Supabase)
  - Row Level Security (RLS)

## 🛠️ Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Supabase account and project

## 🏗️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ctf-nexus-control-center.git
   cd ctf-nexus-control-center
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Add your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your-supabase-url
     VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

4. **Database Setup**
   - Run the SQL scripts in `supabase/migrations` to set up your database schema
   - Enable Row Level Security (RLS) and set up appropriate policies

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🔒 Authentication

The application uses Supabase Auth for user authentication. The following user roles are supported:

- **Regular Users**: Can view challenges and submit flags
- **Admins**: Can manage challenges and user accounts

## 📦 Project Structure

```
ctf-nexus-control-center/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts (Auth, Theme, etc.)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and configurations
│   ├── pages/          # Page components
│   └── styles/         # Global styles
├── public/             # Static assets
├── supabase/           # Database migrations and SQL scripts
└── vite.config.ts      # Vite configuration
```

## 📝 Database Schema

Key tables:
- `profiles`: User profiles and authentication
- `challenges`: CTF challenges with categories and difficulty levels
- `solves`: Tracks which users have solved which challenges

## 🧪 Running Tests

```bash
npm test
# or
yarn test
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Import the repository to Vercel
3. Add your environment variables
4. Deploy!

### Netlify

1. Connect your GitHub repository to Netlify
2. Set the build command: `npm run build` or `yarn build`
3. Set the publish directory: `dist`
4. Add your environment variables
5. Deploy site

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Supabase](https://supabase.com/) for the amazing backend
- [Vite](https://vitejs.dev/) for the fast development experience
