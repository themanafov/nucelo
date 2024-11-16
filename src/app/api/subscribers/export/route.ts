import { guard } from "@/lib/auth";
import { getSubscibersExport } from "@/lib/fetchers/subscribers";

export const GET = guard(
  async ({ user }) => {
    try {
      const { content, filename } = await getSubscibersExport(user.id);

      return new Response(content, {
        headers: {
          "Content-Type": "application/csv",
          "Content-Disposition": `attachment; filename=${filename}`,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        return new Response(JSON.stringify(err.message), { status: 500 });
      }

      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    requiredPlan: "Pro",
  },
);
