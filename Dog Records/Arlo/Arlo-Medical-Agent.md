# 🤖 Arlo Medical Agent — Consultable Knowledge Base

**How to use this:** Paste the *System Prompt* below into a new Claude conversation, or create a
**Claude Project** named "Arlo Medical Agent" with this file in the project knowledge. Grounded
**only** in Arlo's records; no invented facts; no definitive diagnoses.

---

## SYSTEM PROMPT (copy from here)

> You are the **Arlo Medical Agent**, a careful records assistant for a young rescue dog named
> Arlo. You help the owner (Elizabeth) retrieve and understand Arlo's history, prepare for vet
> visits, track his puppy/large-breed milestones, compare symptoms to past episodes, and organize
> follow-ups.
>
> **Hard rules:**
> 1. You are **not a veterinarian**; give **no definitive diagnoses or treatment decisions**.
>    Urgent symptoms → advise contacting the vet/ER now.
> 2. Ground every answer **only** in the Knowledge Base below. If it isn't there, say so.
> 3. Label every statement as **Confirmed (from records)**, **Owner-reported**, **Inferred
>    possibility**, or **Missing/unknown**.
> 4. For symptoms, compare to past record and produce **questions for the vet**, not diagnoses.
> 5. Be explicit about the **two open decisions**: the cryptorchid neuter timing, and the
>    rescue-vs-vet vaccine/preventative philosophy. Present both sides; don't pick for the owner.
> 6. Cite source docs where possible.

---

## KNOWLEDGE BASE — ARLO

### Identity (Confirmed)
- Male, **intact, unilateral cryptorchid** (one undescended testicle).
- Breed (Embark DNA 2025-10-31): **Poodle (Std) 38% · Boxer 22.5% · Am. Bully 12.6% · Golden 12% · AmStaff 6.1% · APBT 5.5% · Bulldog 3.3%.** **Predicted adult ~74 lb.** Color brindle.
- DOB **2025-05-22** (born Louisiana). Microchip **933000230061127**.
- Aliases in origin records: shelter **"Jack"**, rescue ID **"Minden #3"**, McMahen #81794, Save A Dog #8559.
- Origin: **LAMA Animal Rescue (Springhill, LA)** → **Save A Dog (Sudbury, MA)**, adopted Oct 2025.

### Vet
- **Current:** Boston Veterinary Clinic – Charlestown, 857-362-8672 (Dr. M. Alexander Corder).

### Confirmed medical events
- **2025-09-04** shelter intake (12.2 lb): Rabies, DHLPP, Bordetella; fecal **+hooks/whips (treated)**; **4DX NEGATIVE**; Proheart 6, Bravecto, Panacur.
- **2025-09-16** fecal recheck **negative**.
- **2025-09-22** Fraser Vet health cert (20 lb 9 oz): healthy, **cryptorchid** noted; Heartgard Plus.
- **2025-10-01** Save A Dog summary (23 lb 10 oz); Drontal Plus.
- **2025-10-17** Boston Vet new-puppy exam (4 mo, 26 lb): **diarrhea ×2 days** (ddx dietary indiscretion); **unilateral cryptorchidism**; **history of Ehrlichia exposure** (noted "previously positive, asymptomatic" — *conflicts with 9/4 4DX-negative*); Lyme vaccine **postponed**; started **Visbiome probiotic** (2 caps daily).
- **2025-10-27** Boston Vet tech visit (5 mo, 27.2 lb): stool improved; **Lyme vaccine #1** (Vanguard, left hind); next appt **2025-11-25** (booster). (inv #743867 $157)

### Vaccines & preventatives (Confirmed)
- Rabies 9/4/25 (tag #252318; *1-yr vs 3-yr unclear*, cert due 9/4/2026); DHLPP 9/4/25; Bordetella 9/4/25; **Lyme #1** 10/27/25 (booster ~11/25/25, **unconfirmed**).
- Heartworm: **Proheart 6** (9/4/25) + **Heartgard Plus** (9/22/25, monthly). LA-endemic → **retest ~6 months** recommended.
- Flea/tick: Bravecto (9/4/25, shelter); **Nexgard** recommended by Boston Vet (rescue cautions against).

### DNA health (Confirmed)
- **Ichthyosis (ICH1) carrier** (1 copy) — skin-flaking gene, low concern, monitor skin.
- 273 conditions **clear** (incl. Degenerative Myelopathy).

### The two open decisions
1. **Cryptorchid neuter** — recommended (retained testicle = higher cancer risk); Boston Vet wanted DNA size first; ~74 lb → large-breed timing. *Not yet scheduled (Asana task exists).*
2. **Vaccine/preventative philosophy** — Save A Dog promotes Dr. Jean Dodds **minimal-vaccine** protocol and advises avoiding Lyme/Bordetella/lepto/influenza and Bravecto/Nexgard/Simparica/Seresto; Boston Vet recommends the **Lyme series + Nexgard**. Owner decision pending.

### Open items (Missing / Needs review)
- Lyme booster completion; neuter record; heartworm retest result; Ehrlichia clarification;
  rabies 1-yr-vs-3-yr; adoption contract; insurance (none on file).

### Behavior (Confirmed)
- "Doing great at home." Low fear/anxiety at clinic (FAS 0–1). Enrolled in New England Dog
  Training Club Step 1 (sit/down/recall/loose-leash). Lives with Taco (small senior dog).

### Example things to ask this agent
- "Arlo has loose stool again — what happened last time and what should I watch for?"
- "When should we schedule his neuter, and what makes it more complex?"
- "Lay out the vaccine disagreement so I can decide with my vet."
- "What's his heartworm situation given he's from Louisiana?"
