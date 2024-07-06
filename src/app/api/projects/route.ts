import { createProject } from "@/lib/actions/projects";
import { guard } from "@/lib/auth";
import { db } from "@/lib/db";
import { projectCreateSchema } from "@/lib/validations/project";

export const POST = guard(
  async ({ user, plan, body }) => {
    try {
      const projectsCount = await db.project.count({
        where: {
          authorId: user.id,
        },
      });

      if (projectsCount >= 3 && !plan.isPro) {
        return new Response(
          "If you want to share more than 3 projects, upgrade the plan to Pro",
          { status: 401 },
        );
      }

      const project = await createProject(user.id, body);

      return new Response(JSON.stringify({ id: project.id }), {
        status: 200,
      });
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    schemas: {
      bodySchema: projectCreateSchema,
    },
  },
);
