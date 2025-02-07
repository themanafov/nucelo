import { Img, Link, Text } from "@react-email/components";

export default function Footer() {
  return (
    <Text style={footer}>
      <Img
        src="https://nucelo.com/_static/nucelo-logo.png"
        width="32"
        height="32"
        alt="Nucelo's Logo"
        style={{ marginBottom: "20px" }}
      />
      <Link
        href="https://nucelo.com"
        target="_blank"
        style={{
          textDecoration: "underline",
          color: "#606060",
        }}
      >
        nucelo.com
      </Link>
      , an open-source blogging platform,
      <br />
      with a minimal and beautiful page.
    </Text>
  );
}

const footer = {
  color: "#606060",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "48px",
  marginBottom: "24px",
};
