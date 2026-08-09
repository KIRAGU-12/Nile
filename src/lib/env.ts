export const env = {
  get supabaseUrl() {
    return process.env.NEXT_PUBLIC_SUPABASE_URL;
  },
  get supabaseAnonKey() {
    return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  },
  get supabaseSecret() {
    return process.env.SUPABASE_SECRET_KEY;
  },
  get openaiKey() {
    return process.env.OPENAI_API_KEY;
  },
  get openaiBaseUrl() {
    return process.env.OPENAI_BASE_URL;
  },
  get chatModel() {
    return process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini";
  },
  get embeddingModel() {
    return process.env.OPENAI_EMBEDDING_MODEL ?? "text-embedding-3-small";
  },
  get deepseekKey() {
    return process.env.DEEPSEEK_API_KEY;
  },
  get deepseekBaseUrl() {
    return process.env.DEEPSEEK_BASE_URL;
  },
  get deepseekChatModel() {
    return process.env.DEEPSEEK_CHAT_MODEL ?? "deepseek-chat";
  },
};
