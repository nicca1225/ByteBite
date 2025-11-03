/**
 * Normalize ingredient names to standardized format
 * Removes units, quantities, descriptors, and brand names
 * Converts to singular, basic ingredient names
 */

export function normalizeIngredientName(rawIngredient) {
  if (!rawIngredient || typeof rawIngredient !== 'string') {
    return ''
  }

  let normalized = rawIngredient.toLowerCase().trim()

  // Remove quantities and units (1 cup, 2 tbsp, 500g, etc)
  normalized = normalized
    .replace(/^\d+[\s\-]*(and\s*\d+\/\d+)?\s*/i, '') // Remove leading numbers (1, 2, 1-2, etc)
    .replace(/\s*(cup|cups|tbsp|tsp|g|kg|oz|lb|lbs|ml|l|cc|pound|ounce|gram|kilogram|milliliter|liter|piece|pieces|clove|cloves|slice|slices|pinch|pinches)\b/gi, '') // Remove units
    .replace(/\s*(to taste|or more|or less|approx|approximately|about|roughly)\b/gi, '') // Remove modifiers

  // Remove cooking method descriptors
  normalized = normalized.replace(/\s*(chopped|diced|sliced|minced|ground|roasted|fried|boiled|steamed|grilled|baked|shredded|grated|cubed|crushed|whole|halved|drained|rinsed|peeled|pitted|pounded|melted|softened|beaten|whipped|separated|blanched|scored|halves)\b/gi, '')

  // Remove adjectives/descriptors
  normalized = normalized.replace(/\s*(fresh|frozen|canned|dried|raw|cooked|hot|cold|warm|light|heavy|lean|fat|low-fat|fat-free|organic|natural|pure|premium|extra|mild|spicy|sweet|sour|dark|light|ripe|unripe|young|old|thick|thin|large|small|medium|jumbo|tiny|chunky|creamy|smooth|plain|flavored|unsalted|salted|sweetened|unsweetened|reduced|concentrated|powdered|granulated|liquid|solid|skinless|boneless|with bone|bone-in|de-seeded|seeded)\b/gi, '')

  // Remove brand names and modifiers
  normalized = normalized.replace(/\s*(brand|name|type|variety|style|store-bought|homemade)\b/gi, '')

  // Remove parenthetical info (specific types, sizes, etc)
  normalized = normalized.replace(/\s*\([^)]*\)/g, '')

  // Remove colors
  normalized = normalized.replace(/\s*(white|black|red|green|yellow|brown|golden|dark|light)\b/gi, '')

  // Remove specific variety names
  normalized = normalized.replace(/\s*(heirloom|roma|cherry|beefsteak|cremini|portobello|shiitake|oyster|button|pinto|kidney|black|navy|cannellini|chickpea|lentil|split|whole|basmati|jasmine|arborio|sushi|wild|long-grain|short-grain|jasmine|parmesan|cheddar|mozzarella|feta|gouda|brie|camembert|swiss|american|sharp|mild)\b/gi, '')

  // Convert to singular form (basic rules)
  normalized = normalized
    .replace(/potatoes$/i, 'potato')
    .replace(/tomatoes$/i, 'tomato')
    .replace(/onions$/i, 'onion')
    .replace(/peppers$/i, 'pepper')
    .replace(/carrots$/i, 'carrot')
    .replace(/eggs$/i, 'egg')
    .replace(/mushrooms$/i, 'mushroom')
    .replace(/berries$/i, 'berry')
    .replace(/apples$/i, 'apple')
    .replace(/bananas$/i, 'banana')
    .replace(/oranges$/i, 'orange')
    .replace(/lemons$/i, 'lemon')
    .replace(/limes$/i, 'lime')
    .replace(/beans$/i, 'bean')
    .replace(/peas$/i, 'pea')
    .replace(/grains$/i, 'grain')
    .replace(/noodles$/i, 'noodle')
    .replace(/pastas$/i, 'pasta')
    .replace(/breads$/i, 'bread')
    .replace(/cheeses$/i, 'cheese')
    .replace(/nuts$/i, 'nut')
    .replace(/seeds$/i, 'seed')
    .replace(/spices$/i, 'spice')
    .replace(/herbs$/i, 'herb')
    .replace(/oils$/i, 'oil')
    .replace(/sauces$/i, 'sauce')
    .replace(/s$/i, '') // General plural to singular

  // Clean up extra whitespace
  normalized = normalized
    .replace(/\s+/g, ' ') // Multiple spaces to single space
    .trim()

  // Map common alternative names to standardized names
  const nameMap = {
    'ground meat': 'ground chicken',
    'meat': 'chicken',
    'poultry': 'chicken',
    'fish': 'salmon',
    'seafood': 'shrimp',
    'greens': 'spinach',
    'lettuce': 'lettuce',
    'cabbage': 'cabbage',
    'broccoli': 'broccoli',
    'cauliflower': 'cauliflower',
    'root vegetable': 'carrot',
    'tuber': 'potato',
    'grain': 'rice',
    'legume': 'bean',
    'fruit': 'apple',
    'citrus': 'lemon',
    'dairy': 'milk',
    'milk product': 'milk',
    'flower': 'broccoli',
    'cruciferous': 'broccoli',
    'squash': 'zucchini',
    'gourd': 'pumpkin',
    'melon': 'watermelon',
    'citrus fruit': 'orange',
    'stone fruit': 'peach',
    'pome fruit': 'apple',
    'berry fruit': 'strawberry',
    'grain legume': 'lentil',
  }

  // Apply name mapping
  for (const [key, value] of Object.entries(nameMap)) {
    if (normalized === key) {
      normalized = value
      break
    }
  }

  return normalized
}

/**
 * Extract quantity and unit from ingredient string
 */
export function extractQuantityAndUnit(rawIngredient) {
  if (!rawIngredient) return { quantity: 1, unit: '', original: '' }

  const quantityMatch = rawIngredient.match(/^(\d+(?:[\s\-]*\d+\/\d+)?)\s*/)
  const unitMatch = rawIngredient.match(/(\d+[\s\-]*\d+\/\d+|\d+)\s*([a-z]+)?/i)

  const quantity = quantityMatch ? parseFloat(quantityMatch[1]) : 1
  const unitMatch2 = rawIngredient.match(/\d+\s+([a-z]+)/i)
  const unit = unitMatch2 ? unitMatch2[1] : ''

  return {
    quantity,
    unit,
    original: rawIngredient
  }
}

/**
 * Example usage:
 * normalizeIngredientName('2 cups fresh spinach') → 'spinach'
 * normalizeIngredientName('500g boneless, skinless chicken breast') → 'chicken'
 * normalizeIngredientName('1 tbsp extra virgin olive oil') → 'olive oil'
 */
