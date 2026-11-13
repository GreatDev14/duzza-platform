import type { Metadata, Viewport } from "next";
import { BotIdClient } from "botid/client";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import EnterpriseNavbar from "@/components/navigation/EnterpriseNavbar";
import EnterpriseFooter from "@/components/navigation/EnterpriseFooter";
import CookieConsentBanner from "@/components/compliance/CookieConsentBanner";
import CorporateWelcomeScreen from "@/components/animation/CorporateWelcomeScreen";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-clash",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const companyName = process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME || "DUZZA LIMITED";
const rcNumber = process.env.NEXT_PUBLIC_CAC_RC_NUMBER || "RC-7149208";
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://duzza.com.ng";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: `${companyName} | Multi-Sector Holding Company (CAMA 2020)`,
    template: `%s | ${companyName}`,
  },
  description: `Official enterprise portal for ${companyName} (${rcNumber}), registered under CAMA 2020. Active operations in Duzza Projects (Civil, Oil & Gas, Marine Hydrographic Survey, Equipment Hire) and Duzza Branding (Executive Identity & Sports Media). Headquartered in Warri, Delta State, Nigeria.`,
  keywords: [
    "DUZZA LIMITED",
    "Marine Survey Nigeria",
    "Hydrographic Equipment Hire",
    "Oil and Gas Contractor Delta State",
    "Executive Branding Agency Nigeria",
    "Sports Media Content Agency",
    "CAMA 2020 Conglomerate",
    "Warri Engineering Contractors",
  ],
  authors: [{ name: "DUZZA LIMITED Corporate Communications" }],
  creator: "DUZZA LIMITED",
  publisher: "DUZZA LIMITED",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: `${companyName} | Enterprise Conglomerate & Holding Group`,
    description: `Official enterprise portal for DUZZA LIMITED (${rcNumber}). Engineering, Marine Hydrospatial Survey, Oil & Gas, and Executive Branding.`,
    url: appUrl,
    siteName: companyName,
    locale: "en_NG",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050B18",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-[#050B18]`} suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className="min-h-screen max-w-full overflow-x-hidden bg-[#050B18] text-[#F1F5F9] flex flex-col selection:bg-[#D4AF37] selection:text-[#050B18] antialiased font-sans">
        <BotIdClient
          protect={[
            { path: "/api/auth/login", method: "POST" },
            { path: "/api/auth/signup", method: "POST" },
            { path: "/api/enquiry", method: "POST" },
          ]}
        />
        <CorporateWelcomeScreen />
        <EnterpriseNavbar />
        <main className="flex-1 pt-20 flex flex-col bg-[#050B18] max-w-full overflow-x-hidden">
          {children}
        </main>
        <EnterpriseFooter />
        <CookieConsentBanner />
      </body>
    </html>
  );
}

