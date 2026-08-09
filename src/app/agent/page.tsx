import AgentChat from "@/components/AgentChat";

export const metadata = {
  title: "Ask Nile — AI study assistant",
  description: "Ask Nile anything about the English and Literature course.",
};

export default function AgentPage() {
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl font-bold text-primary">Nile</span>
      </div>
      <AgentChat fullPage />
    </div>
  );
}
