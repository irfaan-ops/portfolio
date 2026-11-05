# Mansard Riyadh: image-to-video walkthrough prompts

These are 24 scenes, one for each supplied photo, set out as a single tour. The tour starts on the street, goes through the gate and the hotel lobby, and continues into the villa. In the villa it covers the entrance hall, the living, dining and kitchen areas, then goes upstairs to the mansard suite: its hallway, the primary bedroom and the bathroom. It then visits the guest rooms in the main building and ends outside at night.

**Settings for Kling 3.0 / Google Veo**
- Clip length is 5 seconds by default; the range is 4–6 seconds. Use 16:9, 4K or the highest available, at 24 fps.
- Mode: Image-to-Video with the photo as the **first frame**. Where a Transition Note says "end frame", load the next scene's photo as the **last frame**. Use Kling Start + End Frame, or the first/last frame option in Veo. The generator then joins the two clips into one continuous move.
- Camera: one move per clip, at gimbal or steady-cam speed, with no shake and no cuts inside a clip.
- Negative prompt, if the tool has a field for it: `morphing, warping, melting furniture, new objects, extra people, flicker, changing light, text distortion, logo distortion, fast motion, handheld shake`.
- Some photos were taken at different times of day: day, golden hour and night. In those places the Transition Note says to use a 1-second crossfade rather than an interpolated bridge. The model cannot invent a believable change of light between them.
- File names are the names you gave the photos. **Foyer.webp** is in fact an elevated night view of the pedestrian street, so it is used near the end as an exterior shot.

---

[Scene 1: Exterior, street approach at golden hour]
- **Source Image File:** Property Facade-2.webp
- **Walkthrough Direction:** The opening establishing shot. The camera drives forward along the empty road toward the long limestone frontage, with the slate mansard roof and the second building in the distance under a soft sunset sky.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable forward dolly at road level along the empty asphalt, drifting slightly right toward the lit shopfronts of the limestone building while the slate mansard roofline and dormer windows stay level in frame, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** Ends with the camera closer to the frontage. Crossfade (about 1 s) into Scene 2, because the light changes from sunset to daylight.

[Scene 2: Exterior, corner of the building]
- **Source Image File:** Property Facade.webp
- **Walkthrough Direction:** The camera comes up to the corner of the main building and looks along its two faces: carved stone window surrounds, wrought-iron balconettes and two tiers of dormers.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable low-angle push-in toward the corner of the stone facade with a gentle tilt down from the dormer windows of the slate mansard roof to the ground-floor arches, keeping vertical lines perfectly straight, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** The tilt ends at street level. Pan right along the frontage and use **Entrance.webp as the end frame**, so the camera turns to face the forecourt gate.

[Scene 3: Front Entrance, forecourt]
- **Source Image File:** Entrance.webp
- **Walkthrough Direction:** The camera faces the gate straight on. It lines up between the two mansard wings and moves along the centre line toward the pedimented gatehouse, the flagpoles and the MANSARD sign.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable symmetrical dolly-in along the exact centre line between the two limestone wings, toward the pedimented gatehouse, the two flagpoles and the stone MANSARD sign, keeping the composition perfectly symmetrical, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** Keep the push going. Use **Zoomed Entrance.webp as the end frame**, so the sign and gatehouse fill the frame.

[Scene 4: Front Entrance, the gate]
- **Source Image File:** Zoomed Entrance.webp
- **Walkthrough Direction:** The camera arrives at the gate. It glides past the MANSARD · A Radisson Collection Hotel sign and lines up with the glass canopy behind it.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable forward glide with a very slight rise, passing over the low planting toward the black glass canopy behind the stone MANSARD sign, flags gently still, the sign lettering kept perfectly sharp and unchanged, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** Ends close on the canopy doors. Crossfade (about 1 s) through the doors into Scene 5, going from outside to inside.

[Scene 5: Foyer, reception desk]
- **Source Image File:** Lobby Reception.webp
- **Walkthrough Direction:** The first view inside the building. The camera moves across the pale herringbone marble floor toward the reception desk, which is framed by gold fluted panels in a tall white portal.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable gimbal dolly-in across the polished herringbone marble floor toward the black reception desk inside the tall white portal with gold fluted panels, reflections on the floor moving naturally, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** About halfway to the desk, the camera pans left toward the lounge. Crossfade into Scene 6, because the two photos do not share a sight line.

[Scene 6: Living area, main lobby lounge]
- **Source Image File:** Lobby Reception-1.webp
- **Walkthrough Direction:** This is the hotel's main living space. The camera glides through the double-height lounge, past the gold-panelled feature wall, the brass coffee table and the grey marble floor.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable steady-cam glide forward and slightly left past the brass coffee table and grey upholstered seating, along the glowing gold-panelled wall toward the dark marble columns and floor-to-ceiling windows at the back, coffered ceiling cove lights steady, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** Ends looking toward the columns and the glazing. Use **Lobby Reception-2.webp as the end frame**, so the camera seems to keep walking down the same lounge.

[Scene 7: Living area, lounge toward the revolving door]
- **Source Image File:** Lobby Reception-2.webp
- **Walkthrough Direction:** The camera slides sideways past the blue velvet armchairs and the marble column, ending with a view of the revolving door. This is the turning point that takes the visitor through to the residences.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable lateral truck right past the dark marble column and blue velvet armchairs, then eases forward toward the brass revolving door glowing under the chandelier, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** Ends on the revolving door. Crossfade (about 1 s) to Scene 8, which moves the tour from the hotel lobby into a long-lease villa.

[Scene 8: Foyer, villa entrance hall]
- **Source Image File:** Guest Room-14.webp
- **Walkthrough Direction:** The camera enters the villa. It moves from inside the front door along the marble hall, under the crystal chandelier, past the brass-and-walnut sideboard and toward the curved marble staircase.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable forward dolly along the veined white marble hallway, passing beneath the tiered crystal chandelier with the walnut sideboard and gold mirror panels on the left and the dark marble curved staircase with brass balustrade on the right, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** Before reaching the stairs, the camera turns left into the open-plan room. Use **Guest Room-4.webp as the end frame**.

[Scene 9: Living area, open-plan living and dining]
- **Source Image File:** Guest Room-4.webp
- **Walkthrough Direction:** The camera glides along the grey marble dining table and around the black marble column with gold shelving. Ahead are the plum armchairs and the sofa in the living area.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable arcing glide to the right along the oval grey marble dining table, curving around the black marble column with backlit gold shelving toward the plum velvet armchairs and cream sofa, crystal pendant overhead unchanged, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** The arc ends looking into the living area. Use **Guest Room-2.webp as the end frame**.

[Scene 10: Living area, living room and garden doors]
- **Source Image File:** Guest Room-2.webp
- **Walkthrough Direction:** The camera is in the seating area: burgundy tub chairs, a black marble coffee table, and the black-and-gold marble media wall. Daylight from the garden comes through the tall French doors.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable push-in between the burgundy tub chairs and the black marble coffee table, drifting left toward the tall black-framed French doors and the green garden beyond, with the gold-trimmed marble media wall steady on the right, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** Ends near the garden doors. The camera then turns back across the room toward the dining area. Crossfade into Scene 11.

[Scene 11: Kitchen, dining by the kitchen island]
- **Source Image File:** Guest Room-15.webp
- **Walkthrough Direction:** The camera moves toward the family dining table. On the left are the kitchen island and blue bar stools; on the right is the marble wall with the blue horse painting.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable dolly-in past the navy quilted dining chairs and the white marble table toward the tall window, with the walnut kitchen island and blue bar stools on the left and the framed blue horse painting on the dark marble wall on the right, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** Ends beside the island. The camera pans left behind the counter, so the next shot is from the kitchen side. Crossfade into Scene 12.

[Scene 12: Kitchen, kitchen to dining]
- **Source Image File:** Guest Room-3.webp
- **Walkthrough Direction:** The camera looks over the grey kitchen counter and walnut cabinetry, past the black marble shelving wall, to the dining table, the chandelier and the garden doors at the back.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable forward glide just above the grey kitchen worktop, past the black marble shelving wall with warm gold lighting, toward the dining table with burgundy chairs, the glass pendant chandelier and the black-framed garden doors, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** Ends near the dining area. The tour then goes up the staircase from Scene 8 to the mansard floor. Crossfade into Scene 13.

[Scene 13: Living area, upper-floor dining room]
- **Source Image File:** Guest Room-13.webp
- **Walkthrough Direction:** This is the first room on the upper floor. The camera passes the black-and-gold marble dining table under the ring chandelier, with the sloping mansard wall in the corner.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable arcing dolly right around the black and white veined marble dining table with navy chairs, beneath the crystal ring chandelier, toward the round gold-framed mirror and the white panelled door, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** The arc ends facing the open doorway to the suite's lounge. Crossfade into Scene 14.

[Scene 14: Living area, mansard suite lounge]
- **Source Image File:** Guest Room-12.webp
- **Walkthrough Direction:** The camera is in the attic lounge: a full-height black marble media wall, a round black glass coffee table on a marble-pattern rug, cream armchairs, and a sloping mansard wall with a dormer window.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable push-in past the cream sofa toward the nested black glass coffee tables and the full-height black marble media wall, under the crystal ring chandelier, with the sloped mansard wall and tall dormer window on the left, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** Ends by the media wall. The camera turns toward the bedroom wing. Crossfade into Scene 15.

[Scene 15: Hallway, dressing corridor]
- **Source Image File:** Guest Room-9.webp
- **Walkthrough Direction:** The camera walks down the white-lacquered wardrobe corridor with brass handles and the walnut vanity, toward the bedroom visible at the far end.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable forward walk-through down the white marble corridor between the cream wardrobes with long brass handles and the walnut vanity niche, toward the bright bedroom framed by the doorway at the end, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** Push through the doorway at the end. Use **Guest Room-11.webp as the end frame**, so the camera comes out into the bedroom.

[Scene 16: Primary Bedroom, bed and dormer window]
- **Source Image File:** Guest Room-11.webp
- **Walkthrough Direction:** This is the main bedroom of the suite, under the sloped mansard ceiling. The camera passes the desk and the wall-mounted TV, moving between the bed and the chaise longue toward the tall dormer window.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable forward glide between the white king bed with cream channel-tufted headboard and the brown velvet chaise longue, over the herringbone oak floor, toward the tall dormer window with grey linen curtains set into the sloped panelled wall, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** Ends near the window. Crossfade into Scene 17, a second angle of the same type of mansard bedroom.

[Scene 17: Primary Bedroom, desk corner]
- **Source Image File:** Guest Room-7.webp
- **Walkthrough Direction:** The camera moves along the foot of the bed toward the reading corner, which has a grey armchair, a dormer window and a black writing desk with a linen lamp.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable lateral truck right along the foot of the white bed toward the black writing desk with the white drum lamp, the grey lounge chair and the narrow dormer window, keeping the angled mansard wall panels straight and steady, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** The camera ends at the desk and turns round to face the corridor. Crossfade into Scene 18.

[Scene 18: Primary Bedroom, view back to the corridor]
- **Source Image File:** Guest Room-8.webp
- **Walkthrough Direction:** The reverse view: the camera looks from the bedroom back down the marble corridor toward the bathroom. The TV wall is on the left, the bed and the brass floor mirror on the right.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable dolly-in between the black desk with the linen lamp and the bed, toward the lit marble corridor and the brass-framed floor mirror, heading for the doorway at the far end, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** The camera enters the corridor and turns left into the bathroom. Crossfade into Scene 19.

[Scene 19: Primary Bedroom, ensuite bathroom]
- **Source Image File:** Guest Room-10.webp
- **Walkthrough Direction:** The camera moves past the dark marble vanity with its white basin toward the walk-in rain shower with its glowing wall niche.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable gentle push-in and slight pan right from the black marble vanity and white basin toward the frameless glass walk-in shower with the ceiling rain head and the backlit linear niche, mirror reflections staying consistent, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** Ends on the shower niche. Crossfade into Scene 20, which takes the tour back into the main hotel building and its guest-room floors.

[Scene 20: Primary Bedroom, hotel guest room]
- **Source Image File:** Guest Room-6.webp
- **Walkthrough Direction:** A hotel king room seen square from the foot of the bed. The camera pushes down the room, past the grey upholstered bench, toward the French window and the writing desk.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable centred dolly-in past the grey channel-stitched bench at the foot of the white king bed, toward the tall French window with grey curtains and the desk with the navy chair, wall TV and panelled walls perfectly still, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** Same room, wider angle. Use **Guest Room-1.webp as the end frame**, so the camera seems to arc left to a corner view.

[Scene 21: Primary Bedroom, guest room in sunlight]
- **Source Image File:** Guest Room-1.webp
- **Walkthrough Direction:** The camera arcs across the sunlit room. Light falls across the oak floor, and the camera ends on the French window and the balcony railing.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable forward glide along the grey bench and the white bed, through the warm shafts of sunlight on the herringbone oak floor, toward the black-framed French window and wrought-iron balcony railing, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** Ends near the window. Crossfade into Scene 22, a balcony room on the same facade.

[Scene 22: Patio, balcony bedroom]
- **Source Image File:** Guest Room-5.webp
- **Walkthrough Direction:** The camera moves past the sofa with plum cushions and the onyx coffee table, toward the open French doors and the balcony. This is the step outside before the evening finale.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable forward dolly past the taupe sofa with plum cushions and the onyx coffee table, toward the tall black-framed French doors with the wrought-iron balcony and grey curtains, daylight steady, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** The camera ends at the balcony doors. Use a slow 1–1.5 s crossfade (or a fade through white) into Scene 23, which moves from day to night.

[Scene 23: Patio, evening view over the pedestrian street]
- **Source Image File:** Foyer.webp
- **Walkthrough Direction:** The camera looks out from a high terrace at night over the illuminated pedestrian street, the palms and the lit facade with its mansard roof.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable elevated forward drift out over the terrace edge, following the lit pedestrian street lined with small palms toward the floodlit limestone facade and slate mansard roof against the deep blue night sky, all lights steady and unflickering, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** Ends looking along the street at the facade. Use **Property Facade-1.webp as the end frame**, so the camera turns to face the building head-on.

[Scene 24: Exterior, night elevation (finale)]
- **Source Image File:** Property Facade-1.webp
- **Walkthrough Direction:** The closing shot is the full frontal night elevation: uplit stone, arched dormers and the slate mansard. The camera holds square to the building and rises slowly to end the tour.
- **AI Video Generator Prompt:** "Cinematic real estate walkthrough footage starting exactly from the provided image. The camera executes a slow, ultra-smooth, stable perfectly frontal crane rise with a gentle push toward the uplit arched dormers and the slate mansard roof, symmetry and straight verticals held exactly, warm facade lighting steady against the deep blue night sky, moving deeper into the space. Maintain 100% strict visual fidelity of the room structure, lighting, and textures. No morphing, no warping, and no newly invented objects. Hyper-realistic, 4k resolution, architectural showcase style."
- **Transition Note:** The final clip. Hold the last frame for about 1 s, then fade to black or to the MANSARD title card. To loop the tour, crossfade from here back into Scene 1.

---

**Tour order at a glance:** Exterior (1–2) → Front Entrance (3–4) → Foyer and lobby (5–7) → Villa foyer (8) → Living (9–10) → Kitchen (11–12) → Upper-floor living (13–14) → Hallway (15) → Primary Bedroom and bath (16–19) → Hotel guest rooms (20–21) → Patio and night finale (22–24). At 5 s per clip the tour runs about 2 minutes.
