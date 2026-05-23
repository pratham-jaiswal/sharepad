import { notFound } from "next/navigation";
import { getPad, touchPadAccess } from "@/features/pads/service";
import { hasPadAccess } from "@/lib/security/session";
import { MarkdownEditor } from "@/components/editor/markdown-editor";
import { UnlockForm } from "@/components/unlock-form";
import { generateMetadata as buildMetadata } from "@/lib/seo";
import { isReservedSlug } from "@/lib/reserved-slugs";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (isReservedSlug(slug)) return {};
  return buildMetadata({
    title: `SharePad | ${slug}`,
    description: "Collaborative markdown note.",
    path: `/${slug}`,
    noIndex: true,
  });
}

export default async function PadPage({ params }) {
  const { slug } = await params;
  if (isReservedSlug(slug)) return notFound();

  const pad = await getPad(slug);
  if (!pad) return notFound();

  if (pad.passwordHash) {
    const allowed = await hasPadAccess(slug);
    if (!allowed) return <UnlockForm slug={slug} />;
  }

  const touched = await touchPadAccess(slug);
  return (
    <MarkdownEditor
      slug={slug}
      initialMarkdown={touched.contentMarkdown || ""}
      initialExpiresAt={touched.expiresAt}
      isProtected={Boolean(pad.passwordHash)}
    />
  );
}
