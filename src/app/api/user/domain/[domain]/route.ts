import { guard } from "@/lib/auth";
import { validDomainRegex } from "@/lib/constants";
import {
  getDomainConfig,
  getDomainResponse,
  verifyDomain,
} from "@/lib/domains";
import { DomainStatus } from "@/types";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    domain: z.string().regex(validDomainRegex),
  }),
});

export const GET = guard(
  async ({ ctx }) => {
    try {
      const { domain } = ctx.params;

      const [domainRes, config] = await Promise.all([
        getDomainResponse(domain),
        getDomainConfig(domain),
      ]);
      let status: DomainStatus = "Valid Configuration";
      if (domainRes?.error?.code === "not_found") {
        status = "Domain not found";
      } else if (domainRes.error) {
        status = "Unknown Error";
      } else if (!domainRes.verified) {
        status = "Pending Verification";
        const res = await verifyDomain(domain);
        if (res && res.verified) {
          status = "Valid Configuration";
        }
      } else if (config.misconfigured) {
        status = "Invalid Configuration";
      } else {
        status = "Valid Configuration";
      }
      delete domainRes.projectId;

      return new Response(JSON.stringify({ status, domainRes }));
    } catch (err) {
      return new Response(null, { status: 500 });
    }
  },
  {
    requiredPlan: "Pro",
    schemas: {
      contextSchema: routeContextSchema,
    },
  },
);
