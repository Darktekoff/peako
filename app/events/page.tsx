import { prisma } from '@/lib/prisma'
import EventsClient from '@/components/EventsClient'

async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      where: {
        status: 'CONFIRMED'
      },
      orderBy: [
        { featured: 'desc' },
        { date: 'asc' }
      ]
    })
    
    // Convertir les dates en strings pour la sérialisation
    return events.map(event => ({
      ...event,
      date: event.date.toISOString(),
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString()
    }))
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export default async function Events() {
  const events = await getEvents()

  return <EventsClient events={events} />
}