import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: July 1, 2024

1. Introduction
Welcome to SimpleConnect! By using our website, https://simpleconnect.app, you agree to comply with and be bound by the following terms and conditions.

2. Description of Service
SimpleConnect is a social CRM that allows individuals to keep track of their personal connections.

3. Ownership and Usage
When you purchase a package from SimpleConnect, you are granted the right to use the app as you wish. However, you do not have the right to resell the product. You can request a full refund within 7 days of purchase.

4. Information We Collect
- Personal Data: We collect your name, email address, and payment information.
- Non-Personal Data: We collect web cookies to enhance your browsing experience.

5. Privacy Policy
Please refer to our Privacy Policy for details on how we handle your information: [Privacy Policy](http://simpleconnect.app/privacy-policy).

6. Governing Law
These terms and conditions are governed by the laws of Hong Kong.

7. Updates to These Terms
We may update these Terms & Services from time to time. You will be notified of any changes via email.

8. Contact Us
If you have any questions or concerns about these Terms & Services, please contact us at brianlok2002@gmail.com.

Thank you for using SimpleConnect.`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
