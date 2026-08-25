import React from "react";
import Link from "next/link";
import { MapPin, Globe, Users } from "lucide-react";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { Heading3, Paragraph } from "@/components/atoms/typography/Typography";
import { cn } from "@/lib/utils";

export interface CommunityCardProps {
  name: string;
  city: string;
  province: string;
  focusArea: string;
  description: string;
  websiteUrl?: string;
  className?: string;
}

export function CommunityCard({
  name,
  city,
  province,
  focusArea,
  description,
  websiteUrl,
  className,
}: CommunityCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs transition-all duration-300 hover:border-jp-blue-700 hover:shadow-jp-hover font-sans",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="brown">{focusArea}</Badge>
          <div className="flex items-center gap-1 text-xs text-jp-gray-500 font-medium">
            <MapPin className="h-3.5 w-3.5 text-jp-blue-700" />
            <span>{city}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-jp-blue-100 text-jp-blue-900 border border-jp-blue-200">
            <Users className="h-4.5 w-4.5" />
          </div>
          <div>
            <Heading3 className="text-lg text-jp-ink leading-tight">{name}</Heading3>
            <span className="text-xs text-jp-gray-500">{province}</span>
          </div>
        </div>

        <Paragraph className="mt-3.5 text-sm text-jp-gray-700 leading-relaxed font-prose">
          {description}
        </Paragraph>
      </div>

      <div className="mt-6 pt-4 border-t border-jp-gray-100">
        {websiteUrl && websiteUrl !== "#" ? (
          <Link href={websiteUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="w-full rounded-lg">
              <Globe className="h-3.5 w-3.5 mr-1.5" />
              Kunjungi Web Komunitas
            </Button>
          </Link>
        ) : (
          <Button variant="ghost" size="sm" disabled className="w-full text-xs rounded-lg">
            Arsip Komunitas Daerah
          </Button>
        )}
      </div>
    </div>
  );
}
