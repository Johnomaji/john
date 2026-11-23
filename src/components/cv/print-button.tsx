"use client";

import { profile } from "@/content/profile";
import { Button, ButtonLink } from "../ui/button";
import { Download } from "../icons";

export function PrintButton() {
  // If a real PDF has been exported to /public, link to it. Otherwise open the
  // browser's print dialog, which renders this page via the @media print rules.
  if (profile.cvPdf) {
    return (
      <ButtonLink href={profile.cvPdf} download>
        <Download className="size-4" />
        Download PDF
      </ButtonLink>
    );
  }

  return (
    <Button onClick={() => window.print()}>
      <Download className="size-4" />
      Download PDF
    </Button>
  );
}
