const addDomain = async (domain: string) => {
  const res = await fetch(
    `https://api.vercel.com/v10/projects/${process.env.VERCEL_PROJECT_ID}/domains?teamId=${process.env.VERCEL_TEAM_ID}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        name: domain,
      }),
    },
  );
  const data = await res.json();

  return data;
};

const getDomainConfig = async (domain: string) => {
  const res = await fetch(
    `https://api.vercel.com/v6/domains/${domain}/config?teamId=${process.env.VERCEL_TEAM_ID}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_AUTH_TOKEN}`,
      },
    },
  );

  const data = await res.json();

  return data;
};

const getDomainResponse = async (domain: string) => {
  const res = await fetch(
    `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${domain}?teamId=${process.env.VERCEL_TEAM_ID}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_AUTH_TOKEN}`,
      },
    },
  );

  const data = await res.json();

  return data;
};

const verifyDomain = async (domain: string) => {
  const res = await fetch(
    `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${domain}/verify?teamId=${process.env.VERCEL_TEAM_ID}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_AUTH_TOKEN}`,
      },
    },
  );

  const data = await res.json();

  return data;
};

const removeDomain = async (domain: string) => {
  const res = await fetch(
    `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${domain}?teamId=${process.env.VERCEL_TEAM_ID}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_AUTH_TOKEN}`,
      },
    },
  );
  const data = await res.json();

  return data;
};

export {
  addDomain,
  getDomainConfig,
  getDomainResponse,
  removeDomain,
  verifyDomain,
};
