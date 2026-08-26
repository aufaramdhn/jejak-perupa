import { agendaSeeder } from "@/lib/data/seeders/agendaSeeder";

export interface AgendaEventData {
  id: string;
  title: string;
  slug: string;
  eventType: "Pameran" | "Workshop" | "Diskusi" | "Open Call";
  organizer: string;
  startDate: string;
  endDate: string;
  venueName: string;
  city: string;
  description: string;
  registrationUrl?: string;
  coverUrl?: string;
}

export const agendaEventsData: AgendaEventData[] = [...agendaSeeder];
