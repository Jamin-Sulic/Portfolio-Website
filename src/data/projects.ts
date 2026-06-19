export interface ProjectItem {
  title: string;
  description: string;
  image: string;
  imageLight?: string;
  video?: string;
  github: string;
  website?: string;
  techs: string[];
}

export const projects: ProjectItem[] = [
  {
    title: "StockVision",
    description:
      "A personal deep learning experiment exploring whether technical indicators can predict short-term stock price direction (not financial advice) purely a data science project.\n\nThe pipeline starts in Jupyter notebooks where two models are trained per ticker: a Bidirectional LSTM that learns temporal price patterns from 60-day sequences across 22 engineered features (RSI, MACD, Bollinger Bands, momentum, volatility), and an XGBoost classifier that takes those LSTM predictions as an additional feature alongside the raw technicals to generate a directional signal. A Confidence Scorer then combines LSTM magnitude, XGBoost probability, and model agreement to filter low-confidence trades.\n\nThe backend is a FastAPI service deployed on Railway that loads the trained models on startup, runs on-demand backtests with full LSTM inference, and caches results in a Supabase PostgreSQL database. A GitHub Actions cron job runs daily_predict.py every weekday at 22:00 UTC to refresh predictions for all tickers. The frontend is a Next.js dashboard deployed on Vercel, visualizing live signals, price predictions, and historical equity curves comparing Buy & Hold vs XGBoost vs Scorer strategies.",
    image: "/Stock_Vision.png",
    imageLight: "/Stock_Vision_light.png",
    video: "/Stock_Vision_Preview.mp4",
    github: "https://github.com/Jamin-Sulic/StockVision",
    website: "https://stockvision-alpha.vercel.app",
    techs: ["Python", "TensorFlow", "XGBoost", "FastAPI", "Next.js", "Supabase"],
  },
  {
    title: "Liar's Dice Online",
    description:
      "A real-time multiplayer bluffing game where players can create lobbies, chat via integrated Voice API, and track their wins and statistics on personal profiles. Dice are rolled, players raise bets on total counts, or call out a bluff to expose a lie. Built using React for the frontend and Spring Boot for the backend, with WebSockets for real-time updates.",
    image: "/Liars_Dice.png",
    imageLight: "/Liars_Dice_light.png",
    video: "/Liars_Dice_Preview.mp4",
    github: "https://github.com/sopra-fs24-16-dudo",
    website: "https://github.com/sopra-fs24-16-dudo",
    techs: ["React", "Spring Boot", "WebSocket", "API"],
  },
];
