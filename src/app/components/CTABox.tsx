import Link from "next/link";
import Card from "./Card";

interface CTABoxProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABox({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTABoxProps) {
  const primaryIsExternal = primaryHref.startsWith("http");
  const secondaryIsExternal = secondaryHref?.startsWith("http") ?? false;

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {primaryIsExternal ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-orange-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {primaryLabel}
            </a>
          ) : (
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-orange-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {primaryLabel}
            </Link>
          )}
          {secondaryLabel && secondaryHref ? (
            secondaryIsExternal ? (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 px-5 py-3 text-sm font-medium text-gray-800 transition hover:border-orange-500 hover:text-orange-600 dark:border-white/15 dark:text-gray-100 dark:hover:border-blue-500 dark:hover:text-blue-300"
              >
                {secondaryLabel}
              </a>
            ) : (
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-full border border-gray-300 px-5 py-3 text-sm font-medium text-gray-800 transition hover:border-orange-500 hover:text-orange-600 dark:border-white/15 dark:text-gray-100 dark:hover:border-blue-500 dark:hover:text-blue-300"
              >
                {secondaryLabel}
              </Link>
            )
          ) : null}
        </div>
      </div>
    </Card>
  );
}
