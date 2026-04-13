// Cloudflare Pages Function — AI-powered graph query
// POST /api/graph-query { question: "..." }
// Uses Anthropic Claude Haiku for speed + low cost

const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';

// Graph schema embedded at build time
const GRAPH_CONTEXT = `KNOWLEDGE GRAPH for "After the Grind" by Andrew Perkins.
This graph maps the ideas, research, archetypes, and people behind the book.

Archetype (10): ["The Liaison","The Bridge Builder","The Translator","The Architect","The Orchestrator","The Sensemaker","The Mentor of Mentors","The Reflective Futurist","The Narrative Carrier","The Signal Architect"]
Book (2): ["After the Grind","The Loneliness Problem"]
Chapter (4): ["The Loneliness Problem","Only Human in the Room","The Teammate Test","Superscaling the Individual"]
Concept (202): ["automation","THE GRIND","AI-driven productivity gains","human judgment","pattern recognition","creativity","ethical reasoning","interpersonal trust","strategic thinking","4I Framework","Interpretive Intelligence","Integrative Intelligence","Interpersonal Intelligence","Imaginative Intelligence","consumer perception","implicit cognition","brand equity","stereotype activation","evaluative conditioning","nostalgia marketing","body image in advertising","inclusive language","moral outrage","trade dress","weight stigma","gender bias","power and consumption","temporal landmarks","crowdsourcing methodology","shelter medicine"]
Dimension (8): ["Interpretive","Integrative","Interpersonal","Imaginative","4I Framework","Human Value Spectrum","The Grind","Post-Grind Economy"]
Essay (40): ["The Grind Is Ending Faster Than You Think","25 Papers Later","Agents and the Work-to-Signal Ratio","The Invisible Admissions Office","The Last Moment That Matters","The AI-Washing Problem","How Agents Break the Procrastination Loop","Eighteen Months to What, Exactly?","The Vanishing First Rung","If You Are Not Burning Tokens, You Are Not Working","Who Survives the White-Collar Reset","The 20,000 Preview","The Skill They Are Outsourcing to Survive","The Grind Was the Job","The Week the Grind Got Louder","The Chaos Tsunami Is Here","The Dehumanization Fear and the Humanity Opportunity","The Fear Index Is Up. The Strategy Is Wrong.","The Graph That Goes Down and to the Right"]
Organization (21): includes universities, companies, research institutions
Paper (7): ["Implicit Assimilation and Explicit Contrast","Decomposing the Implicit Self-Concept","Implicit Self-Referencing","Activating Stereotypes with Brand Imagery","Crowdsourcing the IAT","Benevolent Sexism at Work","Global Warming Denialism"]
Person (40): includes researchers, authors, industry figures
Source (80): includes journals, news outlets, data sources
Topic (11): ["Teaching & Academics","AI & Automation","Career Strategy","Research & Papers","Content Creation","Infrastructure","Book Development","Social Media & Marketing","Home & Personal","Bitcoin & Finance","WSU Campus"]`;

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const question = body.question;

    if (!question || question.length < 3) {
      return jsonResponse({ error: 'Question too short' }, 400);
    }

    // Rate limit: simple in-memory (resets on cold start)
    const now = Date.now();

    const response = await fetch(ANTHROPIC_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': context.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20250414',
        max_tokens: 400,
        messages: [{
          role: 'user',
          content: `You are a knowledge graph query assistant for the book "After the Grind" by Andrew Perkins.

${GRAPH_CONTEXT}

Given this question, return a JSON object with relevant node names from the graph and a brief explanation. Return ONLY valid JSON, nothing else.

Question: ${question}

Format: {"nodes": ["exact node name 1", "exact node name 2"], "explanation": "one sentence explanation"}`
        }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return jsonResponse({ error: 'API error: ' + response.status }, 500);
    }

    const result = await response.json();
    const raw = result.content?.[0]?.text || '';

    // Extract JSON
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}') + 1;
    let parsed;
    if (start >= 0 && end > start) {
      parsed = JSON.parse(raw.slice(start, end));
    } else {
      parsed = { nodes: [], explanation: raw.slice(0, 200) };
    }

    // Load full graph to match names to IDs
    const graphResp = await context.env.ASSETS.fetch(new Request('https://afterthegrind.ai/data/graph.json'));
    const graph = await graphResp.json();

    const matched = [];
    for (const name of (parsed.nodes || [])) {
      const nameLower = name.toLowerCase();
      let found = graph.nodes.find(n => (n.name || '').toLowerCase() === nameLower);
      if (!found) {
        found = graph.nodes.find(n => (n.name || '').toLowerCase().includes(nameLower));
      }
      if (found) {
        matched.push({ id: found.id, name: found.name, label: found.label });
      }
    }

    return jsonResponse({
      matches: matched,
      explanation: parsed.explanation || '',
      count: matched.length
    });

  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });
}
