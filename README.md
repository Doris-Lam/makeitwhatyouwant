# Make it what you want

A dynamic website generator that creates unique, interactive HTML pages on-demand using AI. Each URL path generates a completely different experience, making every visit unique.

## Features

- **Dynamic Content Generation**: Every URL path generates a unique webpage using AI
- **Client-Side Only**: All generated pages are pure HTML/CSS/JS with no backend dependencies
- **Modern UI**:
  - Sleek glass-effect toolbar
  - Smooth animations and transitions
  - Responsive design
  - Dark mode by default
- **Toolbar Features**:
  - Hard Reload: Generate completely new content
  - Soft Reload: Refresh current content without API call
  - Random: Visit a randomly generated path
  - Download HTML: Save the current page
  - Share on Twitter: Share your discoveries
  - History: Track your visited paths
  - Social Links: Quick access to developer profiles

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **AI**: Google Gemini 1.5 Flash
- **Images**: Unsplash API integration

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Doris-Lam/makeitwhatyouwant.git
   cd makeitwhatyouwant
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env.local` file** with your API keys:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
   ```
   
   Get your free API keys from:
   - [Google AI Studio](https://aistudio.google.com/app/apikey) for Gemini
   - [Unsplash Developers](https://unsplash.com/developers) for images

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## How It Works

1. When a user visits any path (e.g., `/cool/page`), the app captures the full path
2. The system extracts keywords from the path to fetch relevant images from Unsplash
3. The path and images are sent to Gemini AI with enhanced prompts for spectacular websites
4. Gemini generates contextually relevant HTML with embedded images and creative styling
5. The HTML is rendered directly in the browser with no backend processing
6. A persistent toolbar provides navigation and utility functions

## Usage Examples

Try visiting these paths to see AI-generated content:
- `/space/adventure` - Cosmic exploration themes
- `/underwater/city` - Aquatic urban landscapes  
- `/mountain/peak` - Alpine adventure experiences
- `/cyber/punk` - Futuristic dystopian aesthetics
- `/medieval/castle` - Historical fantasy realms
- `/rainbow/paradise` - Colorful joyful experiences
- `/crystal/cave/magic` - Mystical underground worlds

Or create your own: `localhost:3000/your/custom/path`

## Customization

### Prompt Modification
The generation prompts can be found in `src/lib/prompts.ts`. Modify them to change the style or behavior of generated pages.

### Toolbar Customization
The toolbar component (`src/components/HoverToolbar.tsx`) can be modified to add or remove features.

## Deployment

The project is ready for deployment on platforms like Vercel:

```bash
npm run build
```

Just ensure your environment variables are properly set in your deployment platform.

## Cost Estimation

Using Gemini 1.5 Flash + Unsplash API:
- Gemini: ~50K characters per generation, very low cost
- Unsplash: Free tier allows 50 requests/hour
- Approximately $0.00625 per page generation

## Contributing

Feel free to open issues or submit pull requests. All contributions are welcome!

## License

MIT License - feel free to use this project however you'd like!
