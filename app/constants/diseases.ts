// TypeScript interface for disease information
export interface DiseaseInfo {
  description: string;
  solution: string;
  medicine: string;
}

// Disease data mapping for PlantVillage dataset classes
// Keys match backend classes (e.g., Tomato___Late_blight) exactly
// Data sourced from agricultural extensions (e.g., Penn State, Cornell, NC State, 2025)
const diseaseData: Record<string, DiseaseInfo> = {
  // Tomato classes
  'Tomato___healthy': {
    description: 'No disease detected. The tomato plant appears healthy with no visible symptoms.',
    solution: 'Maintain balanced watering, adequate sunlight, and proper fertilization. Monitor for early signs of stress.',
    medicine: 'N/A - Preventive: Use organic compost or neem oil for general protection.',
  },
  'Tomato___Late_blight': {
    description: 'Late blight, caused by Phytophthora infestans, shows water-soaked lesions turning brown-black on leaves and stems.',
    solution: 'Remove and destroy affected leaves. Improve air circulation and avoid overhead watering. Plant in full sun.',
    medicine: 'Copper-based fungicides (e.g., copper hydroxide) or chlorothalonil. Apply preventively in humid conditions.',
  },
  'Tomato___Early_blight': {
    description: 'Early blight, caused by Alternaria solani, causes dark spots with concentric rings on lower leaves.',
    solution: 'Rotate crops every 3-4 years. Stake plants for airflow. Mulch with straw to reduce soil splash.',
    medicine: 'Mancozeb, chlorothalonil, or azoxystrobin-based fungicides. Use resistant cultivars like Rutgers.',
  },
  'Tomato___Bacterial_spot': {
    description: 'Bacterial spot, caused by Xanthomonas spp., shows small, water-soaked spots turning dark with yellow halos.',
    solution: 'Avoid overhead irrigation. Remove affected leaves. Use disease-free seeds.',
    medicine: 'Copper hydroxide or streptomycin-based bactericides.',
  },
  'Tomato___Septoria_leaf_spot': {
    description: 'Septoria leaf spot causes small, grayish spots with dark margins on tomato leaves, leading to defoliation.',
    solution: 'Remove infected leaves. Mulch to prevent splash. Rotate crops.',
    medicine: 'Copper fungicides or mancozeb.',
  },
  'Tomato___Tomato_mosaic_virus': {
    description: 'Tomato mosaic virus causes mottled, distorted leaves and stunted growth, spread by contact or tools.',
    solution: 'Disinfect tools. Control weeds. Remove and destroy infected plants.',
    medicine: 'No cure; use reflective mulches to deter vectors.',
  },

  // Potato classes
  'Potato___healthy': {
    description: 'No disease detected. The potato plant appears healthy with no visible symptoms.',
    solution: 'Maintain proper irrigation and fertilization. Monitor for pests and diseases.',
    medicine: 'N/A - Preventive: Use neem oil or organic mulch.',
  },
  'Potato___Early_blight': {
    description: 'Early blight, caused by Alternaria solani, shows dark, concentric spots on potato leaves.',
    solution: 'Rotate crops. Remove debris. Stake for better airflow.',
    medicine: 'Mancozeb or chlorothalonil fungicides.',
  },
  'Potato___Late_blight': {
    description: 'Late blight, caused by Phytophthora infestans, causes large, dark lesions on potato leaves and tubers.',
    solution: 'Destroy affected plants. Plant in well-drained areas. Avoid volunteers.',
    medicine: 'Copper fungicides or acibenzolar-S-methyl.',
  },

  // Other plant classes (example subset; add more as needed)
  'Corn___Common_rust': {
    description: 'Common rust, caused by Puccinia sorghi, produces orange-yellow pustules on corn leaves.',
    solution: 'Plant resistant hybrids. Improve airflow. Remove alternate hosts.',
    medicine: 'Triadimefon or myclobutanil fungicides.',
  },
  'Apple___Apple_scab': {
    description: 'Apple scab, caused by Venturia inaequalis, shows olive-green spots on leaves and corky fruit lesions.',
    solution: 'Rake and destroy fallen leaves. Prune for open canopy.',
    medicine: 'Captan, myclobutanil, or potassium bicarbonate.',
  },

  // Fallback for unknown classes
  'Unknown': {
    description: 'Unable to identify the disease. The image may not clearly show symptoms or match known classes.',
    solution: 'Retake the photo with better lighting and focus on the affected area. Consult a local agronomist.',
    medicine: 'N/A - General care: Use balanced NPK fertilizer and monitor plant health.',
  },
};

// Parse disease class to extract plant and disease name
export const parseDiseaseClass = (diseaseClass: string): { plant: string; disease: string } => {
  if (diseaseClass === 'Unknown') {
    return { plant: 'General', disease: 'Unknown' };
  }
  const parts = diseaseClass.split('___');
  const plant = parts[0] || 'General';
  const disease = parts[1] ? parts[1].replace(/_/g, ' ') : diseaseClass;
  return { plant, disease };
};

// Get disease information for a given class
export const getDiseaseInfo = (diseaseClass: string): DiseaseInfo => {
  return diseaseData[diseaseClass] || diseaseData['Unknown'];
};