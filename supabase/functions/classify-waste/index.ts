/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { description, imageBase64 } = await req.json();

    if (!description && !imageBase64) {
      return new Response(
        JSON.stringify({ error: "Description or image is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const wasteTypes = {
      wet: { label: "Wet Waste", tips: ["Compostable", "Use green bin", "Avoid plastic bags", "Can be used for composting"] },
      dry: { label: "Dry Waste", tips: ["Recyclable", "Clean before disposal", "Use blue bin", "Separate paper from plastic"] },
      ewaste: { label: "E-Waste", tips: ["Special disposal needed", "Find e-waste center", "Remove batteries", "Never throw in regular bin"] },
      hazardous: { label: "Hazardous", tips: ["Handle with care", "Never mix with other waste", "Contact authorities", "Use designated collection points"] },
    };

    const systemPrompt = `You are a waste classification expert. Analyze the waste item and classify it into one of these categories:
- wet: Organic, biodegradable waste like food scraps, vegetables, fruits, garden waste, leaves
- dry: Recyclable materials like paper, cardboard, plastic bottles, glass, metal cans, textiles
- ewaste: Electronic waste like phones, computers, batteries, cables, appliances, circuit boards
- hazardous: Dangerous materials like chemicals, paints, medicines, fluorescent bulbs, pesticides, motor oil

Respond with ONLY a JSON object in this exact format (no markdown, no code blocks):
{"type": "wet|dry|ewaste|hazardous", "confidence": 85-99, "reasoning": "brief explanation"}`;

    const messages: any[] = [
      { role: "system", content: systemPrompt },
    ];

    if (imageBase64) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: "Classify this waste item:" },
          { type: "image_url", image_url: { url: imageBase64 } }
        ]
      });
    } else {
      messages.push({
        role: "user",
        content: `Classify this waste item: ${description}`
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: imageBase64 ? "google/gemini-2.5-flash" : "google/gemini-2.5-flash-lite",
        messages,
        temperature: 0.3,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content || "";
    
    // Parse the JSON response
    let classification;
    try {
      // Clean up the response - remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      classification = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Parse error:", parseError, "Content:", content);
      // Default fallback
      classification = { type: "dry", confidence: 75, reasoning: "Unable to classify precisely" };
    }

    const wasteInfo = wasteTypes[classification.type as keyof typeof wasteTypes] || wasteTypes.dry;

    return new Response(
      JSON.stringify({
        type: classification.type,
        label: wasteInfo.label,
        confidence: classification.confidence,
        reasoning: classification.reasoning,
        suggestions: wasteInfo.tips,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Classification error:", error);
    const errorMessage = error instanceof Error ? error.message : "Classification failed";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
