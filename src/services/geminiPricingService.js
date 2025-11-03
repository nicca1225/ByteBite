/**
 * Gemini API service for generating realistic SGD grocery prices
 * Based on Singapore supermarket chains: NTUC, Cold Storage, RedMart, Sheng Siong
 */

import { GoogleGenerativeAI } from '@google/generative-ai'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
let genAI = null

if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
}

/**
 * Generate SGD prices for recipe ingredients using Gemini AI
 * @param {Array} ingredients - Array of ingredient objects from recipe
 * @returns {Promise<Object>} Object with normalized ingredient names and their prices
 */
export async function generateSGDPrices(ingredients) {
  if (!GEMINI_API_KEY || !genAI) {
    console.warn('VITE_GEMINI_API_KEY not set. Using fallback pricing.')
    return generateFallbackPrices(ingredients)
  }

  try {
    console.log('🔄 Calling Gemini API to generate prices for', ingredients.length, 'ingredients')

    // Normalize ingredient names
    const normalizedIngredients = ingredients.map(ing => ({
      original: ing.name,
      amount: ing.amount,
      unit: ing.unit,
      normalized: normalizeIngredient(ing.name)
    }))

    // Create prompt for Gemini
    const prompt = createPricingPrompt(normalizedIngredients)

    // Call Gemini API using the SDK
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    console.log('📡 Using model: gemini-2.5-flash')

    const result = await model.generateContent(prompt)
    const response = result.response
    const content = response.text()

    console.log('✅ Gemini response received')
    console.log('📝 Gemini text response:', content)

    const prices = parseGeminiResponse(content, normalizedIngredients)
    console.log('✨ Generated prices from Gemini:', prices)
    return prices

  } catch (error) {
    console.error('❌ Error calling Gemini API:', error)
    console.warn('Using fallback pricing due to error')
    return generateFallbackPrices(ingredients)
  }
}

/**
 * Create detailed prompt for Gemini to generate prices
 */
function createPricingPrompt(ingredients) {
  const ingredientsList = ingredients
    .map(ing => `- ${ing.amount} ${ing.unit} ${ing.normalized}`)
    .join('\n')

  return `You are a Singapore grocery price expert. Generate realistic SGD prices for these recipe ingredients based on current prices at NTUC FairPrice, Cold Storage, RedMart, and Sheng Siong supermarkets.

For each ingredient, provide:
1. Ingredient name (normalized)
2. Estimated price SGD for the specified amount
3. Price range SGD (min - max across stores)
4. Store confidence scores (0.0-1.0) for each major chain

Ingredients to price:
${ingredientsList}

IMPORTANT:
- Prices should be REALISTIC for Singapore in 2024-2025
- Consider the actual quantities specified
- Include SGD currency codes
- Format as valid JSON only (no markdown, no code blocks)
- Use this exact JSON structure for each item:
{
  "ingredient": "item name",
  "amount": quantity,
  "unit": "measurement",
  "estimated_price_sgd": number,
  "price_range_sgd": "min - max",
  "store_confidence": {
    "NTUC": 0.0-1.0,
    "Cold Storage": 0.0-1.0,
    "RedMart": 0.0-1.0,
    "Sheng Siong": 0.0-1.0
  }
}

Return ONLY valid JSON array with these objects. No explanation text.`
}

/**
 * Parse Gemini API response and extract prices
 */
function parseGeminiResponse(text, normalizedIngredients) {
  try {
    // Try to extract JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }

    const prices = JSON.parse(jsonMatch[0])

    // Map back to original ingredient names
    const result = {}
    prices.forEach(price => {
      const key = price.ingredient.toLowerCase().trim()
      result[key] = {
        ingredient: price.ingredient,
        amount: price.amount,
        unit: price.unit,
        estimatedPriceSGD: price.estimated_price_sgd,
        priceRangeSGD: price.price_range_sgd,
        storeConfidence: price.store_confidence
      }
    })

    return result

  } catch (error) {
    console.error('Error parsing Gemini response:', error)
    return {}
  }
}

/**
 * Normalize ingredient name (basic version)
 */
function normalizeIngredient(name) {
  return name
    .toLowerCase()
    .replace(/\d+\s*(cup|tbsp|tsp|g|kg|oz|lb|ml|l)/gi, '')
    .replace(/\s*(fresh|frozen|canned|dried|chopped|sliced|ground|whole)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Fallback pricing for when Gemini API is not available
 * Uses hardcoded Singapore supermarket prices
 */
export function generateFallbackPrices(ingredients) {
  const fallbackPrices = {
    'chicken': { estimated: 6.50, range: '5.80 - 7.20', confidence: { NTUC: 0.9, 'Cold Storage': 0.8, RedMart: 0.75, 'Sheng Siong': 0.85 } },
    'beef': { estimated: 12.00, range: '10.50 - 13.50', confidence: { NTUC: 0.85, 'Cold Storage': 0.8, RedMart: 0.7, 'Sheng Siong': 0.8 } },
    'pork': { estimated: 7.50, range: '6.80 - 8.50', confidence: { NTUC: 0.9, 'Cold Storage': 0.75, RedMart: 0.7, 'Sheng Siong': 0.9 } },
    'fish': { estimated: 9.00, range: '8.00 - 10.50', confidence: { NTUC: 0.8, 'Cold Storage': 0.85, RedMart: 0.75, 'Sheng Siong': 0.8 } },
    'salmon': { estimated: 14.00, range: '12.00 - 16.00', confidence: { NTUC: 0.75, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.7 } },
    'shrimp': { estimated: 11.00, range: '10.00 - 12.50', confidence: { NTUC: 0.8, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.8 } },
    'egg': { estimated: 0.35, range: '0.30 - 0.40', confidence: { NTUC: 0.95, 'Cold Storage': 0.9, RedMart: 0.85, 'Sheng Siong': 0.95 } },
    'milk': { estimated: 3.50, range: '3.20 - 4.00', confidence: { NTUC: 0.9, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.9 } },
    'cheese': { estimated: 8.00, range: '7.00 - 9.50', confidence: { NTUC: 0.8, 'Cold Storage': 0.85, RedMart: 0.75, 'Sheng Siong': 0.75 } },
    'butter': { estimated: 6.00, range: '5.50 - 6.80', confidence: { NTUC: 0.9, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.9 } },
    'rice': { estimated: 2.50, range: '2.00 - 3.50', confidence: { NTUC: 0.95, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.95 } },
    'pasta': { estimated: 2.00, range: '1.50 - 2.80', confidence: { NTUC: 0.9, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.9 } },
    'bread': { estimated: 3.50, range: '3.00 - 4.50', confidence: { NTUC: 0.9, 'Cold Storage': 0.8, RedMart: 0.75, 'Sheng Siong': 0.9 } },
    'tomato': { estimated: 1.20, range: '0.80 - 1.80', confidence: { NTUC: 0.9, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.95 } },
    'onion': { estimated: 0.80, range: '0.60 - 1.20', confidence: { NTUC: 0.95, 'Cold Storage': 0.9, RedMart: 0.85, 'Sheng Siong': 0.95 } },
    'garlic': { estimated: 0.50, range: '0.40 - 0.80', confidence: { NTUC: 0.95, 'Cold Storage': 0.9, RedMart: 0.85, 'Sheng Siong': 0.95 } },
    'potato': { estimated: 0.60, range: '0.50 - 0.90', confidence: { NTUC: 0.9, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.95 } },
    'carrot': { estimated: 0.70, range: '0.50 - 1.00', confidence: { NTUC: 0.9, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.95 } },
    'broccoli': { estimated: 3.00, range: '2.50 - 3.80', confidence: { NTUC: 0.9, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.9 } },
    'spinach': { estimated: 2.50, range: '2.00 - 3.20', confidence: { NTUC: 0.85, 'Cold Storage': 0.8, RedMart: 0.75, 'Sheng Siong': 0.9 } },
    'lettuce': { estimated: 2.00, range: '1.50 - 2.80', confidence: { NTUC: 0.85, 'Cold Storage': 0.8, RedMart: 0.75, 'Sheng Siong': 0.85 } },
    'pepper': { estimated: 1.50, range: '1.00 - 2.20', confidence: { NTUC: 0.85, 'Cold Storage': 0.8, RedMart: 0.75, 'Sheng Siong': 0.9 } },
    'olive oil': { estimated: 8.00, range: '6.50 - 10.00', confidence: { NTUC: 0.8, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.7 } },
    'sugar': { estimated: 1.50, range: '1.20 - 2.00', confidence: { NTUC: 0.95, 'Cold Storage': 0.9, RedMart: 0.85, 'Sheng Siong': 0.95 } },
    'salt': { estimated: 0.80, range: '0.60 - 1.20', confidence: { NTUC: 0.95, 'Cold Storage': 0.9, RedMart: 0.85, 'Sheng Siong': 0.95 } },
    'soy sauce': { estimated: 3.50, range: '3.00 - 4.50', confidence: { NTUC: 0.9, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.95 } },
    'tofu': { estimated: 2.50, range: '2.00 - 3.50', confidence: { NTUC: 0.9, 'Cold Storage': 0.8, RedMart: 0.75, 'Sheng Siong': 0.95 } },
    'bean': { estimated: 2.00, range: '1.50 - 2.80', confidence: { NTUC: 0.9, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.9 } },
    'banana': { estimated: 1.00, range: '0.80 - 1.50', confidence: { NTUC: 0.9, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.95 } },
    'apple': { estimated: 1.50, range: '1.20 - 2.00', confidence: { NTUC: 0.85, 'Cold Storage': 0.8, RedMart: 0.75, 'Sheng Siong': 0.85 } },
    'orange': { estimated: 1.20, range: '0.90 - 1.80', confidence: { NTUC: 0.85, 'Cold Storage': 0.8, RedMart: 0.75, 'Sheng Siong': 0.9 } },
    'thyme': { estimated: 3.50, range: '3.00 - 4.50', confidence: { NTUC: 0.85, 'Cold Storage': 0.8, RedMart: 0.75, 'Sheng Siong': 0.8 } },
    'parmesan': { estimated: 10.00, range: '8.50 - 12.00', confidence: { NTUC: 0.8, 'Cold Storage': 0.85, RedMart: 0.75, 'Sheng Siong': 0.7 } },
    'heavy cream': { estimated: 4.50, range: '4.00 - 5.50', confidence: { NTUC: 0.85, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.8 } },
    'whipping cream': { estimated: 4.50, range: '4.00 - 5.50', confidence: { NTUC: 0.85, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.8 } },
    'cream': { estimated: 4.50, range: '4.00 - 5.50', confidence: { NTUC: 0.85, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.8 } },
    'bell pepper': { estimated: 2.00, range: '1.50 - 2.80', confidence: { NTUC: 0.9, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.9 } },
    'penne': { estimated: 2.00, range: '1.50 - 2.80', confidence: { NTUC: 0.9, 'Cold Storage': 0.85, RedMart: 0.8, 'Sheng Siong': 0.9 } },
    'cloves': { estimated: 0.50, range: '0.40 - 0.80', confidence: { NTUC: 0.95, 'Cold Storage': 0.9, RedMart: 0.85, 'Sheng Siong': 0.95 } },
  }

  const result = {}

  ingredients.forEach(ing => {
    const normalized = normalizeIngredient(ing.name).toLowerCase()
    let key = normalized

    // Find best matching ingredient in fallback prices
    let matched = fallbackPrices[key]

    if (!matched) {
      // Try to find best match by checking if fallback key is contained in normalized name
      let bestMatch = null
      let longestMatch = 0

      for (const fallbackKey of Object.keys(fallbackPrices)) {
        // Check if fallback key is a substring of normalized name
        if (normalized.includes(fallbackKey)) {
          // Prefer longer matches to get specificity
          if (fallbackKey.length > longestMatch) {
            bestMatch = fallbackKey
            longestMatch = fallbackKey.length
          }
        }
      }

      if (bestMatch) {
        matched = fallbackPrices[bestMatch]
        key = bestMatch
      }
    }

    if (matched) {
      result[key] = {
        ingredient: ing.name,
        estimatedPriceSGD: matched.estimated,
        priceRangeSGD: matched.range,
        storeConfidence: matched.confidence
      }
    } else {
      // Default fallback for unknown ingredients
      result[key] = {
        ingredient: ing.name,
        estimatedPriceSGD: 5.00,
        priceRangeSGD: '3.50 - 6.50',
        storeConfidence: { NTUC: 0.5, 'Cold Storage': 0.5, RedMart: 0.5, 'Sheng Siong': 0.5 }
      }
    }
  })

  return result
}
