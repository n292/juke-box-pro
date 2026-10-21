import db from "#db/client";

import { createUser } from "#db/queries/users";
import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const trackData = [
    ["Life Is a Highway - Tom Cochrane", 266000],
    ["Walking on Sunshine - Katrina and the Waves", 238000],
    ["Bohemian Rhapsody - Queen", 354000],
    ["Blinding Lights - The Weeknd", 200000],
    ["Fix You - Coldplay", 295000],
    ["Weightless - Marconi Union", 489000],
    ["Eye of the Tiger - Survivor", 245000],
    ["Here Comes the Sun - The Beatles", 185000],
    ["Hey Jude - The Beatles", 431000],
    ["Wham Bam (Shang-A-Lang) - Silver", 195000],
    ["Take Me Home, Country Roads - John Denver", 198000],
    ["Riders on the Storm - The Doors", 434000],
    ["Happy - Pharrell Williams", 233000],
    ["Lose Yourself - Eminem", 326000],
    ["Sunday Morning - Maroon 5", 241000],
    ["Southern Nights - Glen Campbell", 177000],
    ["Don't Stop Believin' - Journey", 251000],
    ["Stronger - Kanye West", 311000],
    ["Midnight City - M83", 244000],
    ["Someone Like You - Adele", 285000],
    ["Hotel California - Eagles", 391000],
    ["Out Of Touch - Daryl Hall & John Oates", 253000],
  ];

  const tracks = [];
  for (const [name, duration] of trackData) {
    tracks.push(await createTrack(name, duration));
  }

  const alice = await createUser("alice", "password123");
  const bob = await createUser("bob", "password123");


  const playlistData = [
    [alice, "Morning Boost", "Upbeat tracks to start the day", [1, 7, 12, 14, 0]],
    [alice, "Road Trip", "Windows down, volume up", [10, 20, 0, 16, 2]],
    [bob, "Workout", "High energy for the gym", [6, 13, 17, 12, 3]],
    [bob, "Rainy Day", "Moody and mellow", [11, 4, 19, 5, 18]],
  ];

  for (const [user, name, description, trackIndexes] of playlistData) {
    const playlist = await createPlaylist(name, description, user.id);
    for (const i of trackIndexes) {
      await createPlaylistTrack(playlist.id, tracks[i].id);
    }
  }
}