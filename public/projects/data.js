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

    // Elevation spec, in metres. This is an illustrative reading of the building, not a survey.
    facade: {
      groundExtend: 10,
      blocks: [
        {
          main: true,
          x: 0,
          bays: [7.2, 8.4, 8.4, 8.4, 8.4, 8.4, 8.4, 7.2],
          levels: [
            { name: 'GF',  h: 6.0, type: 'colonnade', opts: { entranceBays: [3, 4] } },
            { name: 'L01', h: 4.2, type: 'curtain', opts: { module: 1.4 } },
            { name: 'L02', h: 3.6, type: 'punched', opts: { perBay: 2, winW: 2.0 } },
            { name: 'L03', h: 3.6, type: 'punched', opts: { perBay: 2, winW: 2.0 } },
            { name: 'L04', h: 3.6, type: 'punched', opts: { perBay: 2, winW: 2.0 } },
            { name: 'L05', h: 3.6, type: 'punched', opts: { perBay: 2, winW: 2.0 } },
            { name: 'L06', h: 3.6, type: 'balcony' }
          ],
          roof: { type: 'mansard', h: 4.6, inset: 2.2, dormersPerBay: 2 }
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
        { x: 60.4, y: 30.5, dx: 19, dy: 0, text: 'MANSARD ROOF WITH DORMERS' },
        { x: 59.0, y: 26.4, dx: 20, dy: 0, text: 'SERVICED APARTMENTS · BALCONIES' },
        { x: 60.0, y: 19.2, dx: 19, dy: 0, text: 'GUEST-ROOM FLOORS' },
        { x: 61.0, y: 8.1, elbowX: 76.4, dx: 17.6, dy: 3.9, text: 'MEETING & EVENT LEVEL' },
        { x: 92.0, y: 5.2, dx: 2, dy: 10, text: 'LONG-LEASE VILLAS' }
      ],
      titleBlock: { title: 'South elevation', sub: 'Scale 1:200 · dimensions in mm', ref: 'Mansard Riyadh · illustrative' }
    }
  }
];
