import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Prompt Generator | Master ChatGPT & Gemini Prompts',
  description: 'Create high-quality AI prompts for ChatGPT, Gemini, and Midjourney. Boost your AI productivity with our free prompt engineering tool.',
  keywords: ['ai prompt generator', 'chatgpt prompt creator', 'midjourney prompts', 'prompt engineering tool'],
};

export default function AiPromptsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
