import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.accessToken) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { company, round1, round2, round3 } = await req.json();
    console.log("Received Rounds:", { round1, round2, round3 });

    try {
        const googleApiUrl = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
        const headers = {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
        };

        const convertToDateOnly = (isoDate: string) => {
            return isoDate.split("T")[0]; 
        };

        const events = [
            round1 && { summary: `${company} - Round 1`, date: convertToDateOnly(round1) },
            round2 && { summary: `${company} - Round 2`, date: convertToDateOnly(round2) },
            round3 && { summary: `${company} - Round 3`, date: convertToDateOnly(round3) },
        ].filter(Boolean); 

        console.log("Events to be Created:", events);

        const results = await Promise.all(
            events.map(event =>
                fetch(googleApiUrl, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        summary: event.summary,
                        start: { date: event.date }, 
                        end: { date: event.date },   
                    }),
                }).then(res => res.json())
            )
        );

        console.log("Google Calendar API Response:", results);

        return Response.json({ message: "Events Added", results }, { status: 200 });
    } catch (error) {
        console.error("Google Calendar API Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
