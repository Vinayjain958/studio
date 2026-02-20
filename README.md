# 🎬 Movie Scene Scripter

Movie Scene Scripter is an AI-powered web application that enables users to generate professional cinematic scripts based on a selected mood or theme. It's designed for beginner filmmakers, writers, and content creators to simplify the scriptwriting process by providing structured screenplays with dialogue, scene descriptions, character actions, and camera directions.

### ✨ Live Demo

[Link to your live demo]

---

![Movie Scene Scripter Screenshot](https://picsum.photos/seed/screenshot/1200/800?data-ai-hint=website%20screenshot)

## 🌟 Features

-   **🎭 Mood/Theme Input**: Simple text field to input the desired mood, genre, or theme.
-   **🤖 AI Script Generator**: Leverages generative AI to create complete movie scenes, including:
    -   Scene titles
    -   Setting descriptions
    -   Character lists and descriptions
    -   Dialogue, actions, and parentheticals
    -   Camera directions (e.g., CLOSE UP, WIDE SHOT)
-   **🎞️ Professional Script Formatting**: Displays the output in a structured, industry-standard screenplay format.
-   **⚡ One-Click Generation**: A "Generate Script" button to instantly create a new scene.
-   **🔄 Regenerate Scene**: Create alternate versions of the scene with the same mood, offering creative variations.
-   **🌗 Dark/Light Mode**: A sleek theme toggle for comfortable reading in any lighting condition, with preferences saved locally.
-   **📋 Copy Script**: Easily copy the entire formatted script to the clipboard.
-   **📱 Fully Responsive**: A clean and accessible layout that works flawlessly on desktop and mobile devices.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **AI**: Google Gemini via [Genkit](https://firebase.google.com/docs/genkit)
-   **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 How to Run Locally

Follow these steps to get the project up and running on your local machine.

### Prerequisites

-   Node.js (v18 or later)
-   npm, pnpm, or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/movie-scene-scripter.git
cd movie-scene-scripter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

This project uses Google's Gemini model via Genkit. You'll need a Google AI API key.

1.  Create a `.env` file in the root of the project.
2.  Add your API key to the `.env` file:

```env
GOOGLE_API_KEY=your_google_ai_api_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

## 部署

You can easily deploy this application to [Vercel](https://vercel.com/), the platform from the creators of Next.js.

### 1. Push to GitHub

Push your cloned and configured repository to your own GitHub account.

### 2. Import Project on Vercel

1.  Go to your Vercel dashboard and click "Add New... -> Project".
2.  Import the GitHub repository you just pushed.
3.  Vercel will automatically detect that it's a Next.js project.

### 3. Configure Environment Variables

In the project settings on Vercel, add the `GOOGLE_API_KEY` environment variable with your key.

### 4. Deploy

Click the "Deploy" button. Vercel will build and deploy your application. Once finished, you'll get a public URL for your live site.

## 📸 Screenshots

| Light Mode                                                                      | Dark Mode                                                                     |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| ![Light Mode Screenshot](https://picsum.photos/seed/light/1200/800?data-ai-hint=website%20screenshot) | ![Dark Mode Screenshot](https://picsum.photos/seed/dark/1200/800?data-ai-hint=website%20dark) |
