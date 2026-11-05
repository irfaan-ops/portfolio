/* ==========================================================
   Project portfolio data. One entry per project.

   To add a project, copy the Mansard Riyadh entry, give it a new
   `slug`, update the text and the `facade` spec, then run
     node tools/render-elevations.js
   to refresh the card thumbnails. See README.md for the facade spec.

   Text in [square brackets] is shown as a placeholder (dotted underline)
   until you replace it with the real detail.
   ========================================================== */
window.PROJECTS = [
  {
    slug: 'mansard-riyadh',
    title: 'Mansard Riyadh',
    location: 'Riyadh, Saudi Arabia',
    category: 'Hospitality · Mixed use',
    year: '[Year]',
    role: '[My role on this project]',
    operator: 'Radisson Collection, Radisson Hotel Group',
    summary: 'A luxury hotel complex in Riyadh operated under the Radisson Collection brand, combining guest rooms, serviced apartments and long-lease villas with dining, wellness, events and retail.',
    story: [
      'The Mansard brings hotel, residential and leisure uses together on one site, so a guest, a long-stay resident and a villa owner share the same address and the same level of service.',
      '[Add a few lines on what you did on the project: the scope you owned, the budget or supply chain you managed, and the result.]'
    ],
    facts: [
      ['Hotel rooms', '140'],
      ['Serviced apartments', '27'],
      ['Long-lease villas', '24'],
      ['Restaurants', '3'],
      ['Retail units', '6']
    ],
    programme: ['Women’s spa', 'Meeting & event space', 'Three restaurants', 'Six retail shops'],
    // Optional: a photo or render (path under /assets/projects/) to fade in once the drawing completes.
    photo: null,

    // Walk-through that follows the drawing: from the facade, along the street to the entrance,
    // through the reception into the lobby, then back out to the entrance.
    // Camera moves: x/y in % of the frame, s = scale (bigger = closer). Missing photos are skipped.
    walkthrough: [
      { src: '/assets/projects/mansard-riyadh/01-facade-night.webp',   label: 'The facade',
        dur: 6.5, from: { x: 0, y: 1, s: 1.02 },    to: { x: 0, y: -1, s: 1.1 } },
      { src: '/assets/projects/mansard-riyadh/02-facade-street.webp',  label: 'Along the street',
        dur: 6,   from: { x: 2.5, y: 0, s: 1.08 },  to: { x: -2.5, y: 0, s: 1.14 } },
      { src: '/assets/projects/mansard-riyadh/03-entrance.webp',       label: 'The entrance',
        dur: 5.5, from: { x: 0, y: 0, s: 1.0 },     to: { x: 0, y: -2, s: 1.22 }, focus: '50% 70%' },
      { src: '/assets/projects/mansard-riyadh/04-entrance-close.webp', label: 'The entrance',
        dur: 5,   from: { x: 0, y: 0, s: 1.04 },    to: { x: 0, y: -3, s: 1.28 }, focus: '50% 62%' },
      { src: '/assets/projects/mansard-riyadh/05-foyer.webp',          label: 'The foyer',
        dur: 6,   from: { x: 0, y: 1, s: 1.0 },     to: { x: 0, y: -1, s: 1.2 }, focus: '58% 55%' },
      { src: '/assets/projects/mansard-riyadh/06-lobby.webp',          label: 'The lobby',
        dur: 7,   from: { x: 2.5, y: 0, s: 1.06 },  to: { x: -2.5, y: -1, s: 1.18 } },
      { src: '/assets/projects/mansard-riyadh/07-lobby-doors.webp',    label: 'Towards the doors',
        dur: 6,   from: { x: -2, y: 0, s: 1.04 },   to: { x: 2, y: -1, s: 1.16 }, focus: '62% 50%' },
      { src: '/assets/projects/mansard-riyadh/04-entrance-close.webp', label: 'Back to the entrance',
        dur: 7,   from: { x: 0, y: -3, s: 1.28 },   to: { x: 0, y: 0, s: 1.0 }, focus: '50% 62%' }
    ],

    // Elevation spec, in metres. This is an illustrative reading of the building, not a survey.
    facade: {
      groundExtend: 10,
      blocks: [
        {
          main: true,
          x: 0,
          bays: [7.2, 8.4, 8.4, 8.4, 8.4, 8.4, 8.4, 7.2],
          levels: [
            { name: 'GF',  h: 5.8, type: 'colonnade', opts: { entranceBays: [3, 4] } },
            { name: 'L01', h: 3.9, type: 'punched', opts: { perBay: 2, winW: 1.5, sill: 0.35, headGap: 0.7 } },
            { name: 'L02', h: 3.6, type: 'punched', opts: { perBay: 2, winW: 1.5, sill: 0.45, headGap: 0.6 } },
            { name: 'L03', h: 3.6, type: 'punched', opts: { perBay: 2, winW: 1.5, sill: 0.45, headGap: 0.6 } }
          ],
          // steep slate mansard with two tiers of dormers, as on the built facade
          roof: { type: 'mansard', h: 7.2, inset: 1.8, dormers: [
            { perBay: 2, w: 1.5, h: 2.1, y: 0.8, arched: true },
            { perBay: 1, w: 1.1, h: 1.5, y: 4.2 }
          ] }
        },
        {
          x: 78,
          bays: [6, 6, 6, 6],
          levels: [
            { name: 'GF',  h: 3.8, type: 'punched', opts: { perBay: 1, winW: 2.8, sill: 0.15, coursing: false } },
            { name: 'L01', h: 3.4, type: 'screen', opts: { perBay: 1, winW: 3.2, sill: 0.5 } }
          ],
          roof: { type: 'parapet', h: 1.2 }
        }
      ],
      palms: [{ x: 105, h: 8.5, lean: 0.4 }, { x: 109, h: 6.8, lean: -0.3 }],
      notes: [
        { x: 61.2, y: 20.4, dx: 18, dy: 0, text: 'SLATE MANSARD \u00B7 TWO TIERS OF DORMERS' },
        { x: 60.0, y: 15.1, dx: 19, dy: 0, text: 'STONE FACADE \u00B7 FRENCH WINDOWS' },
        { x: 60.0, y: 11.5, dx: 19, dy: 0, text: 'GUEST-ROOM FLOORS' },
        { x: 92.0, y: 5.2, dx: 2.5, dy: 4.6, text: 'LONG-LEASE VILLAS' }
      ],
      titleBlock: { title: 'South elevation', sub: 'Scale 1:200 · dimensions in mm', ref: 'Mansard Riyadh · illustrative' }
    }
  }
];
