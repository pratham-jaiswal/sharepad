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
  const plain = touched?.toObject ? touched.toObject() : touched;
  const encryptedPayload = plain?.encryptedPayload
    ? {
        version: plain.encryptedPayload.version ?? null,
        kdf: plain.encryptedPayload.kdf
          ? {
              hash: plain.encryptedPayload.kdf.hash ?? null,
              iterations: plain.encryptedPayload.kdf.iterations ?? null,
            }
          : null,
        salt: plain.encryptedPayload.salt ?? null,
        iv: plain.encryptedPayload.iv ?? null,
        ciphertext: plain.encryptedPayload.ciphertext ?? null,
      }
    : null;

  return (
    <MarkdownEditor
      slug={slug}
      initialMarkdown={Boolean(pad.passwordHash) ? "" : plain.contentMarkdown || ""}
      initialExpiresAt={plain.expiresAt ? new Date(plain.expiresAt).toISOString() : null}
      isProtected={Boolean(pad.passwordHash)}
      initialEncryptedPayload={encryptedPayload}
    />
  );
}
