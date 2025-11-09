// Intent Parser - Identifies user intent from voice commands
export type IntentType =
  | 'add_crop'
  | 'record_harvest'
  | 'update_crop_status'
  | 'show_prices'
  | 'weather_query'
  | 'calculate_profit'
  | 'crop_advice'
  | 'pest_disease'
  | 'set_reminder'
  | 'price_alert'
  | 'government_scheme'
  | 'find_location'
  | 'switch_language'
  | 'show_expenses'
  | 'irrigation_advice'
  | 'fertilizer_advice'
  | 'planting_time'
  | 'general_query';

export interface ParsedIntent {
  type: IntentType;
  entities: Record<string, any>;
  confidence: number;
  originalText: string;
}

export class IntentParser {
  private patterns: Array<{
    type: IntentType;
    patterns: RegExp[];
    entityExtractors?: Array<(text: string) => Record<string, any>>;
  }>;

  constructor() {
    this.patterns = this.initializePatterns();
  }

  private initializePatterns() {
    return [
      // Add Crop
      {
        type: 'add_crop' as IntentType,
        patterns: [
          /add\s+(\d+)\s+(acre|acres|hectare|hectares)\s+(?:of\s+)?(\w+)/i,
          /(\d+)\s+(एकड़|हेक्टेयर)\s+(\w+)\s+जोड़/i,
          /(\d+)\s+(ఎకరాల|హెక్టార్లు)\s+(\w+)\s+జోడించు/i,
        ],
        entityExtractors: [
          (text: string) => {
            const match = text.match(/(\d+)\s+(acre|acres|hectare|hectares|एकड़|हेक्टेयर|ఎకరాల|హెక్టార్లు)\s+(?:of\s+)?(\w+)/i);
            if (match) {
              return {
                area: parseFloat(match[1]),
                unit: match[2],
                cropName: match[3]
              };
            }
            return {};
          }
        ]
      },
      // Record Harvest
      {
        type: 'record_harvest' as IntentType,
        patterns: [
          /record\s+(?:today's\s+)?harvest.*?(\d+)\s*(kg|kilogram|ton|quintal)/i,
          /(\d+)\s*(kg|किलो|క్విన్టాల్)\s+(\w+)\s+harvest/i,
        ],
        entityExtractors: [
          (text: string) => {
            const match = text.match(/(\d+)\s*(kg|kilogram|ton|quintal|किलो|క్విన్టాల్)/i);
            const cropMatch = text.match(/(tomato|wheat|rice|onion|टमाटर|गेहूं|టమాటా)/i);
            return {
              quantity: match ? parseFloat(match[1]) : null,
              unit: match ? match[2] : null,
              crop: cropMatch ? cropMatch[1] : null
            };
          }
        ]
      },
      // Weather Query
      {
        type: 'weather_query' as IntentType,
        patterns: [
          /weather|rain|temperature|मौसम|వాతావరణం|காலநிலை/i,
          /will\s+it\s+rain/i,
          /what.*temperature/i,
        ]
      },
      // Price Query
      {
        type: 'show_prices' as IntentType,
        patterns: [
          /price|mandi|market|कीमत|ధర|விலை/i,
          /what.*price/i,
          /today.*price/i,
        ],
        entityExtractors: [
          (text: string) => {
            const cropMatch = text.match(/(tomato|wheat|rice|onion|potato|टमाटर|गेहूं|टमाटा)/i);
            return {
              crop: cropMatch ? cropMatch[1] : null
            };
          }
        ]
      },
      // Calculate Profit
      {
        type: 'calculate_profit' as IntentType,
        patterns: [
          /profit|income|earning|लाभ|లాభం|இலாபம்/i,
          /calculate.*profit/i,
          /total.*expense/i,
        ]
      },
      // Crop Advice
      {
        type: 'crop_advice' as IntentType,
        patterns: [
          /fertilizer|खाद|ఎరువు|உரம்/i,
          /what.*fertilizer/i,
          /crop.*need/i,
        ]
      },
      // Pest/Disease
      {
        type: 'pest_disease' as IntentType,
        patterns: [
          /pest|disease|insect|कीट|రోగం|நோய்/i,
          /leaf.*curl/i,
          /identify.*disease/i,
        ]
      },
      // Set Reminder
      {
        type: 'set_reminder' as IntentType,
        patterns: [
          /remind|reminder|याद|గుర్తు|நினைவூட்டல்/i,
          /alert.*me/i,
          /notify.*me/i,
        ]
      },
      // Government Scheme
      {
        type: 'government_scheme' as IntentType,
        patterns: [
          /subsidy|scheme|pm.?kisan|सब्सिडी|योजना|సబ్సిడీ/i,
          /government.*help/i,
          /insurance/i,
        ]
      },
      // Switch Language
      {
        type: 'switch_language' as IntentType,
        patterns: [
          /switch.*(?:to\s+)?(hindi|english|telugu|tamil)/i,
          /हिंदी.*बोलो/i,
          /తెలుగులో.*మాట్లాడు/i,
          /தமிழில்.*பேசு/i,
        ],
        entityExtractors: [
          (text: string) => {
            const langMatch = text.match(/hindi|english|telugu|tamil|हिंदी|తెలుగు|தமிழ்/i);
            const langMap: Record<string, string> = {
              'hindi': 'hi',
              'हिंदी': 'hi',
              'telugu': 'te',
              'తెలుగు': 'te',
              'tamil': 'ta',
              'தமிழ்': 'ta',
              'english': 'en'
            };
            return {
              language: langMatch ? langMap[langMatch[0].toLowerCase()] : null
            };
          }
        ]
      },
      // Irrigation Advice
      {
        type: 'irrigation_advice' as IntentType,
        patterns: [
          /water|irrigate|irrigation|पानी|నీరు|நீர்/i,
          /should.*irrigate/i,
          /water.*requirement/i,
        ]
      },
      // Find Location
      {
        type: 'find_location' as IntentType,
        patterns: [
          /find|locate|nearest|near.*me/i,
          /seed.*shop/i,
          /mandi.*near/i,
        ]
      },
    ];
  }

  parse(text: string): ParsedIntent {
    const normalizedText = text.toLowerCase().trim();

    for (const pattern of this.patterns) {
      for (const regex of pattern.patterns) {
        if (regex.test(normalizedText)) {
          let entities = {};
          
          if (pattern.entityExtractors) {
            for (const extractor of pattern.entityExtractors) {
              entities = { ...entities, ...extractor(normalizedText) };
            }
          }

          return {
            type: pattern.type,
            entities,
            confidence: 0.8,
            originalText: text
          };
        }
      }
    }

    // Default to general query
    return {
      type: 'general_query',
      entities: {},
      confidence: 0.5,
      originalText: text
    };
  }
}
